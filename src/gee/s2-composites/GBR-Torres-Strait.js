var s2Utils = require('users/ericlawrey/World_AIMS_Marine-satellite-imagery:src/gee/s2Utils.js');

// Primary imagery
var REF1_OPTIONS = {
  //colourGrades: ['DeepFalse','TrueColour','ReefTop','Shallow','Slope'],
  //exportScale: [10, 10, 10, 10, 30],
  //colourGrades: ['ReefTop','Depth5m', 'Depth10m'],
  //exportScale: [10, 10, 10],
  colourGrades: ['DeepFalse'],
  exportScale: [10],
  exportBasename: 'World_AIMS_Marine-satellite-imagery_R1',
  exportFolder: 'EarthEngine/World_AIMS_Marine-satellite-imagery/GBR-Torres-Strait',
  
  applySunglintCorrection: true,
  applyBrightnessAdjustment: true
};

// Secondary imagery
var REF2_OPTIONS = {
  colourGrades: ['DeepFalse','TrueColour','Slope'],
  exportBasename: 'World_AIMS_Marine-satellite-imagery_R2',
  exportFolder: 'EarthEngine/World_AIMS_Marine-satellite-imagery/GBR-Torres-Strait',
  exportScale: [10, 10, 30],
  applySunglintCorrection: true,
  applyBrightnessAdjustment: true
};

// ===============================================================
//
//                      TORRES STRAIT
//
// ===============================================================



// PNG above central TS
s2Utils.s2_composite_display_and_export(
  [
    "COPERNICUS/S2/20181005T005701_20181005T005704_T54LXR", // Clear image left
    "COPERNICUS/S2/20181007T004659_20181007T004701_T54LXR",	// Clearish image right
    "COPERNICUS/S2/20200820T005709_20200820T005711_T54LXR", // Clearish left, but dark
    "COPERNICUS/S2/20201113T005711_20201113T005712_T54LXR", // scattered clouds left
    "COPERNICUS/S2/20151117T004742_20170102T064132_T54LXR",	// Right half
    "COPERNICUS/S2/20161015T005702_20161015T055125_T54LXR"	// Left half
    
  ], 
  false, false, REF1_OPTIONS);
  
// Fly river PNG. There are no cloud free images and so we use all the 
// available images with cloud cover < 4% to create a composite.
s2Utils.s2_composite_display_and_export(
  [
    "COPERNICUS/S2/20151117T004742_20170102T064132_T54LYR", 
    "COPERNICUS/S2/20180219T004659_20180219T004658_T54LYR",
    "COPERNICUS/S2/20181007T004659_20181007T004701_T54LYR",
    "COPERNICUS/S2/20191201T004659_20191201T004701_T54LYR",
    "COPERNICUS/S2/20191211T004659_20191211T004700_T54LYR",
    "COPERNICUS/S2/20191231T004659_20191231T004701_T54LYR",
    "COPERNICUS/S2/20200817T004709_20200817T004709_T54LYR",
    "COPERNICUS/S2/20210218T004711_20210218T004705_T54LYR",
    "COPERNICUS/S2/20210320T004711_20210320T004705_T54LYR"
  ], 
  false, false, REF1_OPTIONS);

// East of Fly river
s2Utils.s2_composite_display_and_export(
  [
    "COPERNICUS/S2/20161012T004702_20161012T035438_T54LZR",	// Sunglint
    "COPERNICUS/S2/20181007T004659_20181007T004701_T54LZR",	// Sunglint
    "COPERNICUS/S2/20190415T004709_20190415T004711_T54LZR",	// Some sunglint and clouds
    "COPERNICUS/S2/20191216T004701_20191216T004701_T54LZR"	// Low tide, Some sunglint and clouds
  ], 
  false, false, REF1_OPTIONS);
  
// Western Torres Strait, PNG border (Deliverance Island)
s2Utils.s2_composite_display_and_export(
  [
    "COPERNICUS/S2/20200820T005709_20200820T005711_T54LWQ"
  ], 
  false, false, REF1_OPTIONS);
  
// Bramble cay
s2Utils.s2_composite_display_and_export(
  [
    "COPERNICUS/S2/20181221T004701_20181221T004658_T54LZQ",	// Some sunglint
    "COPERNICUS/S2/20151117T004742_20170102T064132_T54LZQ",	// Sunglint
    "COPERNICUS/S2/20171121T004659_20171121T004654_T54LZQ",	// Sunglint
    "COPERNICUS/S2/20190115T004709_20190115T004705_T54LZQ",	// Scattered clouds
    "COPERNICUS/S2/20191211T004659_20191211T004700_T54LZQ",	// Scattered clouds
    "COPERNICUS/S2/20200120T004659_20200120T004659_T54LZQ",	// Sunglint
    "COPERNICUS/S2/20200229T004709_20200229T004703_T54LZQ",	// Scattered clouds
    "COPERNICUS/S2/20200419T004659_20200419T004701_T54LZQ"	// Some banding, scattered clouds
  ], 
  false, false, REF1_OPTIONS);

