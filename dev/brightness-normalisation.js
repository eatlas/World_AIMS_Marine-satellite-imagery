// Copyright 2021 Eric Lawrey - Australian Institute of Marine Science
//
// MIT License https://mit-license.org/
// This script is written to run on the Google Earth Engine 

// This script was setup to research into how to best correct brightness
// offsets between Sentinel 2 scenes in ocean waters. 
// The lessons from this script development have been incorporated into the
// s2Utils.s2_composite_brightness_normalisation() function.
//
// When contrast enhancement is applied to Sentinel 2 composite imagery, where the
// black level threshold is constant across all scenes then we find 
// small differences in scene brightness. This can be seen in the 
// preview image of the draft dataset:
// https://eatlas.org.au/data/uuid/2932dc63-9c9b-465f-80bf-09073aacaf1c.
// Some scenes are dark (particularly in areas where the water quality is
// not as clear), others are paler. There appears to be a rough pattern of 
// light to dark over the width of approximately three neighbouring Senintel 2
// tiles. While this is somewhat predictable, individual tiles can vary
// due to the limited set of images included in the composite image.
//
// This script aims to determine a method for predicting the overall
// scene brightness and to use this to apply a compensation to the image
// prior to contrast enhancement. This will standardise the black point of the 
// images allowing the contrast enhancement to be more consistent and allow
// subsequent algorithms that are threshold dependent, such as reef top estimates
// and reef boundary estimates, to be more consistent.
// 
// This script is intended to allow experiementation on determining scene
// brightness then applying these as corrections to the image. This script
// is not part of the production workflow, but for trying out ideas. Once
// these have been prototyped here they were incorporated into s2Utils and the
// main processing pipeline.
//
// Note that a summary of runs of this script are recorded in Scene-brightness.xlxs


var s2Utils = require('users/ericlawrey/World_AIMS_Marine-satellite-imagery:s2Utils.js');

// This script only analyses one image at a time. The following are
// a set of composite images that can be used for experimentation.

// Very Dark scene
var ashmoreReef = {
  imageIds:[
    "COPERNICUS/S2/20180813T004711_20180813T004705_T54LZP",
    "COPERNICUS/S2/20200822T004711_20200822T004712_T54LZP",
    "COPERNICUS/S2/20210603T004709_20210603T004707_T54LZP"
  ],
  locTitle: "Ashmore reef (54LZP)"
};

// Very Dark scene
var bootReef = {
  imageIds: [
    // Maybe
    "COPERNICUS/S2/20190115T004709_20190115T004705_T55LBK",
    "COPERNICUS/S2/20190510T004711_20190510T004710_T55LBK",
    "COPERNICUS/S2/20190907T004711_20190907T004705_T55LBK",
    "COPERNICUS/S2/20200613T004711_20200613T004712_T55LBK",
    "COPERNICUS/S2/20200822T004711_20200822T004712_T55LBK",
    "COPERNICUS/S2/20210802T004709_20210802T004707_T55LBK"
  ],
  locTitle: "Boot Reef (55LBK)"
};

var cairns = {
  imageIds: [
    // Excellent
    "COPERNICUS/S2/20161115T002712_20161115T002822_T55KCB", // Right
    "COPERNICUS/S2/20190914T003701_20190914T003703_T55KCB", // Left
    "COPERNICUS/S2/20200730T003711_20200730T003710_T55KCB", // Left

    // Good with good water clarity                      
    "COPERNICUS/S2/20180827T002711_20180827T002706_T55KCB", // Right
    "COPERNICUS/S2/20200715T003709_20200715T003706_T55KCB" // Left
  ],
  locTitle: "Cairns (55KCB)"
};

// Average scene brightness
var flindersReefs = {
  imageIds: [
    "COPERNICUS/S2/20180426T002101_20180426T002056_T55KFA",
    "COPERNICUS/S2/20161013T002102_20161013T032259_T55KFA",
    "COPERNICUS/S2/20170824T002059_20170824T002101_T55KFA",
    "COPERNICUS/S2/20180131T002049_20180131T002047_T55KFA",
    "COPERNICUS/S2/20180809T002049_20180809T002049_T55KFA"
  ],
  locTitle: "Flinders Reefs (55KFA)"
};

