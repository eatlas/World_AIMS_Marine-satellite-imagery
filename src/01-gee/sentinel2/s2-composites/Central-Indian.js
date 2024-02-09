var s2Utils = require('users/ericlawrey/World_AIMS_Marine-satellite-imagery:src/01-gee/sentinel2/s2Utils.js');

// Primary imagery
var REF1_OPTIONS = {
  colourGrades: ['DeepFalse','TrueColour','ReefTop','Shallow','Slope'],
  exportScale: [10, 10, 10, 10, 30],
  exportBasename: 'World_AIMS_Marine-satellite-imagery_S2_R1',
  exportFolder: 'EarthEngine/World_AIMS_Marine-satellite-imagery/Central-Indian',
  
  applySunglintCorrection: true,
  applyBrightnessAdjustment: true
};

// Secondary imagery
var REF2_OPTIONS = {
  colourGrades: ['DeepFalse','TrueColour','Slope'],
  exportBasename: 'World_AIMS_Marine-satellite-imagery_S2_R2',
  exportFolder: 'EarthEngine/World_AIMS_Marine-satellite-imagery/Central-Indian',
  exportScale: [10, 10, 30],
  applySunglintCorrection: true,
  applyBrightnessAdjustment: true
};

// 43NCE Maldives, Hulhumale
// Searched 46 out of 46 images
// 

s2Utils.s2_composite_display_and_export(
  [
    //Excellent images
    "COPERNICUS/S2/20211202T052201_20211202T053702_T43NCE",
    // good images
    "COPERNICUS/S2/20160323T051622_20160323T053216_T43NCE", // sunglint in the corner (not to use)
    "COPERNICUS/S2/20181019T053711_20181019T053713_T43NCE", // waves
    "COPERNICUS/S2/20190507T053721_20190507T053720_T43NCE",
    "COPERNICUS/S2/20200201T053711_20200201T053708_T43NCE",
    "COPERNICUS/S2/20210307T053721_20210307T053716_T43NCE"
  ],
  false, false, REF1_OPTIONS);


s2Utils.s2_composite_display_and_export(
  [
    // Okay images
    "COPERNICUS/S2/20200307T053719_20200307T053714_T43NCE",
    "COPERNICUS/S2/20191228T053709_20191228T053711_T43NCE",
    "COPERNICUS/S2/20200630T053721_20200630T053721_T43NCE",
    "COPERNICUS/S2/20210501T053709_20210501T053712_T43NCE",
    "COPERNICUS/S2/20210620T051649_20210620T053110_T43NCE"
  ],
  false, false, REF2_OPTIONS);