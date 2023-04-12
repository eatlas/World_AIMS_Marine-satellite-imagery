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

  // Remove images that don't fully overlap the region of interest
  var areaFilteredS3 = s3.map(function(image) {
    // Calculate the intersection area ratio
    var areaRatio = intersectionAreaRatio(image, region);
  
    // Only consider images with coverage ratio greater than or equal to 0.99 (you can adjust this value)
    return ee.Algorithms.If(areaRatio.gte(0.99), image.set('areaRatio', areaRatio), image.set('areaRatio', null));
  }).filter(ee.Filter.notNull(['areaRatio']));
  
     
  // Calculate the brightness of the region and add this as a property for each band
  var withBrightnessS3 = areaFilteredS3.map(function(image) {
    var bandNames = ['Oa03_radiance', 'Oa04_radiance', 'Oa05_radiance'];
  
    // Calculate brightness for each band and set it as a property
    bandNames.forEach(function(bandName) {
      var reducedValue = image.reduceRegion({
        reducer: ee.Reducer.percentile([95]),
        geometry: region,
        scale: 5000,
        bestEffort: true
      }).get(bandName);
  
      image = image.set(bandName + '_brightness', reducedValue);
    });
  
    return image;
  });


  // Filter images with reduced value less than 100.
  var filteredS3 = withBrightnessS3.filter(ee.Filter.lt('Oa04_brightness', 80));

  var chartOptions = {
    imageCollection: filteredS3.select('Oa04_radiance'),
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
    print(image); 
    var s3Layer = ui.Map.Layer(image, {
      gamma: 1.3,
      min: [25, 30, 40], // a03 40 30 25
      max: [70, 75, 85], // a03 85 70 70
      bands: ['Oa05_radiance', 'Oa04_radiance', 'Oa03_radiance']
      //bands: ['Oa05_radiance']
    }, 'Sentinel 3');
    Map.layers().reset([s3Layer, sfLayer]);

    // Show a label with the date on the map.
    label.setValue((new Date(xValue)).toUTCString());
  });
}
