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
		"COPERNICUS/S2/20181221T004701_20181221T004658_T54LZQ",	// Some sunglint
    "COPERNICUS/S2/20151117T004742_20170102T064132_T54LZQ",	// Sunglint
    "COPERNICUS/S2/20171121T004659_20171121T004654_T54LZQ",	// Sunglint
    "COPERNICUS/S2/20190115T004709_20190115T004705_T54LZQ",	// Scattered clouds
    "COPERNICUS/S2/20191211T004659_20191211T004700_T54LZQ",	// Scattered clouds
    "COPERNICUS/S2/20200120T004659_20200120T004659_T54LZQ",	// Sunglint
    "COPERNICUS/S2/20200229T004709_20200229T004703_T54LZQ",	// Scattered clouds
    "COPERNICUS/S2/20200419T004659_20200419T004701_T54LZQ"	// Some banding, scattered clouds
  ];

s2Utils.viewSelectedSentinel2ImagesApp(IMAGE_IDS);