// Central Torres Strait, PNG border (Boigu Island, Saibai Island)
s2Utils.s2_composite_display_and_export(
  [
    //"COPERNICUS/S2/20180707T005711_20180707T005709_T54LXQ", //left: high tide moderate water clarity
    "COPERNICUS/S2/20200820T005709_20200820T005711_T54LXQ", //left: low tide, low clouds, low turbidity, low sunglint
    "COPERNICUS/S2/20151117T004742_20170102T064132_T54LXQ", //right
    "COPERNICUS/S2/20161012T004702_20161012T035438_T54LXQ",
    "COPERNICUS/S2/20191201T004659_20191201T004701_T54LXQ",  //moderate tide, scattered clouds, low turbidity, low sunglint
    "COPERNICUS/S2/20190510T004711_20190510T004710_T54LXQ",  //scattered clouds, moderate water clarity
    "COPERNICUS/S2/20180917T004659_20180917T004657_T54LXQ"   //scattered clouds, moderate water clarity"
  ], 
  false, false, REF1_OPTIONS);

// Eastern Torres Strait, PNG border (Warrior Reef, Daru)
s2Utils.s2_composite_display_and_export(
  [
    "COPERNICUS/S2/20151117T004742_20151117T004904_T54LYQ", // clear water
   // "COPERNICUS/S2/20181201T004701_20181201T004657_T54LYQ", // more turbid
  //  "COPERNICUS/S2/20190110T004701_20190110T004701_T54LYQ",
  //  "COPERNICUS/S2/20190115T004709_20190115T004705_T54LYQ"
  ], 
  true, false, REF1_OPTIONS);

// South central TS
s2Utils.s2_composite_display_and_export(
  [
    "COPERNICUS/S2/20180920T005659_20180920T005700_T54LXP",
		"COPERNICUS/S2/20180930T005659_20180930T005702_T54LXP",
		"COPERNICUS/S2/20191015T005709_20191015T005709_T54LXP",
		"COPERNICUS/S2/20200909T005709_20200909T005710_T54LXP",
		"COPERNICUS/S2/20190823T004709_20190823T004711_T54LXP",
		"COPERNICUS/S2/20180729T004709_20180729T004703_T54LXP",
		"COPERNICUS/S2/20161012T004702_20161012T035438_T54LXP",
		"COPERNICUS/S2/20180917T004659_20180917T004657_T54LXP",
		"COPERNICUS/S2/20180927T004659_20180927T004700_T54LXP",
		"COPERNICUS/S2/20190907T004711_20190907T004705_T54LXP",
		"COPERNICUS/S2/20181022T004701_20181022T004703_T54LXP",
		"COPERNICUS/S2/20190510T004711_20190510T004710_T54LXP" 
  ], 
  false, false, REF1_OPTIONS);
  
// Central Cape York
s2Utils.s2_composite_display_and_export(
  [
    "COPERNICUS/S2/20180729T004709_20180729T004703_T54LXN",
		"COPERNICUS/S2/20180828T004659_20180828T004657_T54LXN",
		"COPERNICUS/S2/20190704T004719_20190704T004715_T54LXN",
		"COPERNICUS/S2/20190813T004709_20190813T004712_T54LXN",
		"COPERNICUS/S2/20191017T004711_20191017T004709_T54LXN",
		"COPERNICUS/S2/20151117T004742_20170102T064132_T54LXN",
		"COPERNICUS/S2/20161012T004702_20161012T053917_T54LXN",
		"COPERNICUS/S2/20180724T004711_20180724T004707_T54LXN",
		"COPERNICUS/S2/20180917T004659_20180917T004657_T54LXN",
		"COPERNICUS/S2/20181007T004659_20181007T004701_T54LXN",
		"COPERNICUS/S2/20181022T004701_20181022T004703_T54LXN",
		"COPERNICUS/S2/20190828T004711_20190828T004707_T54LXN",
		"COPERNICUS/S2/20190907T004711_20190907T004705_T54LXN",
		"COPERNICUS/S2/20200404T004701_20200404T004702_T54LXN",
		"COPERNICUS/S2/20200822T004711_20200822T004712_T54LXN"
	], 
  false, false, REF1_OPTIONS, REF1_OPTIONS);	
  
  
