var s2Utils = require('users/ericlawrey/World_AIMS_Marine-satellite-imagery:src/01-gee/sentinel2/s2Utils.js');

var REGION = 'GBR-Torres-Strait';
var PROJECT = 'marb';
var EXPORT_FOLDER = 'EarthEngine/World_AIMS_Marine-sat-imagery/'+PROJECT+'/'+REGION;
var BASEPRE = 'World_AIMS_Marine-sat-imagery_S2_';

var REF1_OPTIONS = {
  colourGrades: ['TrueColour', 'Infrared'],
  exportScale: [10, 20],
  exportBasename: BASEPRE+'R1',
  exportFolder: EXPORT_FOLDER,
  applySunglintCorrection: true,
  applyBrightnessAdjustment: true
};

var REF2_OPTIONS = {
  colourGrades: ['TrueColour'],
  exportScale: [10],
  exportBasename: BASEPRE+'R2',
  exportFolder: EXPORT_FOLDER,
  applySunglintCorrection: true,
  applyBrightnessAdjustment: true
};

var REF2_OPTIONS_HSG = {
  colourGrades: ['TrueColour'],
  exportScale: [10],
  exportBasename: BASEPRE+'R2',
  exportFolder: EXPORT_FOLDER,
  applySunglintCorrection: true,
  applyBrightnessAdjustment: true,
  sunglintCorrectionLevel: 2
};


  
// ===============================================================
//
//            GREAT BARRIER REEF MARINE PARK
//
// ===============================================================
  
// Australia, GBR, East of top of Cape York
// CLOUDY_PIXEL_PERCENTAGE = 1
// 21 of 21 images
s2Utils.s2_composite_display_and_export(
  [
    "COPERNICUS/S2/20180724T004711_20180724T004707_T54LYN", // Scattered clouds, clear water
    "COPERNICUS/S2/20190907T004711_20190907T004705_T54LYN", // Clear water, some scattered clouds
    "COPERNICUS/S2/20190917T004711_20190917T004705_T54LYN" // Moderate water clarity, some scattered clouds 
  ],
  false, true, REF1_OPTIONS);
  
s2Utils.s2_composite_display_and_export(
  [
    "COPERNICUS/S2/20180614T004711_20180614T004705_T54LYN", // Light clouds, not very clear
    "COPERNICUS/S2/20200926T004709_20200926T004709_T54LYN"  // High sunglint
  ],
  false, true, REF2_OPTIONS_HSG);
  
  
  
   //55LCD Australia, GBR, Lizard Island, Ribbon No 10 reef
// Searched 29 out of 29 images
// not enough images

s2Utils.s2_composite_display_and_export(
  [
    //Excellent
    "COPERNICUS/S2/20200819T003711_20200819T003710_T55LCD",
    // good
    "COPERNICUS/S2/20190810T003709_20190810T003711_T55LCD",
    // Okay
    "COPERNICUS/S2/20160830T003952_20160830T003955_T55LCD",
    "COPERNICUS/S2/20180810T003701_20180810T003704_T55LCD"
  ],
  false, true, REF1_OPTIONS);


s2Utils.s2_composite_display_and_export(
  [
    // Okay
    "COPERNICUS/S2/20190731T003709_20190731T003712_T55LCD",
    "COPERNICUS/S2/20190914T003701_20190914T003703_T55LCD",
    //maybe
    "COPERNICUS/S2/20190211T003709_20190211T003704_T55LCD",
    "COPERNICUS/S2/20190221T003709_20190221T003704_T55LCD"
  ],
  false, true, REF2_OPTIONS);
 

 //55KFU Australia, GBR, Dingo Reefs, Gould Reefs
// Searched 86 out of 86 images

s2Utils.s2_composite_display_and_export(
  [
    //Excellent
    "COPERNICUS/S2/20180730T002049_20180730T002051_T55KFU",  
    "COPERNICUS/S2/20180829T002049_20180829T002045_T55KFU",
    "COPERNICUS/S2/20190908T002051_20190908T002053_T55KFU",
    "COPERNICUS/S2/20200729T002059_20200729T002057_T55KFU",
    "COPERNICUS/S2/20201101T002101_20201101T002059_T55KFU",
    "COPERNICUS/S2/20210729T002101_20210729T002058_T55KFU",
    "COPERNICUS/S2/20210922T002049_20210922T002052_T55KFU"
  ],
  false, true, REF1_OPTIONS);


s2Utils.s2_composite_display_and_export(
  [
    // Good
    "COPERNICUS/S2/20170804T002109_20170804T002104_T55KFU",
    "COPERNICUS/S2/20180605T002101_20180605T002055_T55KFU",
    "COPERNICUS/S2/20180620T002059_20180620T002053_T55KFU",
    "COPERNICUS/S2/20180705T002101_20180705T002055_T55KFU",
    "COPERNICUS/S2/20180819T002049_20180819T002047_T55KFU",
    "COPERNICUS/S2/20180824T002051_20180824T002053_T55KFU",
    "COPERNICUS/S2/20190809T002101_20190809T002058_T55KFU",
    "COPERNICUS/S2/20211012T002059_20211012T002055_T55KFU"
  ],
  false, true, REF2_OPTIONS);
  


