// Plot Landsat 8 band value means in a section of San Francisco and
// demonstrate interactive charts.

//var region =
//    ee.Geometry.Rectangle(137, -16, 139, -14);

//var landsat8Toa = ee.ImageCollection('LANDSAT/LC08/C02/T1_TOA')
//    .filterDate('2015-12-25', '2016-12-25')
//    .select('B[1-7]');
    
var s3 = ee.ImageCollection('COPERNICUS/S3/OLCI')
    .filterDate('2016-01-01', '2017-01-01')
    .select('Oa0[3-5]_radiance');
    
// Apply a time series reducer to the images.
//var reducedS3 = s3.map(function(image) {
//  var reducedValue = image.reduceRegion({
//    reducer: ee.Reducer.percentile([95]),
//    geometry: region,
//    scale: 10000,
//    bestEffort: true
//  }).get('Oa03_radiance');
//  return image.set('reduced_value', reducedValue);
//});

// Filter images with reduced value less than 100.
//var filteredS3 = reducedS3.filter(ee.Filter.lt('reduced_value', 100));

// Create an image time series chart.
//var chart = ui.Chart.image.series({
//  imageCollection: filteredS3.select('Oa03_radiance'),
//  region: region,
//  reducer: ee.Reducer.percentile([95]),
//  scale: 10000
//});

// Function to update the chart and map.
function updateChartAndMap(location) {
  var region = ee.Geometry.Rectangle([
    location.lon - 1, location.lat - 1,
    location.lon + 1, location.lat + 1
  ]);

  // Apply a time series reducer to the images.
  var reducedS3 = s3.map(function(image) {
    var reducedValue = image.reduceRegion({
      reducer: ee.Reducer.percentile([95]),
      geometry: region,
      scale: 10000,
      bestEffort: true
    }).get('Oa03_radiance');
    return image.set('reduced_value', reducedValue);
  });
  
  // Filter images with reduced value less than 100.
  var filteredS3 = reducedS3.filter(ee.Filter.lt('reduced_value', 100));


  // Update the chart.
  chart.setOptions({
    imageCollection: filteredS3.select('Oa03_radiance'),
    region: region,
    reducer: ee.Reducer.percentile([95]),
    scale: 10000
  });

  // Update the map.
  Map.layers().remove(sfLayer);
  sfLayer = ui.Map.Layer(region, {color: 'FF0000'}, 'GOC');
  Map.layers().add(sfLayer);
  Map.setCenter(location.lon, location.lat, 8);
}

// Add the chart to the map.
chart.style().set({
  position: 'bottom-right',
  width: '500px',
  height: '300px'
});
Map.add(chart);

// Initial location.
var initialLocation = {lon: 138, lat: -15};
updateChartAndMap(initialLocation);

// Update the location when the map is clicked.
Map.onClick(function(coords) {
  updateChartAndMap({lon: coords.lon, lat: coords.lat});
});

var sfLayer;

// Outline and center San Francisco on the map.
//var sfLayer = ui.Map.Layer(region, {color: 'FF0000'}, 'GOC');
//Map.layers().add(sfLayer);
//Map.setCenter(138, -15, 8);

// Create a label on the map.
var label = ui.Label('Click on the chart to show the image. Click on map to move location');
Map.add(label);

// When the chart is clicked, update the map and label.
chart.onClick(function(xValue, yValue, seriesName) {
  if (!xValue) return;  // Selection was cleared.

  // Show the image for the clicked date.
  var equalDate = ee.Filter.equals('system:time_start', xValue);
  var image = ee.Image(s3.filter(equalDate).first());
  print(image);
  var s3Layer = ui.Map.Layer(image, {
    gamma: 2,
    min: 30,
    max: 200,
    bands: ['Oa05_radiance', 'Oa04_radiance', 'Oa03_radiance']
  }, 'Sentinel 3');
  Map.layers().reset([s3Layer, sfLayer]);

  // Show a label with the date on the map.
  label.setValue((new Date(xValue)).toUTCString());
});
