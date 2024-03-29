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
    .filterDate('2017-08-01', '2017-08-30');
    //.select('Oa0[4-14]_radiance');
    

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
  
  // Normalise the brightness of the images over time using the angle of the sun
  //var normS3 = areaFilteredS3.map(function(image) {
  //  return normaliseSolarBrightness(image);
  //});
  
  //var chartS3 = normS3;
  var chartS3 = areaFilteredS3;
  // Calculate the brightness of the region and add this as a property
  var withBrightnessS3 = chartS3.map(function(image) {
    var reducedValue = image.reduceRegion({
      reducer: ee.Reducer.percentile([95]),
      geometry: region,
      scale: 10000,
      bestEffort: true,
    }).get('Oa04_radiance');
    return image.set('Oa04_brightness',reducedValue);
  });


  // Filter images with reduced value less than 80.
  filteredS3 = withBrightnessS3.filter(ee.Filter.lt('Oa04_brightness', 200));

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
var initialLocation = {lon: 0, lat: 51};
updateChartAndMap(initialLocation);

// Update the location when the map is clicked.
//Map.onClick(function(coords) {
//  updateChartAndMap({lon: coords.lon, lat: coords.lat});
//});

// This function generates an image that corresponds to the angle between the
// sun and each pixel location based on the time of the provided image. The
// angle is returned in radians.
// Based on https://en.wikipedia.org/wiki/Solar_zenith_angle
// https://en.wikipedia.org/wiki/Hour_angle
// https://en.wikipedia.org/wiki/Position_of_the_Sun
function createSolarZenithImage(image) {
  // Work out the image capture time from the image property. This works
  // for Sentinel 3 images.
  var date = ee.Date(image.get('system:time_start'));
  var dayOfYear = date.getRelative('day', 'year').add(1);

  // Which longitude corresponds to noon for the time the image was taken, in radians
  // Relative to Greenwich (0 deg)
  // Each day the world rotates 2pi radians. date.getFraction('day') of 0 corresponds
  // to mid-night at Greenwich (0 deg), therefore noon corresponds to 180 deg or PI.
  // If we are 11 hours after mid-night at Greenwich then it will just under a half
  // turn from west to east and noon is still 1 hours away. This means the noon longitude
  // is close to Greenwich (on the eastern side, so the number should be positive). 
  // Time   angleOfNoon
  // 0 UTC  (180 deg) PI
  // 1      (180-15 deg) = 165 deg
  // 11     (180-15*11 deg) = 15 deg
  // 13     (180-15*13 deg) = -15 deg
  // The math needs to be done in radians
  var angleOfNoon = ee.Number(Math.PI).subtract(date.getFraction('day').multiply(2*Math.PI));

  // solarDeclination =-arcsin [0.39779*cos(0.98565 deg(N+10)+1.914 deg * sin(0.98565 deg *(N-2)))]
  // Where N is the day of the year
  // At 21 Dec the solarDeclination should be -23.4 deg (-0.409 radians) (i.e. summer over southern hemisphere)
  // At 21 Jun it should be +23.4 deg (0.409 radians)
  var solarDeclination = dayOfYear.add(10).multiply(0.98565*Math.PI/180)
    .add(dayOfYear.subtract(2).multiply(0.98565*Math.PI/180).sin().multiply(1.914*Math.PI/180))
    .cos().multiply(0.39779).asin().multiply(-1);

  
  // The solarHourAngle is the angle from noon at any given location.
  // So for example if the angle of noon was 15 deg (1/24 *360), then this would be 1 hour
  // ahead of Greenwich (i.e. in 1 hour noon would be over Greenwich). The solarHourAngle
  // at Greenwich would be longitude(0)-angleOfNoon(15) = -15 deg (0.26 radians)
  var solarHourAngle = ee.Image.pixelLonLat().select('longitude').multiply(Math.PI/180)
        .subtract(angleOfNoon); //.divide(15*Math.PI/180);
        

  // https://en.wikipedia.org/wiki/Solar_zenith_angle
  // solarZenithAngle = acos(sin(latitude)*sin(declination)+cos(latitude)*cos(declination)*cos(hourAngle))
  var solarZenith = ee.Image().expression(
    "cos(latitude) * cos(declination) * cos(hourAngle) + sin(latitude) * sin(declination)", {
      'latitude': ee.Image.pixelLonLat().select('latitude').multiply(Math.PI / 180),
      'declination': solarDeclination, //.multiply(Math.PI / 180),
      'hourAngle': solarHourAngle
    }
  );
  
  // Convert to an angle, set the band name and clip to the extent of the original image
  // Note: Remove the clip to see the effect over the full globe
  return solarZenith.acos().rename('solarZenithRad'); //.clip(image.geometry());
}

