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
  applyBrightnessAdjustment: true
};



var REF2_OPTIONS = {
  colourGrades: ['Raw-B1-B4'],
  exportScale: [10],
  exportBasename: BASEPRE+'R2',
  exportFolder: EXPORT_FOLDER,
  applySunglintCorrection: true,
  applyBrightnessAdjustment: true
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
    "COPERNICUS/S2/20200823T002101_20200823T002100_T55KFA",
    "COPERNICUS/S2/20210515T002059_20210515T002053_T55KFA"
  ],
  false, false,REF1_OPTIONS);
  
// Save the single best image as a comparison with the
// composite.
var REF_SINGLE_OPTIONS = {
  colourGrades: ['Raw-B1-B4'],
  exportScale: [10],
  exportBasename: BASEPRE+'20200818',
  exportFolder: EXPORT_FOLDER,
  applySunglintCorrection: true,
  applyBrightnessAdjustment: true
};

s2Utils.s2_composite_display_and_export(
  [
    "COPERNICUS/S2/20200818T002059_20200818T002058_T55KFA"
  ],
  false, true,REF1_OPTIONS);


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
  false, true,REF1_OPTIONS);
