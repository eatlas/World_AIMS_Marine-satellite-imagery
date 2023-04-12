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
    .filterDate('2017-01-01', '2017-03-01')
    .select('Oa0[3-5]_radiance');
    

var chart;
var firstRun = true;
var filteredS3; // Declare filteredS3 as a global variable

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
  
     
// Calculate the brightness of the region and add this as a property
  var withBrightnessS3 = areaFilteredS3.map(function(image) {
    var reducedValue = image.reduceRegion({
      reducer: ee.Reducer.percentile([95]),
      geometry: region,
      scale: 10000,
      bestEffort: true
    }).get('Oa04_radiance');
    return image.set('Oa04_brightness',reducedValue);
  });


  // Filter images with reduced value less than 80.
  filteredS3 = withBrightnessS3.filter(ee.Filter.lt('Oa04_brightness', 80));

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
  
  var chartStyle = {
  title: 'Region brightness over time',
  series: {
    0: {lineWidth: 2, color: 'E37D05', pointSize: 4},
  },
  chartArea: {backgroundColor: 'FFFFFF'}
};
  // Apply custom style properties to the chart.
  chart.setOptions(chartStyle);

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
//Map.onClick(function(coords) {
//  updateChartAndMap({lon: coords.lon, lat: coords.lat});
//});

// Based on https://en.wikipedia.org/wiki/Solar_zenith_angle
// https://en.wikipedia.org/wiki/Hour_angle
// https://en.wikipedia.org/wiki/Position_of_the_Sun
function createSolarZenithImage(image) {
  var date = ee.Date(image.get('system:time_start'));
  var dayOfYear = date.getRelative('day', 'year').add(1);
  var localSolarTime = date.getFraction('day').multiply(24);
  print(dayOfYear);
  print(date.getFraction('day'));
  var angleOfNoon = ee.Number(180).subtract(date.getFraction('day').divide(24).multiply(Math.PI/180));

  //var solarDeclination = dayOfYear.multiply(1.914).add(10).multiply(1.914).cos().multiply(-0.39779).asin();
  var solarDeclination = dayOfYear.add(10).multiply(0.98565*Math.PI/180)
    .add(dayOfYear.subtract(2).multiply(0.98565*Math.PI/180).sin().multiply(1.914*Math.PI/180))
    .cos().multiply(0.39779).asin().multiply(-1);
  var solarHourAngle = localSolarTime.subtract(12).multiply(15).multiply(Math.PI/180);
  print(solarDeclination);
  print(solarHourAngle);

  var solarZenith = ee.Image().expression(
    "cos(latitude) * cos(declination) * cos(hourAngle) + sin(latitude) * sin(declination)", {
      'latitude': ee.Image.pixelLonLat().select('latitude').multiply(Math.PI / 180),
      'declination': solarDeclination, //.multiply(Math.PI / 180),
      'hourAngle': ee.Image.pixelLonLat().select('longitude').multiply(Math.PI/180)
        .subtract(Math.PI).divide(15*Math.PI/180)//.multiply(Math.PI / 180)
    }
  );
  //return solarZenith.acos().multiply(180 / Math.PI);
  return ee.Image.pixelLonLat().select('longitude').subtract(180).divide(15*Math.PI/180).rename('latitude');
  //var clippedSolarZenith = solarZenith.acos().multiply(180 / Math.PI).clip(image.geometry());
  //return clippedSolarZenith.updateMask(image.select('Oa04_radiance').mask());
}

function createSolarZenithImage2(image) {
  return image;
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
    var image = ee.Image(filteredS3.filter(equalDate).first()); // Use filteredS3 instead of s3
    

    
    var solarZenithImage = createSolarZenithImage(image);

    var solarZenithLayer = ui.Map.Layer(solarZenithImage, {
      min: 0,
      max: 90,
      palette: ['FFFFFF', '000000'],
      bands: ['latitude']
    }, 'Solar Zenith Angle');
    
    Map.layers().add(solarZenithLayer);
    
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
    
    
    Map.layers().reset([s3Layer, solarZenithLayer, sfLayer]);

    // Show a label with the date on the map.
    label.setValue((new Date(xValue)).toUTCString());
  });
}