// Western Torres Strait, Carpentaria Shoal, Cook Reef (Queensland, Australia)
// Aus 700 Nautical chart
s2Utils.s2_composite_display_and_export(
  [ 
    //"COPERNICUS/S2/20180707T005711_20180707T005709_T54LWP", //3
		"COPERNICUS/S2/20180712T005709_20180712T005934_T54LWP", //2
		//"COPERNICUS/S2/20180811T005709_20180811T005956_T54LWP", //3
		//This is the clearest image of the water, however the image
		// has strong sunglint requiring a threshold of 800 instead of the
		// usual of 450 to remove it. This image is still the best by far.
		"COPERNICUS/S2/20190217T005709_20190217T005707_T54LWP", //1
		"COPERNICUS/S2/20200820T005709_20200820T005711_T54LWP"  //2
	],
  false, false, REF1_OPTIONS);
  
// Western Cape York Marine Park (Queensland, Australia)
// One reef in bottom left of image (Kerr Reef). Seagrass near coast.
// Reef is visible in nautical chart.
// No new marine features. Lots of pale turbidity trails. There is
// a strong jet exiting Vrilya point to the West North West, presumably
// a circular current in the gulf with a current coming over the tip
// of Cape York. This current drags along a lot of organic material and
// is often green or opaque water. There is seagrass meadows along the 
// coast visible to approximately 7 m (based on nautical charts).
// Aus301 - Nautical chart
s2Utils.s2_composite_display_and_export(
  [ 
    "COPERNICUS/S2/20190508T005719_20190508T005716_T54LWN", //1	// Can see reef in bottom right	
		"COPERNICUS/S2/20190910T005711_20190910T005706_T54LWN", //2
		"COPERNICUS/S2/20200701T005709_20200701T005710_T54LWN", //3
		"COPERNICUS/S2/20200820T005709_20200820T005711_T54LWN", //2
		"COPERNICUS/S2/20160925T005702_20160925T054935_T54LWN", //3 // Blue but can't see reef
		"COPERNICUS/S2/20190915T005709_20190915T005708_T54LWN", //3
		"COPERNICUS/S2/20200601T005709_20200601T005709_T54LWN", //3
		"COPERNICUS/S2/20170811T005711_20170811T005709_T54LWN", //3
		//"COPERNICUS/S2/20180712T005709_20180712T005934_T54LWN", //5
		//"COPERNICUS/S2/20180801T005709_20180801T005704_T54LWN", //4
		//"COPERNICUS/S2/20180811T005709_20180811T005956_T54LWN", //4
		//"COPERNICUS/S2/20180905T005711_20180905T005705_T54LWN", //5
		//"COPERNICUS/S2/20180920T005659_20180920T005700_T54LWN", //5
		//"COPERNICUS/S2/20180925T005701_20180925T005703_T54LWN", //4
		//"COPERNICUS/S2/20190717T005719_20190717T005716_T54LWN", //5
		//"COPERNICUS/S2/20190831T005711_20190831T005709_T54LWN",	//4 Reef visible in bottom right and seagrass. Scatter clouds though.
		//"COPERNICUS/S2/20200621T005709_20200621T005710_T54LWN", //5
		// Large gravity waves in bottom right corner of image
		//"COPERNICUS/S2/20190217T005709_20190217T005707_T54LWN"
	],
  false, false, REF1_OPTIONS);
  
// ===============================================================
//
//            GREAT BARRIER REEF MARINE PARK
//
// ===============================================================
  
  
  
// Australia, GBR, Great Detached reef, Wishbone reef
// A lot of scenes have strong sunglint
// CLOUDY_PIXEL_PERCENTAGE = 1
// 42 of 58 images
s2Utils.s2_composite_display_and_export(
  [
    // Good - right
    "COPERNICUS/S2/20180924T003659_20180924T003658_T54LZM",
    "COPERNICUS/S2/20190825T003711_20190825T003706_T54LZM",
    // OK - Right
    "COPERNICUS/S2/20171123T003701_20171123T003700_T54LZM",
    
    // OK - left
    "COPERNICUS/S2/20190704T004719_20190704T004715_T54LZM",
    "COPERNICUS/S2/20190907T004711_20190907T004705_T54LZM",  // Strong green banding
    "COPERNICUS/S2/20190917T004711_20190917T004705_T54LZM",  // Strong green banding
    
    // Maybe - Left
    "COPERNICUS/S2/20160614T004712_20160614T005002_T54LZM",
    "COPERNICUS/S2/20160823T004902_20160823T004856_T54LZM",
    "COPERNICUS/S2/20180724T004711_20180724T004707_T54LZM",
    "COPERNICUS/S2/20180729T004709_20180729T004703_T54LZM",
    "COPERNICUS/S2/20200419T004659_20200419T004701_T54LZM"
  ],
false, false, REF1_OPTIONS);

// COPERNICUS/S2/20181126T004659_20181126T004702_T54LZM // Example: Sunglint showing tidal flows through reefs.
// COPERNICUS/S2/20190907T004711_20190907T004705_T54LZM // Example: Strong green banding in image


