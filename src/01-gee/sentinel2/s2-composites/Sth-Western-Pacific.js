var s2Utils = require('users/ericlawrey/World_AIMS_Marine-satellite-imagery:src/01-gee/sentinel2/s2Utils.js');

// Primary imagery
var REF1_OPTIONS = {
  colourGrades: ['DeepFalse','TrueColour','ReefTop','Shallow','Slope'],
  exportScale: [10, 10, 10, 10, 30],
  exportBasename: 'World_AIMS_Marine-satellite-imagery_S2_R1',
  exportFolder: 'EarthEngine/World_AIMS_Marine-satellite-imagery/Sth-Western-Pacific',
  
  applySunglintCorrection: true,
  applyBrightnessAdjustment: true
};

// Secondary imagery
var REF2_OPTIONS = {
  colourGrades: ['DeepFalse','TrueColour','Slope'],
  exportBasename: 'World_AIMS_Marine-satellite-imagery_S2_R2',
  exportFolder: 'EarthEngine/World_AIMS_Marine-satellite-imagery/Sth-Western-Pacific',
  exportScale: [10, 10, 30],
  applySunglintCorrection: true,
  applyBrightnessAdjustment: true
};

s2Utils.s2_composite_display_and_export(
  [
    // Excellent - 
    // 58KCC New Caledonia, Yande Island
                                            
    "COPERNICUS/S2/20170502T232121_20170502T232124_T58KCC",
    "COPERNICUS/S2/20170815T232119_20170815T232119_T58KCC",
    "COPERNICUS/S2/20180805T231851_20180805T231852_T58KCC"
  ],
  false, false, REF1_OPTIONS);


// Rachel bycroft image selection
//  58KFC New caledonia, Ouvea
// 
// 58 of 58 images

s2Utils.s2_composite_display_and_export(
  [
    // Excellent
    "COPERNICUS/S2/20170608T231141_20170608T231144_T58KFC",
    "COPERNICUS/S2/20180817T230859_20180817T231130_T58KFC",
    "COPERNICUS/S2/20210227T230911_20210227T230905_T58KFC"
  ],
  false, false, REF1_OPTIONS);


s2Utils.s2_composite_display_and_export(
  [
    // Good images          
    "COPERNICUS/S2/20180213T230901_20180213T230902_T58KFC",
    "COPERNICUS/S2/20190703T230919_20190703T230914_T58KFC",
    "COPERNICUS/S2/20200811T230911_20200811T231049_T58KFC",
    "COPERNICUS/S2/20210528T230911_20210528T230906_T58KFC"
  ],
  false, false, REF2_OPTIONS);
  
  
//  01KCV Fiji, Moce, Tubou
// 
// 38 of 38 images

s2Utils.s2_composite_display_and_export(
  [
    // Excellent
    "COPERNICUS/S2/20200808T220919_20200808T220922_T01KCV",
    // good
    "COPERNICUS/S2/20210405T220919_20210405T220916_T01KCV",
    "COPERNICUS/S2/20180908T220909_20180908T220909_T01KCV",
    "COPERNICUS/S2/20190715T220929_20190715T220927_T01KCV",
    "COPERNICUS/S2/20200510T220919_20200510T220917_T01KCV",
    "COPERNICUS/S2/20210917T220921_20210917T220921_T01KCV"
  ],
  false, false, REF1_OPTIONS);


s2Utils.s2_composite_display_and_export(
  [
    // okay images          
    "COPERNICUS/S2/20190605T220929_20190605T220926_T01KCV",
    "COPERNICUS/S2/20161112T220922_20161112T220917_T01KCV",
    "COPERNICUS/S2/20170730T220921_20170730T220920_T01KCV",
    "COPERNICUS/S2/20200515T220921_20200515T220924_T01KCV",
    "COPERNICUS/S2/20200121T220909_20200121T220912_T01KCV"
  ],
  false, false, REF2_OPTIONS);
  
// New Caledonia, Far North West
// CLOUDY_PIXEL_PERCENTAGE = 0.1
// 26 of 26 images
s2Utils.s2_composite_display_and_export(
  [
  // Excellent
    "COPERNICUS/S2/20190907T232849_20190907T233010_T58KBE",
  
  // Good
    "COPERNICUS/S2/20160410T232839_20160411T005026_T58KBE",
    "COPERNICUS/S2/20190719T232849_20190719T233017_T58KBE",
    "COPERNICUS/S2/20210723T232851_20210723T232845_T58KBE"
  ],
false, false, REF1_OPTIONS);

// OK
// COPERNICUS/S2/20170927T232829_20170927T232826_T58KBE
// COPERNICUS/S2/20180724T232839_20180724T232839_T58KBE


// New Caledonia, Far North East
// CLOUDY_PIXEL_PERCENTAGE = 0.1
// 10 of 10 images
s2Utils.s2_composite_display_and_export(
  [
  // Excellent
    "COPERNICUS/S2/20180716T231851_20180716T231854_T58KCE",
    "COPERNICUS/S2/20191128T231851_20191128T231852_T58KCE", // Sun glint on right 
    "COPERNICUS/S2/20200122T231849_20200122T231846_T58KCE",
  
  // Good
    "COPERNICUS/S2/20220111T231849_20220111T231848_T58KCE",
  
  // OK
    "COPERNICUS/S2/20170929T231851_20170929T231932_T58KCE"
  ],
false, false, REF1_OPTIONS);


// New Caledonia, North, Wala
// CLOUDY_PIXEL_PERCENTAGE = 0.1
// 10 of 10 images
s2Utils.s2_composite_display_and_export(
  [
    // Excellent
    "COPERNICUS/S2/20200715T231901_20200715T231857_T58KCD",
    // Good
    "COPERNICUS/S2/20161004T231852_20161004T231931_T58KCD",
  
    // OK
    "COPERNICUS/S2/20181029T231849_20181029T231850_T58KCD" // Dark water
  ],
false, false, REF1_OPTIONS);

  // COPERNICUS/S2/20180601T231849_20180601T231849_T58KCD // Shows strong turbid flow within the reef lagoon. Tidal?
  // COPERNICUS/S2/20190914T231849_20190914T232047_T58KCD // Strong turbid flow. Right to left.
  // COPERNICUS/S2/20200322T231849_20200322T232042_T58KCD // EXAMPLE: Excellent example of turbid flow
  
  