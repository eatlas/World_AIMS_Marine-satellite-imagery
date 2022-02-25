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
		// Good
    "COPERNICUS/S2/20160107T234812_20160107T234811_T56LRJ",
    
    // Maybe left
    "COPERNICUS/S2/20160409T235756_20160410T012314_T56LRJ",
    "COPERNICUS/S2/20160429T235802_20160429T235802_T56LRJ",
    // Maybe right
    "COPERNICUS/S2/20151208T234812_20151208T234812_T56LRJ",
    "COPERNICUS/S2/20160317T234812_20160317T234939_T56LRJ",
    "COPERNICUS/S2/20160406T234812_20160406T234954_T56LRJ"
  ];

s2Utils.viewSelectedSentinel2ImagesApp(IMAGE_IDS);