// Australia, GBR, Raine Island
// A lot of scenes have strong sunglint
// CLOUDY_PIXEL_PERCENTAGE = 1
// 29 of 29 images
s2Utils.s2_composite_display_and_export(
  [
    // Good
    "COPERNICUS/S2/20180614T004711_20180614T004705_T54LZN",
    
    // OK
    "COPERNICUS/S2/20190510T004711_20190510T004710_T54LZN",
    "COPERNICUS/S2/20190619T004711_20190619T004710_T54LZN",
    "COPERNICUS/S2/20190704T004719_20190704T004715_T54LZN",
    "COPERNICUS/S2/20190724T004719_20190724T004714_T54LZN",
    "COPERNICUS/S2/20210608T004711_20210608T004707_T54LZN",
    
    // Maybe - Left
    "COPERNICUS/S2/20160823T004902_20160823T004856_T54LZN",
    "COPERNICUS/S2/20180724T004711_20180724T004707_T54LZN",
    "COPERNICUS/S2/20190828T004711_20190828T004707_T54LZN"
  ],
false, false, REF1_OPTIONS);

// Australia, GBR, Cape Melville  
s2Utils.s2_composite_display_and_export(
  [  
    "COPERNICUS/S2/20180726T003659_20180726T003702_T55LBE", //1
		"COPERNICUS/S2/20181004T003659_20181004T003700_T55LBE", //2
		//"COPERNICUS/S2/20181203T003659_20181203T003700_T55LBE", //3
		"COPERNICUS/S2/20200819T003711_20200819T003710_T55LBE", //1
		//"COPERNICUS/S2/20190616T003711_20190616T003708_T55LBE", //4
		"COPERNICUS/S2/20190909T003709_20190909T003706_T55LBE", //2
		//"COPERNICUS/S2/20191208T003659_20191208T003658_T55LBE" //3
	],
  false, false, REF1_OPTIONS);

// Australia, GBR, Cockburn Reef, Nomad Reef, Gallon Reef
// CLOUDY_PIXEL_PERCENTAGE = 10
// 9 of 9 images
s2Utils.s2_composite_display_and_export(
  [
    // Good
    "COPERNICUS/S2/20190907T004711_20190907T004705_T54LYM",
    "COPERNICUS/S2/20191012T004709_20191012T004707_T54LYM",  // Contains some sunglint

    // OK
    "COPERNICUS/S2/20180729T004709_20180729T004703_T54LYM"
  ],
false, false, REF1_OPTIONS);

// Australia, Cairns, GBR, Green Island, Arlington, Hopley comparison
// For comparision with Hopley D, et. al., (2007), 
// The Geomorphology of the Great Barrier Reef
// CLOUDY_PIXEL_PERCENTAGE = 0.1
// 17 of 17 images
                      
s2Utils.s2_composite_display_and_export(
  [
    // Excellent
    "COPERNICUS/S2/20161115T002712_20161115T002822_T55KCB", // Right
    "COPERNICUS/S2/20190914T003701_20190914T003703_T55KCB", // Left
    "COPERNICUS/S2/20200730T003711_20200730T003710_T55KCB", // Left

    // Good with good water clarity                      
    "COPERNICUS/S2/20180827T002711_20180827T002706_T55KCB", // Right
    "COPERNICUS/S2/20200715T003709_20200715T003706_T55KCB" // Left
  ],
  false, false, REF1_OPTIONS);
//Excellent but lower water clarity
//COPERNICUS/S2/20170718T003029_20170718T003032_T55KCB // Right
//COPERNICUS/S2/20200819T003711_20200819T003710_T55KCB // Left

//Good but lower water clarity
//COPERNICUS/S2/20180514T002709_20180514T002706_T55KCB // Right
//COPERNICUS/S2/20191110T002711_20191110T002710_T55KCB // Right
//COPERNICUS/S2/20200526T003709_20200526T003705_T55KCB // Left

 //55KGU Australia, GBR, Hardy Reef, Block Reef
// Searched 89 out of 89 images

s2Utils.s2_composite_display_and_export(
  [
    //Excellent
    "COPERNICUS/S2/20170814T002109_20170814T002103_T55KGU",
    "COPERNICUS/S2/20190809T002101_20190809T002058_T55KGU",
    "COPERNICUS/S2/20200624T002101_20200624T002100_T55KGU",
    "COPERNICUS/S2/20200714T002101_20200714T002059_T55KGU",
    "COPERNICUS/S2/20200813T002101_20200813T002100_T55KGU"
  ],
  false, false, REF1_OPTIONS);
  

