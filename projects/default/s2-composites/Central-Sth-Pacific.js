var s2Utils = require('users/ericlawrey/World_AIMS_Marine-satellite-imagery:src/01-gee/sentinel2/s2Utils.js');

// Primary imagery
var REF1_OPTIONS = {
  //colourGrades: ['DeepFalse','TrueColour','Depth5m', 'Depth10m', 'Shallow'],
  //exportScale: [10, 10, 10, 10, 10],
  
  // Preview
  colourGrades: ['TrueColour'],
  exportScale: [30],
  exportBasename: 'World_AIMS_Marine-sat-imagery_S2_R1',
  exportFolder: 'EarthEngine/World_AIMS_Marine-sat-imagery/Central-Sth-Pacific',
  
  applySunglintCorrection: true,
  applyBrightnessAdjustment: true
};

// Secondary imagery
var REF2_OPTIONS = {
  // Preview
  colourGrades: ['TrueColour'],
  exportScale: [30],
  exportBasename: 'World_AIMS_Marine-sat-imagery_S2_R2',
  exportFolder: 'EarthEngine/World_AIMS_Marine-sat-imagery/Central-Sth-Pacific',
  applySunglintCorrection: true,
  applyBrightnessAdjustment: true
};

// 06LWH French Polynesia, Palliser Islands, Kaukura Atoll
// Not enough images
// 18 of 18 images

s2Utils.s2_composite_display_and_export(
  [
    //okay images
    "COPERNICUS/S2/20200325T200849_20200325T200851_T06LWH",
    "COPERNICUS/S2/20200901T200859_20200901T200856_T06LWH",
    "COPERNICUS/S2/20210524T200851_20210524T200854_T06LWH",
    "COPERNICUS/S2/20210807T200859_20210807T200854_T06LWH",
    "COPERNICUS/S2/20210901T200851_20210901T200854_T06LWH",
    "COPERNICUS/S2/20210911T200851_20210911T200854_T06LWH"
  ],
  false, false, REF1_OPTIONS);


s2Utils.s2_composite_display_and_export(
  [
    // maybe images          
    "COPERNICUS/S2/20200315T200849_20200315T200851_T06LWH",
    "COPERNICUS/S2/20200728T200901_20200728T200859_T06LWH",
    "COPERNICUS/S2/20200807T200901_20200807T200859_T06LWH",
    "COPERNICUS/S2/20210603T200851_20210603T200854_T06LWH"
  ],
  false, false, REF2_OPTIONS);
  
  
  // 06LUJ French Polynesia, Tikehau, Mataiva Atoll
//searched 28 out of 28 images

s2Utils.s2_composite_display_and_export(
  [
    //Excellent
    "COPERNICUS/S2/20200921T200859_20200921T200855_T06LUJ",
    
    // Good
    "COPERNICUS/S2/20210628T200859_20210628T200854_T06LUJ",
    "COPERNICUS/S2/20211016T200859_20211016T200854_T06LUJ"
  ],
  true, false, REF1_OPTIONS);


s2Utils.s2_composite_display_and_export(
  [
    // Okay images          
    "COPERNICUS/S2/20200613T200859_20200613T200855_T06LUJ",
    "COPERNICUS/S2/20210507T201911_20210507T201905_T06LUJ",
    "COPERNICUS/S2/20210921T200901_20210921T200856_T06LUJ"
    //Maybe
//COPERNICUS/S2/20200728T200901_20200728T200859_T06LUJ
//COPERNICUS/S2/20201031T200859_20201031T200856_T06LUJ
//COPERNICUS/S2/20210708T200859_20210708T200855_T06LUJ
//COPERNICUS/S2/20210807T200859_20210807T200854_T06LUJ
//COPERNICUS/S2/20210911T200851_20210911T200854_T06LUJ
  ],
  false, false, REF2_OPTIONS);