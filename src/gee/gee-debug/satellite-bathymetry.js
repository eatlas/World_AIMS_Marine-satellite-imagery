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
var m1B3B2 = 10;
var m0B3B2 = 0.90;
var depthB3B2 = B2.multiply(nB3B2).log().divide(B3.multiply(nB3B2).log()).subtract(m0B3B2).multiply(m1B3B2); 
var depthB3B2scaled = depthB3B2.multiply(40).subtract(40);
*/

// Zoom to our tile of interest.
Map.centerObject(composite.geometry(), 10);

//Map.addLayer(depthB3B2scaled, {min: -50, max:0}, 'Sentinel 2 - SDB - B3B2 composite');

Map.addLayer(composite, {min: 0, max:1}, 'Sentinel 2 - composite');