s2Utils.s2_composite_display_and_export(
  [
    // Good
    "COPERNICUS/S2/20160625T002106_20160625T014132_T55KGU",
    "COPERNICUS/S2/20170804T002109_20170804T002104_T55KGU",
    "COPERNICUS/S2/20180903T002051_20180903T002052_T55KGU",
    "COPERNICUS/S2/20190511T002101_20190511T002058_T55KGU",
    "COPERNICUS/S2/20190725T002109_20190725T002103_T55KGU",
    "COPERNICUS/S2/20190918T002051_20190918T002054_T55KGU",
    "COPERNICUS/S2/20210729T002101_20210729T002058_T55KGU"
  ],
  false, false, REF2_OPTIONS);
  
  
   //55LCD Australia, GBR, Lizard Island, Ribbon No 10 reef
// Searched 29 out of 29 images
// not enough images

s2Utils.s2_composite_display_and_export(
  [
    //Excellent
    "COPERNICUS/S2/20200819T003711_20200819T003710_T55LCD",
    // good
    "COPERNICUS/S2/20190810T003709_20190810T003711_T55LCD",
    // Okay
    "COPERNICUS/S2/20160830T003952_20160830T003955_T55LCD",
    "COPERNICUS/S2/20180810T003701_20180810T003704_T55LCD"
  ],
  false, false, REF1_OPTIONS);


s2Utils.s2_composite_display_and_export(
  [
    // Okay
    "COPERNICUS/S2/20190731T003709_20190731T003712_T55LCD",
    "COPERNICUS/S2/20190914T003701_20190914T003703_T55LCD",
    //maybe
    "COPERNICUS/S2/20190211T003709_20190211T003704_T55LCD",
    "COPERNICUS/S2/20190221T003709_20190221T003704_T55LCD"
  ],
  false, false, REF2_OPTIONS);
  
//55KFU Australia, GBR, Dingo Reefs, Gould Reefs
// Searched 86 out of 86 images

s2Utils.s2_composite_display_and_export(
  [
    //Excellent
    "COPERNICUS/S2/20180730T002049_20180730T002051_T55KFU",  
    "COPERNICUS/S2/20180829T002049_20180829T002045_T55KFU",
    "COPERNICUS/S2/20190908T002051_20190908T002053_T55KFU",
    "COPERNICUS/S2/20200729T002059_20200729T002057_T55KFU",
    "COPERNICUS/S2/20201101T002101_20201101T002059_T55KFU",
    "COPERNICUS/S2/20210729T002101_20210729T002058_T55KFU",
    "COPERNICUS/S2/20210922T002049_20210922T002052_T55KFU"
  ],
  false, false, REF1_OPTIONS);


s2Utils.s2_composite_display_and_export(
  [
    // Good
    "COPERNICUS/S2/20170804T002109_20170804T002104_T55KFU",
    "COPERNICUS/S2/20180605T002101_20180605T002055_T55KFU",
    "COPERNICUS/S2/20180620T002059_20180620T002053_T55KFU",
    "COPERNICUS/S2/20180705T002101_20180705T002055_T55KFU",
    "COPERNICUS/S2/20180819T002049_20180819T002047_T55KFU",
    "COPERNICUS/S2/20180824T002051_20180824T002053_T55KFU",
    "COPERNICUS/S2/20190809T002101_20190809T002058_T55KFU",
    "COPERNICUS/S2/20211012T002059_20211012T002055_T55KFU"
  ],
  false, false, REF2_OPTIONS);
  
  
  
//56KKC Australia, GBR, Cockatoo Reef, Hopley comparison
// Searched 71 out of 71 images

s2Utils.s2_composite_display_and_export(
  [
    //Excellent
    "COPERNICUS/S2/20180212T001111_20180212T001105_T56KKC",
    "COPERNICUS/S2/20181015T001109_20181015T001105_T56KKC",
    "COPERNICUS/S2/20190811T001119_20190811T001116_T56KKC",
    "COPERNICUS/S2/20190905T001111_20190905T001109_T56KKC",
    "COPERNICUS/S2/20190910T001109_20190910T001110_T56KKC",
    "COPERNICUS/S2/20191109T001109_20191109T001108_T56KKC",
    "COPERNICUS/S2/20200716T001109_20200716T001110_T56KKC",
    "COPERNICUS/S2/20200726T001109_20200726T001111_T56KKC",
    "COPERNICUS/S2/20200810T001121_20200810T001115_T56KKC",
    "COPERNICUS/S2/20200815T001109_20200815T001112_T56KKC",
    "COPERNICUS/S2/20210711T001109_20210711T001111_T56KKC",
    "COPERNICUS/S2/20210721T001109_20210721T001111_T56KKC",
    "COPERNICUS/S2/20210726T001111_20210726T001112_T56KKC"
  ],
  false, false, REF1_OPTIONS);


