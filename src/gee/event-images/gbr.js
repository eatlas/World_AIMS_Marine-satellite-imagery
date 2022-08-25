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
// connectivity in Oct 2020. This aligns well with eReefs
// https://ereefs.aims.gov.au/ereefs-aims/gbr1/temp-wind-salt-current#year=2020;month=10;region=cairns-3
//COPERNICUS/S2/20201030T002709_20201030T002710_T55KDB 
//COPERNICUS/S2/20201030T002709_20201030T002710_T55KDA
//COPERNICUS/S2/20201030T002709_20201030T002710_T55KCB
//COPERNICUS/S2/20201030T002709_20201030T002710_T55KCA
//COPERNICUS/S2/20201030T002709_20201030T002710_T55KDV
//COPERNICUS/S2/20201030T002709_20201030T002710_T55KCV

// Excellent
COPERNICUS/S2/20181125T002701_20181125T002700_T55KDB // Southern plume off reef
COPERNICUS/S2/20190906T002709_20190906T002709_T55KDB // Excellent clear water
COPERNICUS/S2/20200213T002659_20200213T002702_T55KDB // eReefs - low plumes, but plumes off reefs

// Good
COPERNICUS/S2/20160219T003057_20160219T052320_T55KDB // Shows water flow off moore the reef to the right
COPERNICUS/S2/20180822T002659_20180822T002700_T55KDB // Low wind, moderate tides, no flood, water is still turbid though

// OK
COPERNICUS/S2/20160608T002712_20160608T002733_T55KDB // Shows turbidy flows (tidal) around the reefs
COPERNICUS/S2/20180514T002709_20180514T002706_T55KDB // Shows highly turbid water out to the continental edge. Tides are not that strong. Partial flood waters?
COPERNICUS/S2/20180728T002711_20180728T002708_T55KDB // Clear water, quite a few clouds
COPERNICUS/S2/20181115T002701_20181115T002702_T55KDB // Bit of sunglint. Low low.

// Maybe
COPERNICUS/S2/20180901T002659_20180901T002807_T55KDB // Low wind, low tide, EAC, shows plume coming off reef.

COPERNICUS/S2/20190109T002709_20190109T002706_T55KDB // eReefs comparison - Nice flood plume 

COPERNICUS/S2/20190218T002709_20190218T002707_T55KDB // eReefs - Broad plumes