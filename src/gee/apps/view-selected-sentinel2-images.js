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
var IMAGE_IDS = 
  [
		"COPERNICUS/S2/20190812T002711_20190812T002711_T55KEV", // (4)
    "COPERNICUS/S2/20190822T002711_20190822T002710_T55KEV", // (4)
    "COPERNICUS/S2/20190906T002709_20190906T002709_T55KEV", // (5) Can see the midshelf sea floor. Great view of weird ring contours
    "COPERNICUS/S2/20200727T002711_20200727T002713_T55KEV", // (3)
    "COPERNICUS/S2/20200816T002711_20200816T002713_T55KEV", // (3)
    //"COPERNICUS/S2/20200821T002709_20200821T002711_T55KEV", // (1) Low Water Quality, bit excellent view of plumes around reefs.
    "COPERNICUS/S2/20210915T002709_20210915T002703_T55KEV"  // (3)
  ];

s2Utils.viewSelectedSentinel2ImagesApp(IMAGE_IDS);