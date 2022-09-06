var s2Utils = require('users/ericlawrey/World_AIMS_Marine-satellite-imagery:src/gee/s2Utils.js');

// Primary imagery
var REF1_OPTIONS = {
  colourGrades: ['DeepFalse','TrueColour','ReefTop','Shallow','Slope'],
  exportScale: [10, 10, 10, 10, 30],
  exportBasename: 'World_AIMS_Marine-satellite-imagery_R1',
  exportFolder: 'EarthEngine/World_AIMS_Marine-satellite-imagery/Arafura-Sea',
  
  applySunglintCorrection: true,
  applyBrightnessAdjustment: true
};


// ===============================================================
//
//                      Arafura-Sea
//
// ===============================================================

// North Arnhem land, Arafura Sea (Northern Territory, Australia)
// AUS00718 - Nautical chart
// The water is so turbid that none of the marine features are visible.
// There should be three small shoals at ~10 m and a larger raised area
// at 20 - 25 m based on the Nautical charts. None of these are visible
// in any of the images.
s2Utils.s2_composite_display_and_export(
  [
		"COPERNICUS/S2/20170909T012711_20170909T012714_T53LMH",
		"COPERNICUS/S2/20190914T012629_20190914T013005_T53LMH",
		"COPERNICUS/S2/20170825T012709_20170825T012711_T53LMH",
		"COPERNICUS/S2/20190318T012719_20190318T012714_T53LMH",
		"COPERNICUS/S2/20171210T011719_20171210T011713_T53LMH",
		"COPERNICUS/S2/20180723T011731_20180723T011726_T53LMH",
		"COPERNICUS/S2/20160723T011823_20160723T061426_T53LMH",
		"COPERNICUS/S2/20180708T011729_20180708T011723_T53LMH",
		"COPERNICUS/S2/20180802T011731_20180802T011725_T53LMH",
		"COPERNICUS/S2/20190708T011731_20190708T011730_T53LMH",
		"COPERNICUS/S2/20190723T011739_20190723T011733_T53LMH",
		"COPERNICUS/S2/20190906T011721_20190906T011724_T53LMH",
		"COPERNICUS/S2/20191205T011721_20191205T011723_T53LMH",
		"COPERNICUS/S2/20210508T011721_20210508T011724_T53LMH",
		"COPERNICUS/S2/20170827T011731_20170827T011725_T53LMH",
		"COPERNICUS/S2/20180529T011719_20180529T011721_T53LMH",
		"COPERNICUS/S2/20190618T011731_20190618T011729_T53LMH",
		"COPERNICUS/S2/20190703T011739_20190703T011901_T53LMH",
		"COPERNICUS/S2/20190802T011739_20190802T011813_T53LMH",
		"COPERNICUS/S2/20190807T011731_20190807T011729_T53LMH",
		"COPERNICUS/S2/20190812T011729_20190812T011732_T53LMH",
		"COPERNICUS/S2/20190827T011731_20190827T011726_T53LMH",
		"COPERNICUS/S2/20190901T011729_20190901T011855_T53LMH",
		"COPERNICUS/S2/20190911T011729_20190911T011726_T53LMH",
		"COPERNICUS/S2/20191130T011719_20191130T011720_T53LMH",
		"COPERNICUS/S2/20200722T011731_20200722T011730_T53LMH",
		"COPERNICUS/S2/20210418T011721_20210418T011719_T53LMH",
		"COPERNICUS/S2/20210513T011729_20210513T011724_T53LMH"
  ],
  true, false, REF1_OPTIONS);
  
  