// Darker scene
var marionReef = {
  imageIds: [
    "COPERNICUS/S2/20170831T000729_20170831T000725_T56KMD",
    "COPERNICUS/S2/20170925T001111_20170925T001105_T56KMD",
    "COPERNICUS/S2/20190905T001111_20190905T001109_T56KMD"
  ],
  locTitle: "Marion Reef (56KMD)"
};

// Lighter scene
var unseamount = {
  imageIds: [
    // Good
    "COPERNICUS/S2/20151128T234812_20170509T143613_T56KQE",
    "COPERNICUS/S2/20160416T235041_20160417T061750_T56KQE"
  ],
  locTitle: "U/N seamount (56KQE)"
};

// Darker scene
var bougainville = {
  imageIds: [
    "COPERNICUS/S2/20180812T002659_20180812T002702_T55LEC",
    "COPERNICUS/S2/20180822T002659_20180822T002700_T55LEC",
    "COPERNICUS/S2/20190906T002709_20190906T002709_T55LEC",
    "COPERNICUS/S2/20160419T003034_20160419T015417_T55LEC",
    "COPERNICUS/S2/20170613T003031_20170613T003033_T55LEC"
  ],
  locTitle: "Bougainville Reef (55LEC)"
};

// lighter scene
var osprey = {
  imageIds: [
    // OK images
    "COPERNICUS/S2/20161215T003032_20161215T003028_T55LDE",
    "COPERNICUS/S2/20170713T002711_20170713T002708_T55LDE",
    "COPERNICUS/S2/20181016T002701_20181016T002704_T55LDE",
    "COPERNICUS/S2/20181115T002701_20181115T002702_T55LDE"
  ],
  locTitle: "Osprey Reef (55LDE)"
};


var centralCapeYork = {
  imageIds: 
  [
    "COPERNICUS/S2/20180729T004709_20180729T004703_T54LXN",
    "COPERNICUS/S2/20180828T004659_20180828T004657_T54LXN",
    "COPERNICUS/S2/20190704T004719_20190704T004715_T54LXN",
    "COPERNICUS/S2/20190813T004709_20190813T004712_T54LXN",
    "COPERNICUS/S2/20191017T004711_20191017T004709_T54LXN",
    "COPERNICUS/S2/20151117T004742_20170102T064132_T54LXN",
    "COPERNICUS/S2/20161012T004702_20161012T053917_T54LXN",
    "COPERNICUS/S2/20180724T004711_20180724T004707_T54LXN",
    "COPERNICUS/S2/20180917T004659_20180917T004657_T54LXN",
    "COPERNICUS/S2/20181007T004659_20181007T004701_T54LXN",
    "COPERNICUS/S2/20181022T004701_20181022T004703_T54LXN",
    "COPERNICUS/S2/20190828T004711_20190828T004707_T54LXN",
    "COPERNICUS/S2/20190907T004711_20190907T004705_T54LXN",
    "COPERNICUS/S2/20200404T004701_20200404T004702_T54LXN",
    "COPERNICUS/S2/20200822T004711_20200822T004712_T54LXN"
  ], 
  locTitle: "Central Cape York (54LXN)"
};
// ====================================================
// Indicate which scene to analyses. This script only
// looks at one scene at a time.
var scene = flindersReefs;

// Indicate if we should make histograms of the scene brightness
var MAKE_CHARTS = false;
var imageIds = scene.imageIds;
var locTitle = scene.locTitle;

//var composite = ee.Image("COPERNICUS/S2/20180426T002101_20180426T002056_T55KFA");
var composite = s2Utils.s2_composite(imageIds, true, false);
  
// Our goal is to create a mask that focuses on deeper water areas.
// We will then using these areas to estimate the brightness offsets
// to apply to the image. The goal is to work out the brightness adjustment
// needed between scenes. Since we stretchs the contrast a lot in the final
// images any slight changes in the image brightness lead to large changes
// in the final contrast enhanced image. Here we are trying to work out
// what the offset is for the given composite. We don't want this processing
// to be affected by clouds, which is why we are using the cloud free
// composite for the estimation. We also don't want it to be affected by 
// land and shallow reef areas as we want to compare the current image
// to a fixed water brightness. 

// Try to mask off all the things in the image that are not clear open water.
// Since we are applying fixed thresholds the actual brightness offset of
// the image will affect this masking slightly, however the final calculation
// will use a percentile to estimate the open dark water and so the inclusion
// of a small amount of imperfectly masked areas shouldn't hopefully affect
// the estimate too much.

