var s2Utils = require('users/ericlawrey/World_AIMS_Marine-satellite-imagery:src/gee/s2Utils.js');

// Primary imagery
var REF1_OPTIONS = {
  colourGrades: ['DeepFalse','TrueColour','ReefTop','Shallow','Slope'],
  exportScale: [10, 10, 10, 10, 30],
  exportBasename: 'World_AIMS_Marine-satellite-imagery_R1',
  exportFolder: 'EarthEngine/World_AIMS_Marine-satellite-imagery/Sth-E-Asian-Arch',
  
  applySunglintCorrection: true,
  applyBrightnessAdjustment: true
};

// Gulf of Carpentaria (North West of the Western Cape York Marine Park)
s2Utils.s2_composite_display_and_export(
  [
		"COPERNICUS/S2/20181005T005701_20181005T005704_T54LVP",
		"COPERNICUS/S2/20160925T005702_20160925T054935_T54LVP",
		"COPERNICUS/S2/20190910T005711_20190910T005706_T54LVP",
		"COPERNICUS/S2/20200701T005709_20200701T005710_T54LVP",
		"COPERNICUS/S2/20200731T005709_20200731T005710_T54LVP",
		"COPERNICUS/S2/20180428T005711_20180428T005710_T54LVP",
		"COPERNICUS/S2/20180607T005711_20180607T005708_T54LVP",
		"COPERNICUS/S2/20180712T005709_20180712T005934_T54LVP"
	], 
  false, false, REF1_OPTIONS);
  
// PNG above western TS
s2Utils.s2_composite_display_and_export(
  [
    "COPERNICUS/S2/20181005T005701_20181005T005704_T54LWR",	//No cloud
    "COPERNICUS/S2/20190831T005711_20190831T005709_T54LWR",	//Low cloud
    "COPERNICUS/S2/20190910T005711_20190910T005706_T54LWR",	
    "COPERNICUS/S2/20191129T005711_20191129T005707_T54LWR",
    "COPERNICUS/S2/20200820T005709_20200820T005711_T54LWR",	//Low cloud but dark
    "COPERNICUS/S2/20201113T005711_20201113T005712_T54LWR"
  ], 
  false, false, REF1_OPTIONS);
  
// 51MWT - Indonesia, Melilis Island
// Very strong sunglint in this area and heavy clouds made
// getting good imagery very limited
// CLOUDY_PIXEL_PERCENTAGE = 5
// 33 of 33 Images
s2Utils.s2_composite_display_and_export(
  [
    // Good
    "COPERNICUS/S2/20200531T021351_20200531T021742_T51MWT",
    // OK
    "COPERNICUS/S2/20180726T021339_20180726T021609_T51MWT",
    // Maybe
    "COPERNICUS/S2/20180616T021349_20180616T021546_T51MWT",
    "COPERNICUS/S2/20190517T021351_20190517T021348_T51MWT",
    "COPERNICUS/S2/20190721T021359_20190721T021806_T51MWT",
    "COPERNICUS/S2/20200122T021341_20200122T021338_T51MWT"
  ],
  false, false, REF1_OPTIONS);  