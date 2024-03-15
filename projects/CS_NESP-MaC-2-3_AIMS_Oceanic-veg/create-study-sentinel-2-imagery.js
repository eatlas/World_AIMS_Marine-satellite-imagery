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
var BASEPRE = 'Wld_AIMS_Marine-sat-img_S2';

var REF1_OPTIONS = {
  colourGrades: ['DeepFalse'],
  exportScale: [10],
  exportBasename: BASEPRE,
  exportFolder: EXPORT_FOLDER,
  applySunglintCorrection: true,
  applyBrightnessAdjustment: false
};


// ======== Ashmore Reef (Coral Sea) - Far North =========
// Searched 73 out of 73 
// 2016 - 2024-03-01
// Not used as the bathymetry was too poor to create benthic reflectance map.
s2Utils.s2_composite_display_and_export(
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
  false, true,REF1_OPTIONS);
  
  
