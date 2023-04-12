/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var geometry = /* color: #d63000 */ee.Geometry.MultiPoint(
        [[137.9191540643857, -15.449111163354232],
         [137.86147584172946, -15.56291550243048],
         [137.64724244329196, -15.351136452210781],
         [137.58132447454196, -15.407411353731113],
         [137.61977662297946, -15.490140884113018],
         [137.54081238958102, -15.437197786838917],
         [137.48931397649508, -15.227278313442818],
         [137.4851941034482, -14.92693569244027],
         [137.81753019395333, -15.656583951195238],
         [137.9754586607502, -16.065434431408914],
         [138.1680627256916, -15.990529713846495],
         [138.86601061302952, -15.645818844715677],
         [139.09123033959202, -16.087021882319565],
         [139.10770983177952, -16.112091096323837],
         [138.99372667748264, -16.07052725274699],
         [139.02737230736545, -16.053371386759636]]);
/***** End of imports. If edited, may not auto-convert in the playground. *****/
// Plot Landsat 8 band value means in a section of San Francisco and
// demonstrate interactive charts.
    
var s3 = ee.ImageCollection('COPERNICUS/S3/OLCI')
    .filterDate('2017-01-01', '2018-01-01')
    .select('Oa0[3-5]_radiance');
    

var chart;
var firstRun = true;

function intersectionAreaRatio(image, region) {
  var imageGeometry = image.geometry();
  var intersection = imageGeometry.intersection(region);
  return intersection.area().divide(region.area());
}

var sfLayer;

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
  
     
// Calculate the brightness of the region and add this as a property
  var withBrightnessS3 = areaFilteredS3.map(function(image) {
    var reducedValue = image.reduceRegion({
      reducer: ee.Reducer.percentile([95]),
      geometry: region,
      scale: 5000,
      bestEffort: true
    }).get('Oa04_radiance');
    return image.set('Oa04_brightness',reducedValue);
  });


  // Filter images with reduced value less than 100.
  var filteredS3 = withBrightnessS3.filter(ee.Filter.lt('Oa04_brightness', 80));

  var chartOptions = {
    imageCollection: filteredS3, //.select('Oa04_radiance'),
    region: region,
    reducer: ee.Reducer.percentile([95]),
    scale: 10000
  };

  if (firstRun) {
    chart = ui.Chart.image.series(chartOptions);
    //handleChartClick(chart);  // Add this line
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







// Add buttons below the chart
/*var prevButton = ui.Button('Previous', function() {
  stepChart(-1);
});
var nextButton = ui.Button('Next', function() {
  stepChart(1);
});
var buttonPanel = ui.Panel([prevButton, nextButton], ui.Panel.Layout.Flow('horizontal'));
Map.add(buttonPanel);

// Function to step through the chart
function stepChart(step) {
  var currentSelection = chart.getDataTable()[0];

  // If there is no current selection, use the first point
  if (!currentSelection) {
    currentSelection = {row: 0, column: 1};
  } else {
    currentSelection.row = currentSelection.row + step;

    // Check if the row is within the bounds of the chart
    if (currentSelection.row >= chart.data().getNumberOfRows()) {
      currentSelection.row = chart.data().getNumberOfRows() - 1;
    } else if (currentSelection.row < 0) {
      currentSelection.row = 0;
    }
  }

  // Set the new selection and trigger click event
  chart.setSelection([currentSelection]);
  var xValue = chart.data().getValue(currentSelection.row, 0);
  var yValue = chart.data().getValue(currentSelection.row, currentSelection.column);
  var seriesName = chart.data().getColumnLabel(currentSelection.column);
  handleChartClick(xValue, yValue, seriesName);
}
*/

// Create a label on the map.
var label = ui.Label('Click on the chart to show the image. Click on map to move location');
Map.add(label);


// Update handleChartClick to accept xValue, yValue, and seriesName as arguments
/*function handleChartClick(xValue, yValue, seriesName) {
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
  //label.setValue((new Date(xValue)).toUTCString());
}

// Update the chart onClick event to pass xValue, yValue, and seriesName to handleChartClick
chart.onClick(function(xValue, yValue, seriesName) {
  handleChartClick(xValue, yValue, seriesName);
});
*/