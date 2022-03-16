var img = ee.Image("COPERNICUS/S2/20190220T234701_20190220T234701_T56KQB");

var B5 = img.select('B5');
var B11 = img.select('B11');
// Zoom to our tile of interest.
Map.centerObject(img.geometry(), 10);

Map.addLayer(B5, {min: 0, max:1500}, 'B5');
Map.addLayer(B11, {min: 0, max:1500}, 'B11');
Map.addLayer(B5.subtract(B11), {min: 0, max:1500}, 'B5-B11');