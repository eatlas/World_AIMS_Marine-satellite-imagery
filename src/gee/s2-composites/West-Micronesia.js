var s2Utils = require('users/ericlawrey/World_AIMS_Marine-satellite-imagery:src/gee/s2Utils.js');

// Primary imagery
var REF1_OPTIONS = {
  colourGrades: ['DeepFalse','TrueColour','ReefTop','Shallow','Slope'],
  exportScale: [10, 10, 10, 10, 30],
  exportBasename: 'World_AIMS_Marine-satellite-imagery_S2_R1',
  exportFolder: 'EarthEngine/World_AIMS_Marine-satellite-imagery/West-Micronesia',
  
  applySunglintCorrection: true,
  applyBrightnessAdjustment: true
};

// Secondary imagery
var REF2_OPTIONS = {
  colourGrades: ['DeepFalse','TrueColour','Slope'],
  exportBasename: 'World_AIMS_Marine-satellite-imagery_S2_R2',
  exportFolder: 'EarthEngine/World_AIMS_Marine-satellite-imagery/West-Micronesia',
  exportScale: [10, 10, 30],
  applySunglintCorrection: true,
  applyBrightnessAdjustment: true
};

 // 53NMJ Palau
// Not enough images
// 

s2Utils.s2_composite_display_and_export(
  [
    //good images
    "COPERNICUS/S2/20211026T013459_20211026T013454_T53NMJ",
    //okay
    "COPERNICUS/S2/20200911T013459_20200911T013455_T53NMJ" // sunglint on the edge
  ],
  false, false, REF1_OPTIONS);


s2Utils.s2_composite_display_and_export(
  [
    // maybe images          
    "COPERNICUS/S2/20180420T013451_20180420T013454_T53NMJ",
    "COPERNICUS/S2/20180624T013449_20180624T013451_T53NMJ"
  ],
  false, false, REF2_OPTIONS);