// This function adjusts the brightness of the image based on the incident
// radiation across the scene, using the location and time of the image.
// This should compensate for brightness changes due to seasons, helping to
// standardised the brightness over time and location. Assumes that the 
// image contains the 'system:time_start' property.
// Note: This normalisation DOES NOT WORK. While I can see any problem
// with the math, the imagery does not change in brightness as much as
// predicted by the math. For London on 21 Dec the normalisation is
// about 5x but the ratio of the brightness between 21 Jun and 21 Dec is
// only 1.3 - 1.8 depending on the band. This implies that there is some
// existing compensation. To make matters worse the Sentinel 3 sensor is
// brighter on the left and this has nothing to do with the solar zenith.
// The sun is actually on the right side of the image and so this brightness
// seems to be a calibration issue?
function normaliseSolarBrightness(image) {
  // Work out for each pixel what the intensity of the solar radiation.
  var toaIncidentSolarFluxImage = createSolarZenithImage(image).cos().max(0);
  
  // Limit the brightness compensation to 10 so we don't have 1/0 issues. All
  // images should be in the 1 - 4 range anyway. 
  var brightnessNormalisationImage = ee.Image.constant(1).divide(toaIncidentSolarFluxImage)
    .min(10).rename('brightnessNorm');
  
  // adjust the brightness of the image and restore the image attributes
  var normImage = image.multiply(brightnessNormalisationImage);
    // For some reason copying over all the attributes causes the map rendering to 
    // fail with an error 'Cannot add an object of type <Element> to the map.'
    // The print of the image with the copied properties looks good.
    //.copyProperties(image, image.propertyNames());
  return normImage;
}

var sfLayer;

// Create a label on the map.
var label = ui.Label('Click on the chart to show the image. Click on map to move location');
Map.add(label);

function renderImage(image) {
  var red = image.select('Oa07_radiance').multiply(1.5).add(image.select('Oa09_radiance').multiply(2.1))
    .subtract(image.select('Oa14_radiance').multiply(0.15));
  var green = image.select('Oa05_radiance').multiply(1.65).add(image.select('Oa06_radiance').multiply(2.1))
    .subtract(image.select('Oa14_radiance').multiply(0.3));
  var blue = image.select('Oa04_radiance').multiply(3.9)
    .subtract(image.select('Oa14_radiance').multiply(0.9));
  return ee.Image.rgb(red, green, blue);
  //[1.5 * samples.B07 + 2.1 * samples.B09 - 0.15 * samples.B14, 1.65 * samples.B05 + 2.1 * samples.B06 - 0.3 * samples.B14, 3.9 * samples.B04 - samples.B14 * 0.9, samples.dataMask];
}

function handleChartClick(chart) {
  chart.onClick(function(xValue, yValue, seriesName) {
    if (!xValue) return;  // Selection was cleared.

    // Show the image for the clicked date.
    var equalDate = ee.Filter.equals('system:time_start', xValue);
    var image = ee.Image(filteredS3.filter(equalDate).first()); // Use filteredS3 instead of s3

    var normImage = normaliseSolarBrightness(image);
    var rgbImage = renderImage(normImage);
    
    var s3LayerRGB = ui.Map.Layer(rgbImage, {
      gamma: 1,
      min: 0,
      max: 500,
    }, 'Sentinel 3 RGB');
    
    var s3LayerNoNorm = ui.Map.Layer(renderImage(image), {
      gamma: 1,
      min: 0,
      max: 500,
    }, 'Sentinel 3 No Norm');
    
    // Work out for each pixel what the intensity of the solar radiation.
    var toaIncidentSolarFluxImage = createSolarZenithImage(image).cos().max(0);
  
    // Limit the brightness compensation to 10 so we don't have 1/0 issues. All
    // images should be in the 1 - 4 range anyway. 
    var brightnessNormalisationImage = ee.Image.constant(1).divide(toaIncidentSolarFluxImage)
      .min(10).rename('brightnessNorm');
    var s3LayerBright = ui.Map.Layer(brightnessNormalisationImage, {
      gamma: 1,
      min: 1,
      max: 5,
    }, 'Brightness Norm');
    
    print(normImage);
    /*var solarZenithLayer = ui.Map.Layer(brightnessNormalisationImage, {
      min: 0,
      max: 5,
      palette: ['000000', 'FFFFFF'],
      bands: ['brightnessNorm']
    }, 'Solar Zenith Angle');
    
    Map.layers().add(solarZenithLayer);
    */
    // Map the custom function to the Sentinel-3 OLCI collection
    //var imageScaled = applyRadianceScaling(image);
   /* print(image); 
    var s3Layer = ui.Map.Layer(normImage, {
      gamma: 1.3,
      min: [25, 30, 40], // a03 40 30 25
      max: [150, 170, 200], // a03 85 70 70
      bands: ['Oa05_radiance', 'Oa04_radiance', 'Oa03_radiance']
      
      //min: 1, // a03 40 30 25
      //max: 3, 
    }, 'Sentinel 3'); */
    
    
    //Map.layers().reset([s3Layer, s3LayerRGB, sfLayer]);
    Map.layers().reset([s3LayerRGB, s3LayerNoNorm, s3LayerBright, sfLayer]);

    // Show a label with the date on the map.
    label.setValue((new Date(xValue)).toUTCString());
  });
}

