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
		"COPERNICUS/S2/20160219T003032_20160219T003057_T55KCA",
    "COPERNICUS/S2/20160608T002712_20160608T002733_T55KCA",
    "COPERNICUS/S2/20170906T002659_20170906T002700_T55KCA",
    "COPERNICUS/S2/20180827T002711_20180827T002706_T55KCA",
    "COPERNICUS/S2/20180901T002659_20180901T002807_T55KCA",
    "COPERNICUS/S2/20181021T002709_20181021T002704_T55KCA",
    "COPERNICUS/S2/20181125T002701_20181125T002700_T55KCA",
    "COPERNICUS/S2/20190718T002719_20190718T002716_T55KCA",
    "COPERNICUS/S2/20190812T002711_20190812T002711_T55KCA",
    "COPERNICUS/S2/20190906T002709_20190906T002709_T55KCA",
    "COPERNICUS/S2/20191016T002709_20191016T002708_T55KCA"
  ];

s2Utils.viewSelectedSentinel2ImagesApp(IMAGE_IDS);