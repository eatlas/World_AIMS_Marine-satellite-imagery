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
		"COPERNICUS/S2/20160309T021612_20160309T023621_T49KGQ", // nutrient plumes
    "COPERNICUS/S2/20160915T024322_20160915T024317_T49KGQ", // nutrient plumes
    "COPERNICUS/S2/20170222T024321_20170222T024315_T49KGQ", // nutrient plumes
    "COPERNICUS/S2/20170513T024321_20170513T024338_T49KGQ", 
    "COPERNICUS/S2/20170717T024319_20170717T024321_T49KGQ",
    "COPERNICUS/S2/20170806T024319_20170806T024320_T49KGQ"
  ];

s2Utils.viewSelectedSentinel2ImagesApp(IMAGE_IDS);