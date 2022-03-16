// This has strong white caps, strong waves and lots of clouds.
//var img = ee.Image("COPERNICUS/S2/20190220T234701_20190220T234701_T56KQB");

// Hearld reef
// This shows breaking waves.
//var img = ee.Image("COPERNICUS/S2/20200930T002709_20200930T002710_T55KFB");

// Cairns region.
// This shows shallow reefs and land areas for consideration.
var img = ee.Image("COPERNICUS/S2/20161115T002712_20161115T002822_T55KCB");

var B5 = img.select('B5');
var B11 = img.select('B11');

// B11 appears to be less sensitive to surface water spray then B5 and so breaking waves are 
// dimmer in B11. This is good as it means that B5-B11 doesn't result in B11 removing the
// breaking waves from B5. 
// The sensitivity of B11 and B5 to clouds is similar and so B5-B11 removes much of the clouds
// from the image. The edges of clouds are reasonably corrected and solid cloud areas turn black.

// Zoom to our tile of interest.
Map.centerObject(img.geometry(), 10);

Map.addLayer(B5, {min: 0, max:1500}, 'B5');
Map.addLayer(B11, {min: 0, max:1500}, 'B11');
Map.addLayer(B5.subtract(B11), {min: 0, max:1500}, 'B5-B11');

// Don't apply sunglint to the land areas. Breaking waves have a brightness of up to 1000,
// While mangroves have a brightness of as low as 730 and so we have an overlap that makes
// it impossible to separate land and water perfectly. We want to preference correct
// sunglint correction in water areas and so we must set it high enough so as to not
// interfer.
var correction = B11;
var LOWER_THRES = 800;
var HIGHER_THRES = 1000;
var ATMOS_CORRECTION = 600;
// Cap the correction for the cross over from ocean to land
correction = correction.where(B11.gt(LOWER_THRES),LOWER_THRES);

// Above the the upper threshold we are confident that this part of the image is land
// and thus we should be applying a fixed atmospheric correction so that the brightness
// of the resulting image is consistent (i.e. there are no sudden jumps in brightness at
// the land and sea boundary)
correction = correction.where(B11.gt(HIGHER_THRES), ATMOS_CORRECTION);

// The final corrected image has a poor tonal inconsistancy for mangrove areas, with some
// areas of the mangroves appearing significantly darker than they should. In breaking
// waves on Hearld reef the threshold being slightly below the maximum breaking wave brightness
// doesn't result in much disturbance of the image and so these values seem like a 
// reasonable compromise.
var final = B5.subtract(correction);

Map.addLayer(final, {min: 0, max:1500}, 'B5-correction');
