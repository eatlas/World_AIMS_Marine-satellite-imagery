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
var s2Utils = require('users/ericlawrey/World_AIMS_Marine-satellite-imagery:src/01-gee/sentinel2/s2Utils.js');

// This is the list of images to look through. Think of this list as
// as a temporary list of images that you are working on that you wish
// to review. You can therefore delete all the ones currently in the
// list and copy into the image IDs of the images you are interested
// in reviewing.
// A good image from this area would need to export multiple shots then
// used blended masking in Photoshop.
var IMAGE_IDS = 
  [
		"COPERNICUS/S2_HARMONIZED/20161215T003032_20161215T003028_T55LDE",
    "COPERNICUS/S2_HARMONIZED/20170713T002711_20170713T002708_T55LDE",
    "COPERNICUS/S2_HARMONIZED/20181016T002701_20181016T002704_T55LDE",
    "COPERNICUS/S2_HARMONIZED/20181115T002701_20181115T002702_T55LDE",
    "COPERNICUS/S2_HARMONIZED/20210319T002709_20210319T002706_T55LDE",
    "COPERNICUS/S2_HARMONIZED/20201005T002711_20201005T002713_T55LDE"
  ];

s2Utils.viewSelectedSentinel2ImagesApp(IMAGE_IDS);