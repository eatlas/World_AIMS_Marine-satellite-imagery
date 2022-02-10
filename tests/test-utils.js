// Copyright 2022 Eric Lawrey - Australian Institute of Marine Science
//
// MIT License https://mit-license.org/
// This script is written to run on the Google Earth Engine 

// This script performs various tests on the functions in utils.js.
var utils = require('users/ericlawrey/World_AIMS_Marine-satellite-imagery:s2-utils.js');

// -----------------------
// Unit Testing functions
// -----------------------
// Define a set of unit testing functions to streamline performing test.
// Don't use an external library to minimise the dependencies. 

// Simple scalar array comparison
var compareArray = function(array1, array2) {
  // From https://stackoverflow.com/questions/7837456/how-to-compare-arrays-in-javascript
  return(array1.length === array2.length && array1.every(
    function(value, index) { return value === array2[index]}));
};

var assertTrue = function(testName, assertBoolean) {
  if (! assertBoolean) throw testName+": failed";
  print(testName+": passed");
};

var assertFalse = function(testName, assertBoolean) {
  if (assertBoolean) throw testName+": failed";
  print(testName+": passed");
};

var assertExpectError = function(testName, code, errorContains) {
  try {
    code();   // run the code. Expecting an error  
  } catch (error) {
    if (String(error).indexOf(errorContains) !== -1) {
      print(testName+": passed");
      return;
    }
  }
  // If we reach here there was no error in the code thus the test failed
  throw testName+": failed";
};

// ---------------------------------------
// Test that the unit test functions work
// ---------------------------------------
print (" ------ Test Unit test functions ------");
assertExpectError("assertExpectError 1",function(){
  throw "my error";
  }, "my error");
  
assertTrue("assertTrue 1", true);
assertFalse("assertFalse 1", false);

assertTrue("compareArray strings 1", compareArray(["A","B"],["A","B"]));
assertTrue("compareArray strings 2", compareArray(["A"],["A"]));
assertFalse("compareArray strings 3", compareArray(["A"],["A","B"]));
assertFalse("compareArray strings 4", compareArray(["A","B"],["A","C"]));

assertTrue("compareArray numbers 1", compareArray([1,2],[1,2]));
assertFalse("compareArray numbers 2", compareArray([1,2],[3,4]));
assertTrue("compareArray empty 1", compareArray([],[]));


// ---------------------------------------
//        Test utils functions
// ---------------------------------------
print (" ------ Test utils functions ------");


assertTrue("unique_s2_tiles 1", compareArray(
  utils.unique_s2_tiles([
    "COPERNICUS/S2/20190115T004709_20190115T004705_T55LBK",
    "COPERNICUS/S2/20190510T004711_20190510T004710_T55LBK",
    "COPERNICUS/S2/20190907T004711_20190907T004705_T55LBK",
    "COPERNICUS/S2/20200613T004711_20200613T004712_T55LBK",
    "COPERNICUS/S2/20160824T015622_20160824T065137_T51LXG"
    ]),
  ["55LBK","51LXG"]));
  
assertTrue("unique_s2_tiles 2", compareArray(
  utils.unique_s2_tiles([
    "COPERNICUS/S2/20190115T004709_20190115T004705_T55LBK"
    ]),
  ["55LBK"]));

assertExpectError("unique_s2_tiles 3", function(){
  utils.unique_s2_tiles([
    "Hello there"
    ])},
    "imageIds don't match"
    );
    
assertExpectError("unique_s2_tiles 4", function(){  
  utils.s2_composite([
    "COPERNICUS/S2/20190115T004709_20190115T004705_T55LBK",
    "COPERNICUS/S2/20160824T015622_20160824T065137_T51LXG"
    ])},
    "only supports images from a single tile");