s2Utils.s2_composite_display_and_export(
  [
    // Good
    "COPERNICUS/S2/20170826T001101_20170826T001104_T56KKC",
    "COPERNICUS/S2/20170905T000731_20170905T000731_T56KKC",
    "COPERNICUS/S2/20170925T001111_20170925T001105_T56KKC",
    "COPERNICUS/S2/20180821T001111_20180821T001108_T56KKC",
    "COPERNICUS/S2/20180831T001111_20180831T001107_T56KKC",
    "COPERNICUS/S2/20190212T001109_20190212T001109_T56KKC",
    "COPERNICUS/S2/20191015T001111_20191015T001112_T56KKC",
    "COPERNICUS/S2/20200601T001121_20200601T001115_T56KKC",
    "COPERNICUS/S2/20201009T001121_20201009T001115_T56KKC",
    "COPERNICUS/S2/20210507T001111_20210507T001108_T56KKC",
    "COPERNICUS/S2/20211029T001109_20211029T001110_T56KKC"
  ],
  false, false, REF2_OPTIONS);
  
  
 //55KFU Australia, GBR, Dingo Reefs, Gould Reefs
// Searched 86 out of 86 images

s2Utils.s2_composite_display_and_export(
  [
    //Excellent
    "COPERNICUS/S2/20180730T002049_20180730T002051_T55KFU",  
    "COPERNICUS/S2/20180829T002049_20180829T002045_T55KFU",
    "COPERNICUS/S2/20190908T002051_20190908T002053_T55KFU",
    "COPERNICUS/S2/20200729T002059_20200729T002057_T55KFU",
    "COPERNICUS/S2/20201101T002101_20201101T002059_T55KFU",
    "COPERNICUS/S2/20210729T002101_20210729T002058_T55KFU",
    "COPERNICUS/S2/20210922T002049_20210922T002052_T55KFU"
  ],
  false, false, REF1_OPTIONS);


s2Utils.s2_composite_display_and_export(
  [
    // Good
    "COPERNICUS/S2/20170804T002109_20170804T002104_T55KFU",
    "COPERNICUS/S2/20180605T002101_20180605T002055_T55KFU",
    "COPERNICUS/S2/20180620T002059_20180620T002053_T55KFU",
    "COPERNICUS/S2/20180705T002101_20180705T002055_T55KFU",
    "COPERNICUS/S2/20180819T002049_20180819T002047_T55KFU",
    "COPERNICUS/S2/20180824T002051_20180824T002053_T55KFU",
    "COPERNICUS/S2/20190809T002101_20190809T002058_T55KFU",
    "COPERNICUS/S2/20211012T002059_20211012T002055_T55KFU"
  ],
  false, false, REF2_OPTIONS);
  
  
// Townsville and Magnetic Island
// Aus 827 Nautical chart
// Paluma Shoals near Saunders Beach appears to be 7 shoals, instead of one
// with some quite close to the coastline.
s2Utils.s2_composite_display_and_export(
 [                                                         // Paluma Shoals scores
    "COPERNICUS/S2/20160827T002712_20160827T051759_T55KDU", //1 // Low tide
		"COPERNICUS/S2/20190812T002711_20190812T002711_T55KDU", //2
		"COPERNICUS/S2/20200528T002711_20200528T002714_T55KDU", //2
		"COPERNICUS/S2/20200727T002711_20200727T002713_T55KDU", //1 Low tide
		"COPERNICUS/S2/20200816T002711_20200816T002713_T55KDU", //2
		"COPERNICUS/S2/20160608T003145_20160608T051758_T55KDU", //3
		"COPERNICUS/S2/20160628T003143_20160628T051719_T55KDU", //2 Low tide
		//"COPERNICUS/S2/20160728T003042_20160728T003036_T55KDU", //4
		"COPERNICUS/S2/20160926T003032_20160926T015230_T55KDU", //3
		//"COPERNICUS/S2/20170812T003031_20170812T003153_T55KDU", //6 
		//"COPERNICUS/S2/20170906T002659_20170906T002700_T55KDU", //5 
		//"COPERNICUS/S2/20180817T002711_20180817T002707_T55KDU", //4 
		//"COPERNICUS/S2/20180901T002659_20180901T002807_T55KDU", //4 
		//"COPERNICUS/S2/20190718T002719_20190718T003157_T55KDU", //5 
		//"COPERNICUS/S2/20200503T002709_20200503T002704_T55KDU", //5  // Fishing trawler tracks north of Magnetic Island
		"COPERNICUS/S2/20200717T002711_20200717T002712_T55KDU", //3 
		"COPERNICUS/S2/20200811T002709_20200811T002711_T55KDU" //3 
		//"COPERNICUS/S2/20210513T002711_20210513T002707_T55KDU"  //4
	],
  false, false, REF1_OPTIONS);
  
// Northern Cap bunkers
s2Utils.s2_composite_display_and_export(
  [
    "COPERNICUS/S2/20180602T001111_20180602T001110_T56KLV",
    "COPERNICUS/S2/20180821T001111_20180821T001108_T56KLV",
    "COPERNICUS/S2/20190717T001111_20190717T001114_T56KLV",
    "COPERNICUS/S2/20190821T001119_20190821T001114_T56KLV",
    "COPERNICUS/S2/20200716T001109_20200716T001110_T56KLV"
  ],
  false, false, REF1_OPTIONS);
  
