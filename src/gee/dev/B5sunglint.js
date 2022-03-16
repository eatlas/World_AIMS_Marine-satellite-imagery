//var img = ee.Image("COPERNICUS/S2/20190220T234701_20190220T234701_T56KQB");

// Hearld reef
// This shows breaking waves.
var img = ee.Image("COPERNICUS/S2/20200930T002709_20200930T002710_T55KFB");

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