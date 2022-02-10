var s2Utils = require('users/ericlawrey/World_AIMS_Marine-satellite-imagery:s2Utils.js');

// Primary imagery
var REF1_OPTIONS = {
  colourGrades: ['DeepFalse','TrueColour','ReefTop','Shallow','Slope'],
  exportScale: [10, 10, 10, 10, 30],
  exportBasename: 'World_AIMS_Marine-satellite-imagery_R1',
  exportFolder: 'EarthEngine/World_AIMS_Marine-satellite-imagery/Red-Sea-Gulf-Aden',
  
  applySunglintCorrection: true,
  applyBrightnessAdjustment: true
};

// 37PFT - Eritrea, Red Sea, Dahlak Marine National Park
// CLOUDY_PIXEL_PERCENTAGE = 0.1
// 30 of 106 Images
s2Utils.s2_composite_display_and_export(
  [
    // Ranking was primarily based on water clarity, as most images
    // had little cloud, but lots had turbidity issues.
    // Good
    "COPERNICUS/S2/20160115T074252_20160115T075210_T37PFT",
    "COPERNICUS/S2/20171110T074119_20171110T075158_T37PFT",
    "COPERNICUS/S2/20171130T074239_20171130T075310_T37PFT",
    "COPERNICUS/S2/20180208T074049_20180208T075259_T37PFT",

    // OK
    "COPERNICUS/S2/20161031T074042_20161031T112458_T37PFT",
    "COPERNICUS/S2/20170228T075211_20170228T075238_T37PFT",
    "COPERNICUS/S2/20171205T075211_20171205T075207_T37PFT",
    "COPERNICUS/S2/20171225T075211_20171225T075206_T37PFT"
  ],
  false, false, REF1_OPTIONS);