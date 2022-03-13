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

/*
var B3 = composite.select('B3');
var B2 = composite.select('B2');

var nB3B2 = 0.01;
var m1B3B2 = 2;
var m0B3B2 = 0.90;
var B2log = B2.multiply(1).log();
var B3log = B3.multiply(1).log();

var depthB3B2 = B2log.divide(B3log); //.subtract(m0B3B2).multiply(m1B3B2); 
var depthB3B2scaled = depthB3B2;


// Zoom to our tile of interest.
Map.centerObject(composite.geometry(), 10);

//Map.addLayer(depthB3B2scaled, {min: -50, max:0}, 'Sentinel 2 - SDB - B3B2 composite');
Map.addLayer(B2log, {min: 1, max:10}, 'B2log');
Map.addLayer(B3log, {min: 1, max:10}, 'B3log');
Map.addLayer(depthB3B2, {min: 1, max:3}, ' B2log.divide(B3log)');

Map.addLayer(composite, {'bands':['B4', 'B3', 'B2'], min: 0, max:1400}, 'Sentinel 2 - composite');
*/

var B3 = composite.select('B3');
var B2 = composite.select('B2');
var B8 = composite.select('B8');

Map.centerObject(composite.geometry(), 10);

// Dark or deep
// Create an image that gets brighter as we approach the dark threshold caused by seagrass.
// This works because we are focusing on areas shallow than 15 m and areas that have a
// dark substrate from seagrass are darker in B2 at all depths than sand even at -15 m.
// Normalise the brightness to 0 - 1, where 1 corresponds to open water or dark seagrass.
var darkOrDeepImg = ee.Image(900).subtract(B2).max(ee.Image(0)).divide(160);
//Map.addLayer(darkOrDeepImg, {min: 0, max:1}, 'Dark or deep');

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
var deep = ee.Image(1).subtract(ee.Image(400).subtract(B3).max(0).divide(50).min(1));
Map.addLayer(deep, {min: 0, max:1}, 'Deep');

// Now combine to focus on seagrass areas
var darkImg = darkOrDeepImg.multiply(deep);

Map.addLayer(darkImg, {min: 0, max:1}, 'Dark');


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
var darkWater = water.multiply(darkImg);

Map.addLayer(darkWater, {min: 0, max:1}, 'Dark water');

// The darkWater layer is an estimate of dark substrate areas. We can now use this to create
// an approaximate compensation to lighten the B3 channel, so that its brightness is closer
// to what it would be if the substrate was sand.
// At 10 m the brightness needs to be multiplied by approaximately 1.5. In shallow areas (~1m)
// the compensation scaler need to be closer to 2.5 x. This non-static compensation can be
// kind of achieved by the fact that in shallow areas the seagrass is detected more strongly
// than in deeper waters.
// Create a scalar to apply to B3. For areas with no compensation the value should be 1. In
// shallow areas with dark seagrass the compensation is 2.5.
var substrateScalar = darkWater.multiply(1.5).add(1);

var B3substrateNorm = B3.multiply(substrateScalar);
Map.addLayer(B3substrateNorm, {min: 0, max:1400}, 'B3 substrate Norm');
