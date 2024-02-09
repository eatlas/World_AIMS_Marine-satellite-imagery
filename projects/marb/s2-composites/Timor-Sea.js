// Copyright 2022 Eric Lawrey - Australian Institute of Marine Science
//
// MIT License https://mit-license.org/
// This script is written to run on the Google Earth Engine 
var s2Utils = require('users/ericlawrey/World_AIMS_Marine-satellite-imagery:src/01-gee/sentinel2/s2Utils.js');

var REGION = 'Timor-Sea';
var PROJECT = 'marb';

var EXPORT_FOLDER = 'EarthEngine/World_AIMS_Marine-sat-imagery/'+PROJECT+'/'+REGION;
var BASEPRE = 'World_AIMS_Marine-sat-imagery_S2_';

var REF1_OPTIONS = {
  colourGrades: ['TrueColour', 'Infrared'],
  exportScale: [10, 20],
  exportBasename: BASEPRE+'R1',
  exportFolder: EXPORT_FOLDER,
  applySunglintCorrection: true,
  applyBrightnessAdjustment: true
};

var REF2_OPTIONS = {
  colourGrades: ['TrueColour'],
  exportScale: [10],
  exportBasename: BASEPRE+'R2',
  exportFolder: EXPORT_FOLDER,
  applySunglintCorrection: true,
  applyBrightnessAdjustment: true
};
// ===============================================================
//
//                    Timor Sea
//
// ===============================================================

  
// Australia, WA, Bonaparte Archipelago, Long Reef 
// This region is very turbid due to tidal movements.
// CLOUDY_PIXEL_PERCENTAGE = 0.1
// 40 of 118 images
s2Utils.s2_composite_display_and_export(
  [
    //Relative water clarity index 1 - awful, 5 - ok
    // Excellent
    "COPERNICUS/S2/20170903T015649_20170903T020007_T51LYE", // (3)
    "COPERNICUS/S2/20170730T015701_20170730T015834_T51LYE", // (3)
    "COPERNICUS/S2/20170620T015701_20170620T015836_T51LYE", // (3)
    "COPERNICUS/S2/20180511T015619_20180511T015619_T51LYE", // (3)
    "COPERNICUS/S2/20180710T015619_20180710T020050_T51LYE", // (3)
    "COPERNICUS/S2/20180918T015609_20180918T020006_T51LYE", // (3)
  ],
  false, true, REF1_OPTIONS);
  
s2Utils.s2_composite_display_and_export(
  [
    //Relative water clarity index 1 - awful, 5 - ok
    "COPERNICUS/S2/20160715T015622_20160715T015624_T51LYE", // (2) (removed due to lower water clarity)
    "COPERNICUS/S2/20160824T015622_20160824T015622_T51LYE", // (2) (removed due to lower water clarity)

    // Good
    "COPERNICUS/S2/20180411T015619_20180411T020056_T51LYE", // (4)
    "COPERNICUS/S2/20180918T015609_20180918T020006_T51LYE" //(5)
  ],
  false, true, REF2_OPTIONS);
  