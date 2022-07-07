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
		"COPERNICUS/S2/20180330T002711_20180330T002706_T55LCC",
    "COPERNICUS/S2/20180330T002711_20180330T002706_T55LDC",
    "COPERNICUS/S2/20180330T002711_20180330T002706_T55LEC",
    "COPERNICUS/S2/20180330T002711_20180330T002706_T55KCB",
    "COPERNICUS/S2/20180330T002711_20180330T002706_T55KDB", // Turbid water on GBR side
    "COPERNICUS/S2/20180330T002711_20180330T002706_T55KEB",
    "COPERNICUS/S2/20180330T002711_20180330T002706_T55KCA",
    "COPERNICUS/S2/20180330T002711_20180330T002706_T55KDA",
    "COPERNICUS/S2/20180330T002711_20180330T002706_T55KEA",
    "COPERNICUS/S2/20180330T002711_20180330T002706_T55KCV",
    "COPERNICUS/S2/20180330T002711_20180330T002706_T55KDV",
    "COPERNICUS/S2/20180330T002711_20180330T002706_T55KEV",
    "COPERNICUS/S2/20180330T002711_20180330T002706_T55KCU",
    "COPERNICUS/S2/20180330T002711_20180330T002706_T55KDU",
    "COPERNICUS/S2/20180330T002711_20180330T002706_T55KEU"
  ];

s2Utils.viewSelectedSentinel2ImagesApp(IMAGE_IDS);