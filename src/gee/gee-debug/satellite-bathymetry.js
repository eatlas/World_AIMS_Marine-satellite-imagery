var s2Utils = require('users/ericlawrey/World_AIMS_Marine-satellite-imagery:src/gee/s2Utils.js');

var imageIDs = [
  // Excellent - Left
    "COPERNICUS/S2/20151001T024446_20151001T024444_T49JGM" // Left
  //  "COPERNICUS/S2/20160309T021612_20160309T023621_T49JGM", // Dark green (sun glint correction artefact?)
  //  "COPERNICUS/S2/20160329T024439_20160329T093513_T49JGM", // Dark green 
  //  "COPERNICUS/S2/20160617T024442_20160617T024444_T49JGM",
  //  "COPERNICUS/S2/20160826T024322_20160826T024322_T49JGM",
  //  "COPERNICUS/S2/20161005T024322_20161005T024317_T49JGM"
  ];
  
var composite = s2Utils.s2_composite(imageIDs, true, true); 


var B3 = composite.select('B3');
var B2 = composite.select('B2');

// Result: This depth model seems to work quite well for depths between 5 - 15 m. In shallow areas
// dark seagrass is not compensated for very well (althouth between than my piece wise algorithm).
// In shallow areas the seagrass introduces a 4 - 6 m error in the depth estimate, appearing to
// be deeper than it is. This is based on the assumption that neighbouring sand areas are at a
// similar depth to the seagrass. 

// Offset that corrects for the colour balance of the image. This also allows the depth
// estimate to be optimised for a particular depth. 
// If this is increased to say 250 the compensation for seagrass is slightly between for shallower
// areas (3 - 5 m), but still far from good. The downside is that in deep areas the seagrass gets
// over compensated so seagrass areas appear shallower than intended.
var B2_OFFSET = 150;

// Minimum value see when dividing ln(B3)/ln(B2). This offset shifts the deepest location
// to 0 to make the scaling more sensible
var DEPTH_OFFSET = 0.918;

// Scaling factor so that the range of the ln(B3)/ln(B2) is expanded to cover the range of
// depths measured in metres.
var DEPTH_SCALAR = 144;

// Lower depth threshold used for estimating the DEPTH_OFFSET
var OFFSET_DEPTH = -15;

var depthB3B2 = B3.log().divide(B2.subtract(B2_OFFSET).log()).subtract(DEPTH_OFFSET).multiply(DEPTH_SCALAR).add(OFFSET_DEPTH);  




// Zoom to our tile of interest.
Map.centerObject(composite.geometry(), 10);

//Map.addLayer(depthB3B2scaled, {min: -50, max:0}, 'Sentinel 2 - SDB - B3B2 composite');
//Map.addLayer(B2log, {min: 1, max:10}, 'B2log');
//Map.addLayer(B3log, {min: 1, max:10}, 'B3log');
Map.addLayer(depthB3B2, {min: -20, max:0}, 'depthB3B2');

Map.addLayer(composite, {'bands':['B4', 'B3', 'B2'], min: 0, max:1400}, 'Sentinel 2 - composite');

var B4 = composite.select('B4');
Map.addLayer(B4, {min: 0, max:400}, 'B4');

// Knock down areas that are shallow, but not dark substrate this will partly compensate for
// shallow and dark areas. Though possibly at the linearity of the response with depth.
var B4_BLACK_POINT = 190;
var B4_NORM_SCALAR = 400;
var B4_SCALAR = 0.5;
var b4scale = ee.Image(1).subtract(B4.subtract(B4_BLACK_POINT).max(0).divide(B4_NORM_SCALAR).min(1).multiply(B4_SCALAR));
Map.addLayer(b4scale, {min: 0, max:1}, 'B4 scale');


// Scaled
var depthB4B3B2 = b4scale.multiply(depthB3B2)
Map.addLayer(depthB4B3B2, {min: -15, max:1}, 'depthB4B3B2');

// =====================================================================
//                Piece wise depth model
// =====================================================================

// In this model we try to decompose the image into areas that have a dark
// substrate then use this information to generate a compensation to the
// brightness of the B3 channel.
// This algorithm focuses on the fact that in depths of 0 - 15 in dark
// subtrate areas B2 is darker than water at -15 m, even for quite shallow
// areas.
// We can use this to segment the image. 
// 
// Overall result: This algorithm sort of works, but is worse than a simple
// ln(B3)/ln(B2). The thresholds in the algorithm are senstive and have overlapping
// conflicting requirements. The level of compensation in shallow areas is significantly
// too low and with very little information available to determine how much adjustment
// should be applied.
// Valiant attempt, but not better.

