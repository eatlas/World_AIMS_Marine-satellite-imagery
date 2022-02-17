var s2Utils = require('users/ericlawrey/World_AIMS_Marine-satellite-imagery:src/gee/s2Utils.js');

var IMG_OPTIONS = {
  colourGrades: ['DeepFalse'],
  exportScale: [30],
  exportBasename: 'World_AIMS_Marine-satellite-imagery_S2_R1',
  exportFolder: 'EarthEngine/World_AIMS_Marine-satellite-imagery/Event-images',
  
  applySunglintCorrection: true,
  applyBrightnessAdjustment: true
};


// This image shows a large flood plumes along the coast that spreads
// offshore near cairns. This image covered from the burdekin to
// north of Cairns.
// This image represents a single day over a large area.
// This can't be exported as a single composite as it exceeds the
// GEE memory limit.
s2Utils.s2_composite_display_and_export(
  [
    "COPERNICUS/S2/20180330T002711_20180330T002706_T55LCC",
    "COPERNICUS/S2/20180330T002711_20180330T002706_T55LDC",
    "COPERNICUS/S2/20180330T002711_20180330T002706_T55LEC",
    "COPERNICUS/S2/20180330T002711_20180330T002706_T55KCB",
    "COPERNICUS/S2/20180330T002711_20180330T002706_T55KDB", // Turbid water on GBR side
    "COPERNICUS/S2/20180330T002711_20180330T002706_T55KEB",
    "COPERNICUS/S2/20180330T002711_20180330T002706_T55KCA",
    "COPERNICUS/S2/20180330T002711_20180330T002706_T55KDA",
    "COPERNICUS/S2/20180330T002711_20180330T002706_T55KEA",
    "COPERNICUS/S2/20180330T002711_20180330T002706_T55KCV",
    "COPERNICUS/S2/20180330T002711_20180330T002706_T55KDV",
    "COPERNICUS/S2/20180330T002711_20180330T002706_T55KEV",
    "COPERNICUS/S2/20180330T002711_20180330T002706_T55KCU",
    "COPERNICUS/S2/20180330T002711_20180330T002706_T55KDU",
    "COPERNICUS/S2/20180330T002711_20180330T002706_T55KEU"
  ],
  false, true, IMG_OPTIONS);
  
  
// This image shows dark water tracers from reefs near Cairns showing 
// connectivity in Oct 
COPERNICUS/S2/20201030T002709_20201030T002710_T55KDB 