// Mask off shallow areas as these are typically very bright in all visible
// channels and are not open water.
// Shallow water areas ~5 m depth. This also masks off inshore very turbid
// waters which is not detected by the mediumMask based on the green band (B3)
// Parameter tuning history:
// Cairns, Green Island, Tongue Reef (55KCB): Ideal: 220
//   150: Reef tops to 5 m. Some slight scattered small artifacts. Some land
//        masked (~ 50%). Large inshore area masked off.
//   220: Reef tops to 4-5 m. Some slight scattered small artifacts (~50% of 150). 
//        Some land masked (~ 40%).
//   300: Reef tops to ~4 m. Some slight scattered small artifacts (~70% of 220)
//        Masked inshore edge is much smaller (20% of 150).
var shallowMask = composite.select('B4').gt(220);

// Pick up slightly deeper areas than the red channel (B4)
// This threshold was picked to minimise false positives.
// Parameter tuning history:
// Boot Reef (55LBK): 
//   400: Onset of non-reefal (cloud) false positives
//   600: About 50% of deep reef area not captured
// Cairns, Green Island, Tongue Reef (55KCB): ideal: 600
//   400: Too much of the inshore and midshelf areas is masked off 
//        It is masked all the way to the reefs.
//   600: Inshore areas masked off, reef masked to about 10 m.
// Ashmore Reef (54LZP): ideal: ~ 400
//   600: Reef tops to ~ 8 - 10 m + scattered poorly masked clouds
//   400: Deeper coverage of reefs (~ 15 m) + scattered poorly masked clouds +
//        some clear water on the inside of the barrier reef.

var mediumMask = composite.select('B3').gt(600);

// Land and very shallow areas. This threshold was trimmed high enough
// so that the false positives due to unresolved noise from clouds does
// not result in too many false positives.
// Parameter tuning history:
// Cairns, Green Island, Tongue Reef (55KCB): optimal: 450
//   300: Tops of some reefs masked, with is OK. Significant cloud
//        artifacts on right side of image (no OK).
//   450: Some very light scattered offshore artifacts. Land well masked.
//        Some shadowed mountain areas are unmasked.
//   600: 1/5 the amount of offshore artifacts as 450. Some shadowed mountain
//        areas are unmasked.
//   900: More holes in mountain shadows. No offshore artifacts.
// Boot Reef (55LBK) 
// This area has less clear water, but no land
//   300: Lots of scattered cloud artifacts and some reef tops (OK)
//   450: Scattered cloud artifacts, about 5 times less than 300
//   600: Very small number of cloud artifacts.
// Ashmore Reef (54LZP)
//   300: Some scattered cloud artifacts
//   450: Very light scattered artifacts from poorly masked clouds
//   600: Poorly masked clouds still visible
var landMask = composite.select('B8').gt(450); 

var overallMask = shallowMask.or(mediumMask).or(landMask).not();

var maskedComposite = composite.updateMask(overallMask);



Map.addLayer(maskedComposite, 
  {'bands':['B4', 'B3', 'B2'], 'min': 0, 'max': 1400, 'gamma': 1},
  "masked Composite", true, 1);
  
// For some reason the geometry of the composite image has a 
// centroid of 0,0 and so we can't directly zoom to the image.
// We instead work this out from the imageIDs.
var australia = ee.Geometry.BBox(109, -33, 158, -7);
var tileGeom = s2Utils.get_s2_tiles_geometry(imageIds, australia);
// Zoom to our tile of interest.
Map.centerObject(tileGeom, 9);





print("Open water area Composite");
var openWaterImage = maskedComposite.select(
  ['B1','B2','B3','B4','B5','B6','B7','B8','B8A']);

//print(openWaterImage.reduceRegion({
//  reducer: ee.Reducer.percentile([5]),
//  geometry: tileGeom,
//  scale: 250,
//  maxPixels: 1e8
//}));

//function get_mask_percent(image){ 

  var maskedPixelCount = maskedComposite.select('B1').reduceRegion({
    reducer: ee.Reducer.count(),
    geometry: tileGeom,
    scale: 250,
    maxPixels: 1e8
  }).get('B1');
  print(maskedPixelCount);
  var noMaskPixelCount = composite.select('B1').reduceRegion({
    reducer: ee.Reducer.count(),
    geometry: tileGeom,
    scale: 250,
    maxPixels: 1e8
  }).get('B1');
 print(noMaskPixelCount);
 var percentMasked = ee.Number(maskedPixelCount).divide(noMaskPixelCount);
 
