// Copyright 2022 Eric Lawrey - Australian Institute of Marine Science
// MIT License https://mit-license.org/

// This script is written to run on the Google Earth Engine
//
// Use this script to browse through a specific set of Sentinel 2
// images. This can be used to fine tune the selection of images obtained
// using the 01-select-best-sentinel2-images script. This saves having to
// step through all the non relevant images.

// === README: Change the path to your local copy of the s2Utils code ====
// The path to the util code must be an absolute path including the
// username and repository
var s2Utils = require('users/ericlawrey/World_AIMS_Marine-satellite-imagery:src/gee/s2Utils.js');

// This is the list of images to look through. Think of this list as
// as a temporary list of images that you are working on that you wish
// to review. You can therefore delete all the ones currently in the
// list and copy into the image IDs of the images you are interested
// in reviewing.
// A good image from this area would need to export multiple shots then
// used blended masking in Photoshop.
var IMAGE_IDS = 
  [
		//"COPERNICUS/S2/20191203T003701_20191203T003703_T55LBK", // Right Very low clouds
    "COPERNICUS/S2/20200216T003659_20200216T003700_T55LBK", // Right Very low clouds Good visibility
    // Maybe
    "COPERNICUS/S2/20190115T004709_20190115T004705_T55LBK", // Scattered clouds. Good platform visibility
    "COPERNICUS/S2/20190510T004711_20190510T004710_T55LBK",
    //"COPERNICUS/S2/20190907T004711_20190907T004705_T55LBK", // Dark water plumes
    "COPERNICUS/S2/20200613T004711_20200613T004712_T55LBK",
    "COPERNICUS/S2/20200822T004711_20200822T004712_T55LBK",
    "COPERNICUS/S2/20210802T004709_20210802T004707_T55LBK"
  ];

s2Utils.viewSelectedSentinel2ImagesApp(IMAGE_IDS);