var B4 = composite.select('B4');
//var B3 = composite.select('B3');
//var B2 = composite.select('B2');
var B8 = composite.select('B8');

//Map.centerObject(composite.geometry(), 10);

//Map.addLayer(B2, {min: 0, max:1400}, 'B2');
// Dark or deep
// Create an image that gets brighter as we approach the dark threshold caused by seagrass.
// This works because we are focusing on areas shallow than 15 m and areas that have a
// dark substrate from seagrass are darker in B2 at all depths than sand even at -15 m.
// Normalise the brightness to 0 - 1, where 1 corresponds to open water or dark seagrass.
var darkOrDeepImg = ee.Image(980).subtract(B2).max(ee.Image(0)).divide(210);

//Map.addLayer(darkOrDeepImg, {min: 0, max:1}, 'darkOrDeepImg');

// Deep. Find areas deeper than can be detected with green (~15 m)
// Normalise the brightness to 0 - 1, where 1 corresponds to open water.
// Areas above 400 in brightness could be that bright due to depth or 
// substrate. Below 400, and for areas shallower than -15 m, the reason is that
// the substrate is dark,
// 400 - B3 will be negative for areas brighter than 400 (not dark substrate)
// Clip this to 0.
// Divide this so that dark areas between 350 - 400 will be normalised to 0 - 1.
// Clip this so it doesn't exceed  1.
// Invert the image so that deep areas are dark, so that multiplying by this 
// mask will remove the deep areas.
var deep = ee.Image(1).subtract(ee.Image(380).subtract(B3).max(0).divide(40).min(1));
//Map.addLayer(deep, {min: 0, max:1}, 'Deep');

// Now combine to focus on seagrass areas
var darkImg = darkOrDeepImg.multiply(deep);

//Map.addLayer(darkImg, {min: 0, max:1}, 'Dark');


// We need to exclude dry areas as we don't which to apply any compensation to land areas.
// Use B8 channel as a simple land mask.
// Water areas with sunglint can reflect up to 400. So we use this as a threshold.
// Make sure water areas are black. Scale to approx 0 - 1. Land areas are 400 - 2500
// Subtract 400 from B8 to make water areas below 0. Then clip to 0. Scale the bright
// land areas to approx 1 by dividing by 1000, then clip to a maximum of 1. Now invert
// the image by subtracting from 1.
var water = ee.Image(1).subtract(B8.subtract(400).max(ee.Image(0)).divide(1000).min(ee.Image(1)));
//var water = ee.Image(400).subtract(B8).divide(1000); 

//Map.addLayer(water, {min: 0, max:1}, 'Water');

// Remove the land areas from the dark water estimate by multiplying by the water mask.
var darkWater = water.multiply(darkImg).pow(3);

//Map.addLayer(darkWater, {min: 0, max:1}, 'darkWater');

// The darkWater layer is an estimate of dark substrate areas. We can now use this to create
// an approaximate compensation to lighten the B3 channel, so that its brightness is closer
// to what it would be if the substrate was sand.
// At 10 m the brightness needs to be multiplied by approaximately 1.5. In shallow areas (~1m)
// the compensation scaler need to be closer to 2.5 x. This non-static compensation can be
// kind of achieved by the fact that in shallow areas the seagrass is detected more strongly
// than in deeper waters.
// Create a scalar to apply to B3. For areas with no compensation the value should be 1. In
// shallow areas with dark seagrass the compensation is 2.5.


var substrateScalar = darkWater.multiply(0.5).add(1);

var B3substrateNorm = B3.multiply(substrateScalar);
//Map.addLayer(B3substrateNorm, {min: 0, max:1400}, 'B3 substrate Norm');
//Map.addLayer(B3, {min: 0, max:1400}, 'B3');

// The level of compensation seems to work quite well from -15 - -10m, but shallower
// areas are not compensated enough by a low shot. It is difficult to distinguish
// shallow areas that are dark and deep areas and thus it is difficult to know the
// correct amount of compensation needed.
//Map.addLayer(B4, {min: 0, max:1400}, 'B4');