//  return percentMasked;
//}
print(percentMasked);
var imgStats = openWaterImage.reduceRegion({
  reducer: ee.Reducer.percentile([5]),
  geometry: tileGeom,
  scale: 250,
  maxPixels: 1e8
});

var adjScalar = percentMasked.sqrt();
print(imgStats);
var adjB1 = composite.select(['B1']).subtract(
  ee.Image(ee.Number(imgStats.get('B1')).subtract(1174).multiply(adjScalar)));
var adjB2 = composite.select(['B2']).subtract(
  ee.Image(ee.Number(imgStats.get('B2')).subtract(753).multiply(adjScalar)));
var adjB3 = composite.select(['B3']).subtract(
  ee.Image(ee.Number(imgStats.get('B3')).subtract(338).multiply(adjScalar)));
var adjB4 = composite.select(['B4']).subtract(
  ee.Image(ee.Number(imgStats.get('B4')).subtract(121).multiply(adjScalar)));

var adjComposite = composite
    .addBands(adjB1,['B1'], true)
    .addBands(adjB2,['B2'], true)
    .addBands(adjB3,['B3'], true)
    .addBands(adjB4,['B4'], true);


var compositeDeepFalse = s2Utils.bake_s2_colour_grading(composite, "DeepFalse", false);
var adjCompositeDeepFalse = s2Utils.bake_s2_colour_grading(adjComposite, "DeepFalse", false);

//Map.addLayer(compositeDeepFalse, 
//  { 'min': 0, 'max': 1, 'gamma': 1}, "Composite Deep False", false, 1);
//Map.addLayer(adjCompositeDeepFalse, 
//  { 'min': 0, 'max': 1, 'gamma': 1}, "Adjusted Composite Deep False", false, 1);
  
var compositeTrueColour = s2Utils.bake_s2_colour_grading(composite, "TrueColour", false);
var adjCompositeTrueColour = s2Utils.bake_s2_colour_grading(adjComposite, "TrueColour", false);

//Map.addLayer(compositeTrueColour, 
//  { 'min': 0, 'max': 1, 'gamma': 1}, "Composite True Colour", false, 1);
//Map.addLayer(adjCompositeTrueColour, 
//  { 'min': 0, 'max': 1, 'gamma': 1}, "Adjusted Composite True Colour", false, 1);
Map.addLayer(composite, 
  { 'min': 0, 'max': 1400, 'gamma': 1}, "Composite True Colour", false, 1);

// Estimate slope as a method of delecting reef boundaries.

var slope = s2Utils.bake_s2_colour_grading(composite, "Slope", false);

Map.addLayer(slope,
  { 'min': 0, 'max': 1, 'gamma': 1}, "Slope", false, 1);



if (MAKE_CHARTS) {
    // Generate a histogram of the masked water.
    // Define the chart and print it to the console.
    var chart1 =
        ui.Chart.image.histogram({
          image: openWaterImage, 
          region: tileGeom, scale: 500})
            .setOptions({
              title: locTitle+' Open water area Histogram',
              hAxis: {
                title: 'Reflectance',
                titleTextStyle: {italic: false, bold: true},
              },
              vAxis:
                  {title: 'Count', titleTextStyle: {italic: false, bold: true}},
              colors: ['A800FF', '0079FF', '00F11D','FF4F00','FF0900','aa0000','A587CA','36CEDC','FFEA56','FFB750']
            });
    print(chart1);
}

if(false) {
    print("Whole image");
    var wholeImage = composite.select(
      ['B1','B2','B3','B4','B5','B6','B7','B8','B8A']);
    print(wholeImage.reduceRegion({
      reducer: ee.Reducer.percentile([5]),
      geometry: tileGeom,
      scale: 250,
      maxPixels: 1e8
    }));

    if (MAKE_CHARTS) {
    var chart2 =
        ui.Chart.image.histogram({
          image: wholeImage, 
          region: tileGeom, scale: 500})
            .setOptions({
              title: locTitle+' Whole image Histogram',
              hAxis: {
                title: 'Reflectance',
                titleTextStyle: {italic: false, bold: true},
              },
              vAxis:
                  {title: 'Count', titleTextStyle: {italic: false, bold: true}},
              colors: ['A800FF', '0079FF', '00F11D','FF4F00','FF0900','aa0000','A587CA','36CEDC','FFEA56','FFB750']
            });
    print(chart2);
    }
}