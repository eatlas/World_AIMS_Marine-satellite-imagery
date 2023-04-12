// Plot Landsat 8 band value means in a section of San Francisco and
// demonstrate interactive charts.
    
var s3 = ee.ImageCollection('COPERNICUS/S3/OLCI')
    .filterDate('2016-01-01', '2018-01-01')
    .select('Oa0[3-5]_radiance');
    

var chart;
var firstRun = true;

function intersectionAreaRatio(image, region) {
  var imageGeometry = image.geometry();
  var intersection = imageGeometry.intersection(region);
  return intersection.area().divide(region.area());
}



// Function to update the chart and map.
function updateChartAndMap(location) {
  var region = ee.Geometry.Rectangle([
    location.lon - 0.5, location.lat - 0.5,
    location.lon + 0.5, location.lat + 0.5
  ]);

var scaledS3 = s3.map(applyRadianceScaling);

  // Apply a time series reducer to the images.
 var reducedS3 = scaledS3.map(function(image) {
  var reducedValue = image.reduceRegion({
    reducer: ee.Reducer.percentile([95]),
    geometry: region,
    scale: 10000,
    bestEffort: true
  }).get('Oa03_radiance');

  // Calculate the intersection area ratio
  var areaRatio = intersectionAreaRatio(image, region);

  // Only consider images with coverage ratio greater than or equal to 0.99 (you can adjust this value)
  return ee.Algorithms.If(areaRatio.gte(0.99), image.set('reduced_value', reducedValue), image.set('reduced_value', null));
}).filter(ee.Filter.notNull(['reduced_value']));

  
  // Filter images with reduced value less than 100.
  var filteredS3 = reducedS3.filter(ee.Filter.lt('reduced_value', 100));

  var chartOptions = {
    imageCollection: filteredS3.select('Oa03_radiance'),
    region: region,
    reducer: ee.Reducer.percentile([95]),
    scale: 10000
  };

  if (firstRun) {
    chart = ui.Chart.image.series(chartOptions);
    handleChartClick(chart);  // Add this line
    firstRun = false;
  } else {
    // Remove the old chart from the map.
    Map.remove(chart);
  
    // Recreate the chart object with the updated options.
    chart = ui.Chart.image.series(chartOptions);
    handleChartClick(chart);  // Add this line
  }

  // Add the chart to the map.
  chart.style().set({
    position: 'bottom-right',
    width: '800px',
    height: '300px'
  });
  Map.add(chart);

  // Update the map.
  Map.layers().remove(sfLayer);


  sfLayer = ui.Map.Layer(region, {color: 'FF0000'}, 'GOC', false);
  Map.layers().add(sfLayer);
  Map.setCenter(location.lon, location.lat, 8);
}



// Initial location.
var initialLocation = {lon: 138, lat: -15};
updateChartAndMap(initialLocation);

// Update the location when the map is clicked.
Map.onClick(function(coords) {
  updateChartAndMap({lon: coords.lon, lat: coords.lat});
});


// Custom function to apply radiance scaling based on Oa0x_radiance_scale properties
function applyRadianceScaling(image) {
  var bandNames = ['Oa03_radiance', 'Oa04_radiance', 'Oa05_radiance'];
  var scaleFactorNames = ['Oa03_radiance_scale', 'Oa04_radiance_scale', 'Oa05_radiance_scale'];

  var scaledBands = bandNames.map(function(bandName, index) {
    var scaleFactor = ee.Number(image.get(scaleFactorNames[index]));
    return image.select(bandName).multiply(scaleFactor).rename(bandName);
  });

  var scaledImage = ee.Image.cat(scaledBands);

  return image.addBands(scaledImage, null, true);
}



var sfLayer;

// Create a label on the map.
var label = ui.Label('Click on the chart to show the image. Click on map to move location');
Map.add(label);

function handleChartClick(chart) {
  chart.onClick(function(xValue, yValue, seriesName) {
    if (!xValue) return;  // Selection was cleared.

    // Show the image for the clicked date.
    var equalDate = ee.Filter.equals('system:time_start', xValue);
    var image = ee.Image(s3.filter(equalDate).first());
    
    // Map the custom function to the Sentinel-3 OLCI collection
    //var imageScaled = applyRadianceScaling(image);
    //print(image); //.select('solar_zenith_angle').multiply(Math.PI / 180).cos());
    var s3Layer = ui.Map.Layer(image, {
      gamma: 1.5,
      min: 0.4, // a03 40 0.35
      max: 1, // a03 100 0.8
      //bands: ['Oa05_radiance', 'Oa04_radiance', 'Oa03_radiance']
      bands: ['Oa03_radiance']
    }, 'Sentinel 3');
    Map.layers().reset([s3Layer, sfLayer]);

    // Show a label with the date on the map.
    label.setValue((new Date(xValue)).toUTCString());
  });
}
