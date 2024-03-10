// Copyright 2024 Eric Lawrey - Australian Institute of Marine Science
//
// MIT License https://mit-license.org/
// This script is written to run on the Google Earth Engine. 

// === README: Change the path to your local copy of the s2Utils code ====
// The path to the util code must be an absolute path including the
// username and repository
var s2Utils = require('users/ericlawrey/World_AIMS_Marine-satellite-imagery:src/01-gee/sentinel2/s2Utils.js');


var REGION = 'Coral-Sea';
var PROJECT = 'cs-aims-nesp-mac-2-3';
var EXPORT_FOLDER = 'EarthEngine/Wld_AIMS_Marine-sat-img/'+PROJECT+'/'+REGION;
var BASEPRE = 'Wld_AIMS_Marine-sat-img_S2_';

var REF1_OPTIONS = {
  colourGrades: ['Raw-B1-B4'],
  exportScale: [10],
  exportBasename: BASEPRE,
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
  false, true, REF1_OPTIONS);

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
  false, true,REF_SINGLE_OPTIONS);


  
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
  
// ======== Ashmore Reef (Coral Sea) - Far North =========
// Searched 73 out of 73 
// 2016 - 2024-03-01
// Not used as the bathymetry was too poor to create benthic reflectance map.
/*s2Utils.s2_composite_display_and_export(
  [
    "COPERNICUS/S2_HARMONIZED/20160823T004902_20160823T021200_T54LZP", // clouds, but shows some vegetation structure
    //"COPERNICUS/S2_HARMONIZED/20180813T004711_20180813T004705_T54LZP", // Clear top half, clouds in bottom. High CDOM
    "COPERNICUS/S2_HARMONIZED/20200414T004711_20200414T004705_T54LZP", // Cloud free, vegetation not super clear due to sunglint
    //"COPERNICUS/S2_HARMONIZED/20200822T004711_20200822T004712_T54LZP", // Low cloud, but sunglint reduces depth visbility
    "COPERNICUS/S2_HARMONIZED/20210603T004709_20210603T004707_T54LZP", // Some cloud patches. Vegetation boundaries visible in parts. 9/10
    "COPERNICUS/S2_HARMONIZED/20210723T004709_20210723T004708_T54LZP", // Cloud free, low glint, vegetation not very visible
    "COPERNICUS/S2_HARMONIZED/20210802T004709_20210802T004707_T54LZP", // Some cloud, vegetation not very visible
    "COPERNICUS/S2_HARMONIZED/20220529T004709_20220529T004706_T54LZP", // very low cloud, moderately clear 6/10
  ],
  false, true,REF1_OPTIONS);*/
  
  
// ======== Osprey Reef (Coral Sea) - North =========
// 2016 - 2024-03
// little difference when trying different image combinations
// Getting error: Image.select: Pattern 'cloudmask' did not match any bands. Available bands
// For this reason the imagery was not used.
/*s2Utils.s2_composite_display_and_export(
  [
    //"COPERNICUS/S2_HARMONIZED/20161215T003032_20161215T003028_T55LDE", //4/10
    //"COPERNICUS/S2_HARMONIZED/20170713T002711_20170713T002708_T55LDE", // large clouds
    "COPERNICUS/S2_HARMONIZED/20181016T002701_20181016T002704_T55LDE", // 9/10
    "COPERNICUS/S2_HARMONIZED/20181115T002701_20181115T002702_T55LDE", // 5/10
    "COPERNICUS/S2_HARMONIZED/20210319T002709_20210319T002706_T55LDE", // 8/10
    //"COPERNICUS/S2_HARMONIZED/20201005T002711_20201005T002713_T55LDE", //4/10
    "COPERNICUS/S2_HARMONIZED/20210319T002709_20210319T002706_T55LDE", // 8/10
    "COPERNICUS/S2_HARMONIZED/20211025T002709_20211025T002709_T55LDE", // 6/10
    //"COPERNICUS/S2_HARMONIZED/20220113T002709_20220113T002703_T55LDE", // 6/10 no cloud
  ],
  false, false,REF1_OPTIONS); */
  
// 55KEV - Australia, GBR, Davies, Grub, Chicken
// CLOUDY_PIXEL_PERCENTAGE = 0.1
// 27 of 27 Images
s2Utils.s2_composite_display_and_export(
  [
    // Excellent (Water clarity index 1 - low visibility, 5 - excellent)
    //"COPERNICUS/S2/20160708T003035_20160708T015011_T55KEV", // (2) - Removed due to lower WQ
    "COPERNICUS/S2/20190812T002711_20190812T002711_T55KEV", // (4)
    "COPERNICUS/S2/20190822T002711_20190822T002710_T55KEV", // (4)
    "COPERNICUS/S2/20190906T002709_20190906T002709_T55KEV", // (5) Can see the midshelf sea floor. Great view of weird ring contours
    "COPERNICUS/S2/20200727T002711_20200727T002713_T55KEV", // (3)
    "COPERNICUS/S2/20200816T002711_20200816T002713_T55KEV", // (3)
    //"COPERNICUS/S2/20200821T002709_20200821T002711_T55KEV", // (1) Low Water Quality, bit excellent view of plumes around reefs.
    "COPERNICUS/S2/20210915T002709_20210915T002703_T55KEV"  // (3)
  ],
  false, true, REF1_OPTIONS);