// Princess Charolette Bay West
s2Utils.s2_composite_display_and_export(
  [
		// 54LYK
		"COPERNICUS/S2/20160604T004902_20160604T004859_T54LYK",
		"COPERNICUS/S2/20180425T004711_20180425T004708_T54LYK",
		"COPERNICUS/S2/20190510T004711_20190510T004710_T54LYK"
  ],
  false, false, REF1_OPTIONS);
  
// Princess Charolette Bay East
s2Utils.s2_composite_display_and_export(
  [
    // Right 54LZK
    "COPERNICUS/S2/20170909T003949_20170909T004019_T54LZK",
		"COPERNICUS/S2/20180726T003659_20180726T003702_T54LZK",
		"COPERNICUS/S2/20180805T003659_20180805T003700_T54LZK",
		"COPERNICUS/S2/20190616T003711_20190616T003708_T54LZK",
		"COPERNICUS/S2/20190721T003719_20190721T003713_T54LZK",
		"COPERNICUS/S2/20200819T003711_20200819T003710_T54LZK",
		// Left 54LZK
		"COPERNICUS/S2/20170813T004849_20170813T004852_T54LZK",
		"COPERNICUS/S2/20180515T004711_20180515T004708_T54LZK",
		"COPERNICUS/S2/20190510T004711_20190510T004710_T54LZK",
		"COPERNICUS/S2/20190624T004719_20190624T004714_T54LZK",
		"COPERNICUS/S2/20190719T004711_20190719T004711_T54LZK",
		"COPERNICUS/S2/20200817T004709_20200817T004709_T54LZK",
		"COPERNICUS/S2/20200822T004711_20200822T004712_T54LZK",
		"COPERNICUS/S2/20200911T004711_20200911T004710_T54LZK",
  ],
  false, false, REF1_OPTIONS);
  
// 55KEV - Australia, GBR, Davies, Grub, Chicken
// CLOUDY_PIXEL_PERCENTAGE = 0.1
// 27 of 27 Images
s2Utils.s2_composite_display_and_export(
  [
    // Excellent (Water clarity index 1 - low visibility, 5 - excellent)
    //"COPERNICUS/S2/20160708T003035_20160708T015011_T55KEV", // (2) - Removed due to lower WQ
    "COPERNICUS/S2/20190812T002711_20190812T002711_T55KEV", // (4)
    "COPERNICUS/S2/20190822T002711_20190822T002710_T55KEV", // (4)
    "COPERNICUS/S2/20190906T002709_20190906T002709_T55KEV", // (5) Can see the midshelf sea floor. Great view of weird ring contours
    "COPERNICUS/S2/20200727T002711_20200727T002713_T55KEV", // (3)
    "COPERNICUS/S2/20200816T002711_20200816T002713_T55KEV", // (3)
    //"COPERNICUS/S2/20200821T002709_20200821T002711_T55KEV", // (1) Low Water Quality, bit excellent view of plumes around reefs.
    "COPERNICUS/S2/20210915T002709_20210915T002703_T55KEV"  // (3)
  ],
  false, false, REF1_OPTIONS);
// Good
//COPERNICUS/S2/20180802T002709_20180802T002704_T55KEV
//COPERNICUS/S2/20180827T002711_20180827T002706_T55KEV
//COPERNICUS/S2/20200811T002709_20200811T002711_T55KEV


// 56KMU - Australia, GBR, Lady Musgrave
// CLOUDY_PIXEL_PERCENTAGE = 0.1
// 30 of 68 Images
// (X) is an estimate of water clarity 1 - low, 5 - super clear
s2Utils.s2_composite_display_and_export(
  [
    // Excellent 
    "COPERNICUS/S2/20160828T000222_20160828T000219_T56KMU", // (4) Can see the sea floor
    "COPERNICUS/S2/20160530T000222_20160530T000223_T56KMU",
    "COPERNICUS/S2/20160709T000222_20160709T000319_T56KMU",
    "COPERNICUS/S2/20161017T000212_20161017T000213_T56KMU", // (3)
    "COPERNICUS/S2/20170525T000221_20170525T000220_T56KMU", // (2)
    "COPERNICUS/S2/20170729T000219_20170729T000217_T56KMU", // (2)
    "COPERNICUS/S2/20170808T000219_20170808T000216_T56KMU", // (3)
    "COPERNICUS/S2/20180709T000241_20180709T000241_T56KMU", // (2)
    "COPERNICUS/S2/20180714T000239_20180714T000238_T56KMU", // (2)
    "COPERNICUS/S2/20180719T000241_20180719T000241_T56KMU", // (2)
    "COPERNICUS/S2/20180808T000241_20180808T000240_T56KMU", // (4)
  ],
  false, false, REF1_OPTIONS);