// Groote Eylandt
// AUS00305 - Nautical charts. 
// This scene is split in two. 
// On the inshore areas the visibility of the final image just shows
// features that are only 1 m below LAT.
s2Utils.s2_composite_display_and_export(
  [
    // Right
    "COPERNICUS/S2/20160302T010734_20160302T075127_T53LPE",
    "COPERNICUS/S2/20161207T010722_20161207T010825_T53LPE",
    "COPERNICUS/S2/20170923T010721_20170923T010723_T53LPE",
    "COPERNICUS/S2/20181003T010719_20181003T011008_T53LPE",
    "COPERNICUS/S2/20181028T010721_20181028T010724_T53LPE",
    "COPERNICUS/S2/20190111T010729_20190111T010726_T53LPE",
    "COPERNICUS/S2/20190220T010729_20190220T010727_T53LPE",
    "COPERNICUS/S2/20190630T010739_20190630T010736_T53LPE",
    "COPERNICUS/S2/20190725T010731_20190725T010732_T53LPE",
    "COPERNICUS/S2/20190809T010739_20190809T010734_T53LPE",
    "COPERNICUS/S2/20190903T010731_20190903T010727_T53LPE",
    "COPERNICUS/S2/20190908T010729_20190908T010729_T53LPE",
    "COPERNICUS/S2/20190918T010729_20190918T010726_T53LPE",
    "COPERNICUS/S2/20191013T010731_20191013T011020_T53LPE",
    "COPERNICUS/S2/20191127T010729_20191127T010723_T53LPE",
    "COPERNICUS/S2/20191207T010719_20191207T010721_T53LPE",
    "COPERNICUS/S2/20200420T010731_20200420T010728_T53LPE",
    "COPERNICUS/S2/20201101T010729_20201101T010730_T53LPE",
    // Left
    //"COPERNICUS/S2/20160812T011732_20160812T061101_T53LPE",
    "COPERNICUS/S2/20160901T011722_20160901T061102_T53LPE",
    "COPERNICUS/S2/20180315T011721_20180315T011720_T53LPE",
    ///"COPERNICUS/S2/20180827T011719_20180827T011947_T53LPE",
    "COPERNICUS/S2/20180906T011719_20180906T011716_T53LPE",
    //"COPERNICUS/S2/20200712T011731_20200712T011729_T53LPE",
    "COPERNICUS/S2/20200826T011729_20200826T011728_T53LPE"
  ],
  false, false, REF1_OPTIONS);
  
  
  
// Tile not in Reef regions dataset
// Gulf of Carpentaria
// The DeepFeature contrast doesn't seem to work in the turbid waters
// of the Gulf
s2Utils.s2_composite_display_and_export(
  [
    "COPERNICUS/S2/20170707T005709_20170707T005708_T54LTH",
    "COPERNICUS/S2/20170925T005659_20170925T005654_T54LTH",
    //"COPERNICUS/S2/20171015T005659_20171015T005654_T54LTH",
    "COPERNICUS/S2/20180915T005701_20180915T005704_T54LTH",
    "COPERNICUS/S2/20181010T005709_20181010T005704_T54LTH",
    //"COPERNICUS/S2/20190212T005711_20190212T005705_T54LTH",
    //"COPERNICUS/S2/20190816T005719_20190816T010123_T54LTH",
    //"COPERNICUS/S2/20190905T005709_20190905T010119_T54LTH",
    "COPERNICUS/S2/20190920T005711_20190920T005708_T54LTH",
    "COPERNICUS/S2/20191005T005709_20191005T010117_T54LTH",
    "COPERNICUS/S2/20191010T005711_20191010T005711_T54LTH",
    "COPERNICUS/S2/20191114T005709_20191114T005707_T54LTH",
    //"COPERNICUS/S2/20200904T005711_20200904T005712_T54LTH",
    "COPERNICUS/S2/20200909T005709_20200909T005710_T54LTH"
    //"COPERNICUS/S2/20200924T005711_20200924T005713_T54LTH"
  ],
  false, false, REF1_OPTIONS);
  
// Australia, Gulf of Carpentaria, South East



// Speed run
// Cloud pixel percentage = 0
// 10 of X
imgIds = [
    
];
s2Utils.s2_composite_display_and_export(imgIds, false, false, REF1_OPTIONS);


// Speed run
// Cloud pixel percentage = 0
// 13 of83
imgIds = [
    "COPERNICUS/S2/20160716T012722_20160716T012759_T53LLG",
    "COPERNICUS/S2/20170731T012721_20170731T012717_T53LLG"
];
s2Utils.s2_composite_display_and_export(imgIds, false, false, REF1_OPTIONS);

// Speed run
// Cloud pixel percentage = 0
// 13 of 41
imgIds = [
    "COPERNICUS/S2/20170825T012709_20170825T012711_T53LKH",
    "COPERNICUS/S2/20180820T012709_20180820T012901_T53LKH",
    "COPERNICUS/S2/20190527T012729_20190527T012724_T53LKH",
    "COPERNICUS/S2/20190616T012729_20190616T012723_T53LKH"
];
s2Utils.s2_composite_display_and_export(imgIds, false, false, REF1_OPTIONS);

