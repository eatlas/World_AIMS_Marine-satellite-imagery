var s2Utils = require('users/ericlawrey/World_AIMS_Marine-satellite-imagery:src/01-gee/sentinel2/s2Utils.js');

// Primary imagery
var REF1_OPTIONS = {
  colourGrades: ['DeepFalse','TrueColour','ReefTop','Shallow','Slope'],
  exportScale: [10, 10, 10, 10, 30],
  exportBasename: 'World_AIMS_Marine-satellite-imagery_S2_R1',
  exportFolder: 'EarthEngine/World_AIMS_Marine-satellite-imagery/Eastern-Micronesia',
  
  applySunglintCorrection: true,
  applyBrightnessAdjustment: true
};

// Secondary imagery
var REF2_OPTIONS = {
  colourGrades: ['DeepFalse','TrueColour','Slope'],
  exportBasename: 'World_AIMS_Marine-satellite-imagery_S2_R2',
  exportFolder: 'EarthEngine/World_AIMS_Marine-satellite-imagery/Eastern-Micronesia',
  exportScale: [10, 10, 30],
  applySunglintCorrection: true,
  applyBrightnessAdjustment: true
};

//04NFH Kitibati, Kiritimati
// Not enough images
// 26 of 26 images searched

s2Utils.s2_composite_display_and_export(
  [
    //Good images
    "COPERNICUS/S2/20200626T210451_20200626T210448_T04NFH",
    "COPERNICUS/S2/20200517T210451_20200517T210448_T04NFH",
    // okay
    "COPERNICUS/S2/20170707T210439_20170707T210442_T04NFH"
  ],
  false, false, REF1_OPTIONS);


s2Utils.s2_composite_display_and_export(
  [
    // maybe images          
    "COPERNICUS/S2/20190702T210451_20190702T210448_T04NFH"
  ],
  false, false, REF2_OPTIONS);
  
// 58PGR Marshall Islands, Kwajalein Atoll
// Not enough images
// 18 of 18 images

s2Utils.s2_composite_display_and_export(
  [
    //good images
    "COPERNICUS/S2/20200822T232209_20200822T232212_T58PGR",
    //okay
    "COPERNICUS/S2/20180110T232201_20180110T232200_T58PGR",
    "COPERNICUS/S2/20180917T232201_20180917T232204_T58PGR",
    "COPERNICUS/S2/20190219T232209_20190219T232207_T58PGR",
    "COPERNICUS/S2/20191116T232209_20191116T232206_T58PGR",
    "COPERNICUS/S2/20201120T232209_20201120T232209_T58PGR",
    "COPERNICUS/S2/20210713T232211_20210713T232211_T58PGR"
  ],
  false, false, REF1_OPTIONS);


s2Utils.s2_composite_display_and_export(
  [
    // maybe images          
    "COPERNICUS/S2/20170214T232201_20170214T232329_T58PGR",
    "COPERNICUS/S2/20181201T232209_20181201T232203_T58PGR",
    "COPERNICUS/S2/20200628T232211_20200628T232213_T58PGR"
  ],
  false, false, REF2_OPTIONS);
  
  
 // 58PET Marshall Islands, Bikini Atoll
// Not enough images
// 21 of 21 images

s2Utils.s2_composite_display_and_export(
  [
    //good images
    "COPERNICUS/S2/20190314T233259_20190314T233253_T58PET",
    "COPERNICUS/S2/20200128T233249_20200128T233248_T58PET",
    //okay
    "COPERNICUS/S2/20180403T233301_20180403T233255_T58PET",
    "COPERNICUS/S2/20190523T233309_20190523T233304_T58PET",
    "COPERNICUS/S2/20180108T233249_20180108T233247_T58PET",
    "COPERNICUS/S2/20180222T233251_20180222T233252_T58PET",
    "COPERNICUS/S2/20210216T233301_20210216T233255_T58PET"
  ],
  false, false, REF1_OPTIONS);


s2Utils.s2_composite_display_and_export(
  [
    // maybe images          
    "COPERNICUS/S2/20180508T233259_20180508T233254_T58PET", // sunglint on edge
    "COPERNICUS/S2/20191020T233259_20191020T233256_T58PET",
    "COPERNICUS/S2/20210211T233259_20210211T233254_T58PET",
    "COPERNICUS/S2/20210820T233259_20210820T233254_T58PET"
  ],
  false, false, REF2_OPTIONS);