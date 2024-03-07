// Copyright 2024 Eric Lawrey - Australian Institute of Marine Science
//
// MIT License https://mit-license.org/
// This script is written to run on the Google Earth Engine. 

// === README: Change the path to your local copy of the s2Utils code ====
// The path to the util code must be an absolute path including the
// username and repository
var s2Utils = require('users/ericlawrey/World_AIMS_Marine-satellite-imagery:src/01-gee/sentinel2/s2Utils.js');


var REGION = 'Coral-Sea';
var PROJECT = 'cs-aims-nesp-mac-2-3-oceanic-veg';
var EXPORT_FOLDER = 'EarthEngine/World_AIMS_Marine-sat-imagery/'+PROJECT+'/'+REGION;
var BASEPRE = 'World_AIMS_Marine-sat-imagery_S2_';

var REF1_OPTIONS = {
  colourGrades: ['Raw-B1-B4'],
  exportScale: [10],
  exportBasename: BASEPRE+'R1',
  exportFolder: EXPORT_FOLDER,
  applySunglintCorrection: true,
  applyBrightnessAdjustment: false
};



var REF2_OPTIONS = {
  colourGrades: ['Raw-B1-B4'],
  exportScale: [10],
  exportBasename: BASEPRE+'R2',
  exportFolder: EXPORT_FOLDER,
  applySunglintCorrection: true,
  applyBrightnessAdjustment: false
};


// ======== Flinders, Dart Heralds Surprise (Coral Sea) =========
// Searched 72 out of 72 images
// Excellent images
s2Utils.s2_composite_display_and_export(
  [
    "COPERNICUS/S2/20180426T002101_20180426T002056_T55KFA",
    "COPERNICUS/S2/20181018T002049_20181018T002051_T55KFA",
    "COPERNICUS/S2/20190220T001631_20190220T001625_T55KFA",
    "COPERNICUS/S2/20190824T002059_20190824T002059_T55KFA",
    "COPERNICUS/S2/20190918T002051_20190918T002054_T55KFA",
    "COPERNICUS/S2/20200818T002059_20200818T002058_T55KFA",
    "COPERNICUS/S2/20200729T002059_20200729T002057_T55KFA",
    "COPERNICUS/S2/20200823T002101_20200823T002100_T55KFA"
    //"COPERNICUS/S2/20210515T002059_20210515T002053_T55KFA"  // High CDOM
  ],
  false, false, REF1_OPTIONS);

// No Sunglint Correction
var REF_NoSGC_OPTIONS = {
  colourGrades: ['Raw-B1-B4'],
  exportScale: [10],
  exportBasename: BASEPRE+'NoSGC',
  exportFolder: EXPORT_FOLDER,
  applySunglintCorrection: false,
  applyBrightnessAdjustment: false
};

s2Utils.s2_composite_display_and_export(
  [
    "COPERNICUS/S2/20180426T002101_20180426T002056_T55KFA",
    "COPERNICUS/S2/20181018T002049_20181018T002051_T55KFA",
    "COPERNICUS/S2/20190220T001631_20190220T001625_T55KFA",
    "COPERNICUS/S2/20190824T002059_20190824T002059_T55KFA",
    "COPERNICUS/S2/20190918T002051_20190918T002054_T55KFA",
    "COPERNICUS/S2/20200818T002059_20200818T002058_T55KFA",
    "COPERNICUS/S2/20200729T002059_20200729T002057_T55KFA",
    "COPERNICUS/S2/20200823T002101_20200823T002100_T55KFA"
    //"COPERNICUS/S2/20210515T002059_20210515T002053_T55KFA"  // High CDOM
  ],
  false, true, REF_NoSGC_OPTIONS);
  
// Save the single best image as a comparison with the
// composite.
var REF_SINGLE_OPTIONS = {
  colourGrades: ['Raw-B1-B4'],
  exportScale: [10],
  exportBasename: BASEPRE+'20200818',
  exportFolder: EXPORT_FOLDER,
  applySunglintCorrection: true,
  applyBrightnessAdjustment: false
};

s2Utils.s2_composite_display_and_export(
  [
    "COPERNICUS/S2/20200818T002059_20200818T002058_T55KFA"
  ],
  false, false,REF_SINGLE_OPTIONS);


// Good images
s2Utils.s2_composite_display_and_export(
  [
    "COPERNICUS/S2/20210306T002059_20210306T002053_T55KFA",
    "COPERNICUS/S2/20181018T002049_20181018T002051_T55KFA",
    "COPERNICUS/S2/20190220T001631_20190220T001625_T55KFA",
    "COPERNICUS/S2/20191013T002059_20191013T002055_T55KFA",
    "COPERNICUS/S2/20200714T002101_20200714T002059_T55KFA"
  ],
  false, false, REF2_OPTIONS);
  
// ======== Holmes Reefs (West), Flora Reef, McDermott Bank (Coral Sea) =========
// Searched 61 out of 61 images
// 3 Excellent, 1 Good images
s2Utils.s2_composite_display_and_export(
  [
    "COPERNICUS/S2/20160608T002712_20160608T002733_T55KEB",
    "COPERNICUS/S2/20160608T002733_20160608T033407_T55KEB",
    "COPERNICUS/S2/20190906T002709_20190906T002709_T55KEB",
    "COPERNICUS/S2/20180812T002659_20180812T002702_T55KEB"
  ],
  false, false,REF1_OPTIONS);


// ======== Lihou reef (South West) (Coral Sea, Australia) - Central =========
// AUS00614 - Nautical charts. 
// Searched 83 out of 83 images
s2Utils.s2_composite_display_and_export(
  [
    // Excellent
    "COPERNICUS/S2/20190905T001111_20190905T001109_T56KLF",
    "COPERNICUS/S2/20210721T001109_20210721T001111_T56KLF",
    "COPERNICUS/S2/20180811T001111_20180811T001108_T56KLF",
    "COPERNICUS/S2/20201019T001111_20201019T001114_T56KLF", // Sunglint in corner
    "COPERNICUS/S2/20180217T001059_20180217T001101_T56KLF", // pretty good
    "COPERNICUS/S2/20190702T001119_20190702T001117_T56KLF", // pretty good
    "COPERNICUS/S2/20200820T001121_20200820T001115_T56KLF" // pretty good
    //"COPERNICUS/S2_HARMONIZED/20210721T001109_20210721T001111_T56KLF", // Pretty good
    //"COPERNICUS/S2_HARMONIZED/20230313T001119_20230313T001113_T56KLF" // Pretty good
  ],
  false, true, REF1_OPTIONS);