// Speed run
// Cloud pixel percentage = 0
// 10 of 85
imgIds = [
    "COPERNICUS/S2/20160619T013712_20160619T013859_T52LHP", //Left
    "COPERNICUS/S2/20160805T012720_20160805T062009_T52LHP", // Right
    "COPERNICUS/S2/20160825T012722_20160825T012717_T52LHP", // Right
    "COPERNICUS/S2/20170808T013709_20170808T013711_T52LHP" // Left
];
s2Utils.s2_composite_display_and_export(imgIds, false, false, REF1_OPTIONS);

// Speed run
// Cloud pixel percentage = 0
// 10 of 129
imgIds = [
    "COPERNICUS/S2/20170422T012721_20170422T012717_T52LHN", // Right
    "COPERNICUS/S2/20170505T013721_20170505T013715_T52LHN", // Left
    "COPERNICUS/S2/20170614T013711_20170614T013713_T52LHN", // Left
    "COPERNICUS/S2/20170621T012721_20170621T012715_T52LHN", // Right
    "COPERNICUS/S2/20170808T013709_20170808T013711_T52LHN" // Left
    
];
s2Utils.s2_composite_display_and_export(imgIds, false, false, REF1_OPTIONS);


// Speed run
// Cloud pixel percentage = 0
// 11 of 107
imgIds = [
    "COPERNICUS/S2/20160716T012722_20160716T012759_T52LHM",
    "COPERNICUS/S2/20170621T012721_20170621T012715_T52LHM"
];
s2Utils.s2_composite_display_and_export(imgIds, false, false, REF1_OPTIONS);

// Speed run
// Cloud pixel percentage = 0
// 10 of 23
imgIds = [
    "COPERNICUS/S2/20160111T013712_20160111T013707_T52LGQ",
    "COPERNICUS/S2/20170828T013709_20170828T013707_T52LGQ",
    "COPERNICUS/S2/20180927T013711_20180927T013708_T52LGQ"
];
s2Utils.s2_composite_display_and_export(imgIds, false, false, REF1_OPTIONS);

// Speed run
// Cloud pixel percentage = 0
// 16 of 41
imgIds = [
    "COPERNICUS/S2/20170808T013709_20170808T013711_T52LGP"
];
s2Utils.s2_composite_display_and_export(imgIds, false, false, REF1_OPTIONS);

// Speed run
// Cloud pixel percentage = 0
// 11 of 55
imgIds = [
    "COPERNICUS/S2/20170808T013709_20170808T013711_T52LGN",
    "COPERNICUS/S2/20170828T013709_20170828T013707_T52LGN",
    "COPERNICUS/S2/20180525T013709_20180525T013909_T52LGN"
];
s2Utils.s2_composite_display_and_export(imgIds, false, false, REF1_OPTIONS);

// Speed run
// Cloud pixel percentage = 0
// 10 of 175
imgIds = [
    "COPERNICUS/S2/20160729T013722_20160729T013908_T52LGM",
    "COPERNICUS/S2/20160520T014042_20160520T014043_T52LGM", // Bottom
    "COPERNICUS/S2/20160629T014038_20160629T062926_T52LGM", // Bottom
    "COPERNICUS/S2/20170505T013721_20170505T013715_T52LGM"
];
s2Utils.s2_composite_display_and_export(imgIds, false, false, REF1_OPTIONS);

// 8:11 am - 8:20 am
// Speed run
// Cloud pixel percentage = 0
// 12 of 60
imgIds = [
    "COPERNICUS/S2/20161207T010722_20161207T010825_T53LQE",
    "COPERNICUS/S2/20170814T010731_20170814T010729_T53LQE",
    "COPERNICUS/S2/20171107T010719_20171107T010713_T53LQE",  // sunglint on right side of image
    "COPERNICUS/S2/20180610T010731_20180610T010727_T53LQE"
];
s2Utils.s2_composite_display_and_export(imgIds, false, false, REF1_OPTIONS);

// 8:20 - 8:30 am
// Speed run
// Cloud pixel percentage = 0
// 10 of 224
imgIds = [
    "COPERNICUS/S2/20160727T005712_20160727T005806_T54KTG", // low tide
    "COPERNICUS/S2/20160816T005712_20160816T005809_T54KTG",
    "COPERNICUS/S2/20170925T005659_20170925T005654_T54KTG"
];
s2Utils.s2_composite_display_and_export(imgIds, false, false, REF1_OPTIONS);