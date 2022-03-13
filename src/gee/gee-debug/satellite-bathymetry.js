var s2Utils = require('users/ericlawrey/World_AIMS_Marine-satellite-imagery:src/gee/s2Utils.js');

var imageIDs = [
  // Excellent - Left
    "COPERNICUS/S2/20151001T024446_20151001T024444_T49JGM" // Left
  //  "COPERNICUS/S2/20160309T021612_20160309T023621_T49JGM", // Dark green (sun glint correction artefact?)
  //  "COPERNICUS/S2/20160329T024439_20160329T093513_T49JGM", // Dark green 
  //  "COPERNICUS/S2/20160617T024442_20160617T024444_T49JGM",
  //  "COPERNICUS/S2/20160826T024322_20160826T024322_T49JGM",
  //  "COPERNICUS/S2/20161005T024322_20161005T024317_T49JGM"
  ];
  
var composite = s2Utils.s2_composite(imageIDs, true, true); 

/*
var B3 = composite.select('B3');
var B2 = composite.select('B2');

var nB3B2 = 0.01;
var m1B3B2 = 2;
var m0B3B2 = 0.90;
var B2log = B2.multiply(1).log();
var B3log = B3.multiply(1).log();

var depthB3B2 = B2log.divide(B3log); //.subtract(m0B3B2).multiply(m1B3B2); 
var depthB3B2scaled = depthB3B2;


// Zoom to our tile of interest.
Map.centerObject(composite.geometry(), 10);

//Map.addLayer(depthB3B2scaled, {min: -50, max:0}, 'Sentinel 2 - SDB - B3B2 composite');
Map.addLayer(B2log, {min: 1, max:10}, 'B2log');
Map.addLayer(B3log, {min: 1, max:10}, 'B3log');
Map.addLayer(depthB3B2, {min: 1, max:3}, ' B2log.divide(B3log)');

Map.addLayer(composite, {'bands':['B4', 'B3', 'B2'], min: 0, max:1400}, 'Sentinel 2 - composite');
*/

var B3 = composite.select('B3');
var B2 = composite.select('B2');
var B8 = composite.select('B8');

Map.centerObject(composite.geometry(), 10);

// Dark or deep
// Create an image that gets brighter as we approach the dark threshold caused by seagrass.
// This works because we are focusing on areas shallow than 15 m and areas that have a
// dark substrate from seagrass are darker in B2 at all depths than sand even at -15 m.
// Normalise the brightness to 0 - 1, where 1 corresponds to open water or dark seagrass.
var darkOrDeepImg = ee.Image(900).subtract(B2).max(ee.Image(0)).divide(160);
//Map.addLayer(darkOrDeepImg, {min: 0, max:1}, 'Dark or deep');

// Deep. Find areas deeper than can be detected with green (~15 m)
// Normalise the brightness to 0 - 1, where 1 corresponds to open water.
var deep = ee.Image(400).subtract(B3).max(ee.Image(0)).divide(60);
//Map.addLayer(deep, {min: 0, max:1}, 'Deep');

// Now combine to focus on seagrass areas
var darkImg = darkOrDeepImg.subtract(deep);

Map.addLayer(darkImg, {min: 0, max:1}, 'Dark');


// We need to exclude dry areas as we don't which to apply any compensation to land areas.
// Use B8 channel as a simple land mask.
// Water areas with sunglint can reflect up to 400. So we use this as a threshold.
// Make sure water areas are black. Scale to approx 0 - 1. Land areas are 400 - 2500
var water = ee.Image(400).subtract(B8).divide(1000); 

Map.addLayer(B8, {min: 0, max:1}, 'Water');
