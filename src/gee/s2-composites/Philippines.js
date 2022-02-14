var s2Utils = require('users/ericlawrey/World_AIMS_Marine-satellite-imagery:src/gee/s2Utils.js');

// Primary imagery
var REF1_OPTIONS = {
  colourGrades: ['DeepFalse','TrueColour','ReefTop','Shallow','Slope'],
  exportScale: [10, 10, 10, 10, 30],
  exportBasename: 'World_AIMS_Marine-satellite-imagery_R1',
  exportFolder: 'EarthEngine/World_AIMS_Marine-satellite-imagery/Philippines',
  
  applySunglintCorrection: true,
  applyBrightnessAdjustment: true
};


// 51PWN - Philippines, Visayan Sea, Bantayan Island
// This tile is heavily affected by sunglint. Many of these
// sunglint affected images show the shift to dark green caused
// by a limitation in the sunglint correction algorithm used.
// To get a reasonable number of images in this tile we would
// need to increase the threshold for sunglint correction and
// fix why sunglint affected areas are colour shifted.
// CLOUDY_PIXEL_PERCENTAGE = 5
// 38 of 38 Images
s2Utils.s2_composite_display_and_export(
  [
    // Good
    "COPERNICUS/S2/20180301T022319_20180301T022317_T51PWN",
    // OK
    "COPERNICUS/S2/20180306T022321_20180306T022322_T51PWN",
    "COPERNICUS/S2/20181211T022321_20181211T022317_T51PWN",
    "COPERNICUS/S2/20190306T022329_20190306T022323_T51PWN",
    "COPERNICUS/S2/20191231T022319_20191231T022353_T51PWN",
    "COPERNICUS/S2/20201210T022321_20201210T022322_T51PWN",
    "COPERNICUS/S2/20210305T022329_20210305T022325_T51PWN"
  ],
  false, false, REF1_OPTIONS);