// Plot Landsat 8 band value means in a section of San Francisco and
// demonstrate interactive charts.

var region =
    ee.Geometry.Rectangle(137, -16, 139, -14);

//var landsat8Toa = ee.ImageCollection('LANDSAT/LC08/C02/T1_TOA')
//    .filterDate('2015-12-25', '2016-12-25')
//    .select('B[1-7]');
    
var s3 = ee.ImageCollection('COPERNICUS/S3/OLCI')
    .filterDate('2016-01-01', '2017-01-01')
    .select('Oa0[3-5]_radiance');

// Create an image time series chart.
var chart = ui.Chart.image.series({
  imageCollection: s3.select('Oa03_radiance'),
  region: region,
  reducer: ee.Reducer.percentile([95]),
  scale: 10000
});

// Add the chart to the map.
chart.style().set({
  position: 'bottom-right',
  width: '500px',
  height: '300px'
});
Map.add(chart);

// Outline and center San Francisco on the map.
var sfLayer = ui.Map.Layer(region, {color: 'FF0000'}, 'GOC');
Map.layers().add(sfLayer);
Map.setCenter(138, -15, 8);

// Create a label on the map.
var label = ui.Label('Click a point on the chart to show the image for that date.');
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