// Good
//COPERNICUS/S2/20160629T000219_20160629T044543_T56KMU
//COPERNICUS/S2/20161027T000212_20161027T000214_T56KMU", // (3)

// OK
//COPERNICUS/S2/20161007T000212_20161007T000213_T56KMU" // Very clear patch in the middle of the image.

// 56KLB - Australia, GBR, Swains, Heralds Reef
// CLOUDY_PIXEL_PERCENTAGE = 0.1
// 33 of 38 Images
s2Utils.s2_composite_display_and_export(
  [
    // Excellent
    "COPERNICUS/S2/20190811T001119_20190811T001116_T56KLB",
    "COPERNICUS/S2/20190905T001111_20190905T001109_T56KLB",
    "COPERNICUS/S2/20200716T001109_20200716T001110_T56KLB",
    "COPERNICUS/S2/20200726T001109_20200726T001111_T56KLB",
    "COPERNICUS/S2/20200815T001109_20200815T001112_T56KLB",
    "COPERNICUS/S2/20210731T001109_20210731T001110_T56KLB"
  ],
  false, false, REF1_OPTIONS);
// Good
// COPERNICUS/S2/20180707T001109_20180707T001212_T56KLB
// COPERNICUS/S2/20200810T001121_20200810T001115_T56KLB
// COPERNICUS/S2/20210721T001109_20210721T001111_T56KLB

// These images show interesting oceanographic processes
// COPERNICUS/S2/20170428T001221_20170428T001215_T56KLB" // Amazoning view of mid tide turbid flows through reef matrix
// COPERNICUS/S2/20190930T001109_20190930T001109_T56KLB" // Great view of mid tide turbid flows, just after strong tides.
// COPERNICUS/S2/20210328T001111_20210328T001107_T56KLB" // More turbid flows.
// COPERNICUS/S2/20210527T001111_20210527T001110_T56KLB" // Excellent view of mid tide turbid flows
// COPERNICUS/S2/20210726T001111_20210726T001112_T56KLB" // Excellent view of mid tide turbid flows
// 
// COPERNICUS/S2/20210507T001111_20210507T001108_T56KLB" // Shows algal blooms get pushed together at the boundary of eddies
// COPERNICUS/S2/20180816T001059_20180816T001102_T56KLB" // Large amount of organics at edge of the shelf.
// COPERNICUS/S2/20180821T001111_20180821T001108_T56KLB" // Excellent image. Large amount of organics at edge of the shelf.



// 56KMA - Australia, GBR, South east Swains, Horseshoe, Hackle
// CLOUDY_PIXEL_PERCENTAGE = 0.1
// 46 of 46 Images
s2Utils.s2_composite_display_and_export(
  [
    // Excellent
    //"COPERNICUS/S2/20170729T000219_20170729T000217_T56KMA", // (2) Removed due to lower water clarity
    "COPERNICUS/S2/20170813T000221_20170813T000219_T56KMA", // (3)
    //"COPERNICUS/S2/20180808T000241_20180808T000240_T56KMA", // (2)
    //"COPERNICUS/S2/20190724T000251_20190724T000245_T56KMA", // (2)
    "COPERNICUS/S2/20190917T000239_20190917T000239_T56KMA", // (3)
    "COPERNICUS/S2/20190922T000241_20190922T000240_T56KMA", // (4.5)
    //"COPERNICUS/S2/20210718T000239_20210718T000242_T56KMA", // (2)
    //"COPERNICUS/S2/20211115T000239_20211115T000239_T56KMA", // (2)
    // Good
    "COPERNICUS/S2/20171226T000209_20171226T000206_T56KMA", // (4)
    "COPERNICUS/S2/20190213T235651_20190213T235654_T56KMA", // (2.5)
    "COPERNICUS/S2/20201105T000251_20201105T000245_T56KMA" // (3)
  ],
  false, false, REF1_OPTIONS);
  
// COPERNICUS/S2/20160609T000222_20160609T000222_T56KMA // Turbid flows and some algal blooms also showing the structure
// COPERNICUS/S2/20170525T000221_20170525T000220_T56KMA // Turbid flow
// COPERNICUS/S2/20170823T000221_20170823T000219_T56KMA // Very fine eddies in reef matrix
// COPERNICUS/S2/20180714T000239_20180714T000238_T56KMA // Turbid flow
// COPERNICUS/S2/20191027T000239_20191027T000241_T56KMA // Turbid flow
// COPERNICUS/S2/20191111T000241_20191111T000242_T56KMA // Algal blooms during spawning season
// COPERNICUS/S2/20200603T000239_20200603T000242_T56KMA // Turbid flow, Large eddy south of Swains.

