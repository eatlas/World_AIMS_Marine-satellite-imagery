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
		"COPERNICUS/S2/20160913T015622_20160913T015617_T51LXD",
    
    // Maybe
    "COPERNICUS/S2/20170620T015701_20170620T015836_T51LXD",
    "COPERNICUS/S2/20171013T015639_20171013T020003_T51LXD",
    "COPERNICUS/S2/20180610T015619_20180610T015817_T51LXD",
    "COPERNICUS/S2/20180705T015621_20180705T015939_T51LXD",
    "COPERNICUS/S2/20180710T015619_20180710T020050_T51LXD"
  ];

s2Utils.viewSelectedSentinel2ImagesApp(IMAGE_IDS);