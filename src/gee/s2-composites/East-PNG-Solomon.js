var s2Utils = require('users/ericlawrey/World_AIMS_Marine-satellite-imagery:src/gee/s2Utils.js');

// Primary imagery
var REF1_OPTIONS = {
  colourGrades: ['DeepFalse','TrueColour','ReefTop','Shallow','Slope'],
  exportScale: [10, 10, 10, 10, 30],
  exportBasename: 'World_AIMS_Marine-satellite-imagery_S2_R1',
  exportFolder: 'EarthEngine/World_AIMS_Marine-satellite-imagery/East-PNG-Solomon',
  
  applySunglintCorrection: true,
  applyBrightnessAdjustment: true
};

// Secondary imagery
var REF2_OPTIONS = {
  colourGrades: ['DeepFalse','TrueColour','Slope'],
  exportBasename: 'World_AIMS_Marine-satellite-imagery_S2_R2',
  exportFolder: 'EarthEngine/World_AIMS_Marine-satellite-imagery/East-PNG-Solomon',
  exportScale: [10, 10, 30],
  applySunglintCorrection: true,
  applyBrightnessAdjustment: true
};

//56LKR PNG, Trobriand Islands
// Searched 9 out of 9 images
// not enough images

s2Utils.s2_composite_display_and_export(
  [
    //Excellent images
    "COPERNICUS/S2/20161013T001722_20161013T001727_T56LKR",
    // good images
    "COPERNICUS/S2/20180928T001719_20180928T001715_T56LKR",
    // okay images
    "COPERNICUS/S2/20180610T001719_20180610T001719_T56LKR",
    "COPERNICUS/S2/20190705T001729_20190705T001730_T56LKR",
    "COPERNICUS/S2/20191207T001721_20191207T001719_T56LKR"
  ],
  false, false, REF1_OPTIONS);


s2Utils.s2_composite_display_and_export(
  [
    // Maybe
    "COPERNICUS/S2/20180809T001719_20180809T001716_T56LKR",
    "COPERNICUS/S2/20181008T001719_20181008T001717_T56LKR",
    "COPERNICUS/S2/20211027T001731_20211027T001726_T56LKR"
  ],
  false, false, REF2_OPTIONS);
  
  
//56LLN PNG
// Searched 28 out of 28 images
// not enough images

s2Utils.s2_composite_display_and_export(
  [
    //Good images
    "COPERNICUS/S2/20160506T001730_20160506T032255_T56LLN",
    "COPERNICUS/S2/20180416T001721_20180416T001722_T56LLN",
    "COPERNICUS/S2/20180809T001719_20180809T001716_T56LLN",
    "COPERNICUS/S2/20200912T001731_20200912T001725_T56LLN",
    "COPERNICUS/S2/20210803T001729_20210803T001723_T56LLN"
  ],
  false, false, REF1_OPTIONS);


s2Utils.s2_composite_display_and_export(
  [
    // okay
    "COPERNICUS/S2/20190705T001729_20190705T001730_T56LLN",
    // Maybe
    "COPERNICUS/S2/20180521T001719_20180521T001719_T56LLN"
  ],
  false, false, REF2_OPTIONS);