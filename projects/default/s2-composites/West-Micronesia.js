var s2Utils = require('users/ericlawrey/World_AIMS_Marine-satellite-imagery:src/01-gee/sentinel2/s2Utils.js');

// Primary imagery
var REF1_OPTIONS = {
  // Preview
  colourGrades: ['TrueColour'],
  exportScale: [30],
  exportBasename: 'World_AIMS_Marine-sat-imagery_S2_R1',
  exportFolder: 'EarthEngine/World_AIMS_Marine-sat-imagery/West-Micronesia',
  
  applySunglintCorrection: true,
  applyBrightnessAdjustment: true
};

// Secondary imagery
var REF2_OPTIONS = {
  // Preview
  colourGrades: ['TrueColour'],
  exportScale: [30],
  exportBasename: 'World_AIMS_Marine-sat-imagery_S2_R2',
  exportFolder: 'EarthEngine/World_AIMS_Marine-sat-imagery/West-Micronesia',
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