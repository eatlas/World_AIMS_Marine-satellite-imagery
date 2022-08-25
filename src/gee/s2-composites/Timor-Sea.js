// Copyright 2022 Eric Lawrey - Australian Institute of Marine Science
//
// MIT License https://mit-license.org/
// This script is written to run on the Google Earth Engine 
var s2Utils = require('users/ericlawrey/World_AIMS_Marine-satellite-imagery:src/gee/s2Utils.js');

// These are the options for the primary reference imagery.
// The primary reference imagery should correspond to a composite
// made from the best set of images available, with the goal being
// to get the cleanest image.

var REF1_OPTIONS = {
  //colourGrades: ['TrueColour','DeepFalse','ReefTop','Shallow','Slope'],
  //exportScale: [10, 10, 10, 10, 30],

  colourGrades: ['TrueColour', 'DeepFalse'],
  exportScale: [10, 10],
  //colourGrades: ['DeepFalse'],//,'SlopeNew'],
  exportBasename: 'World_AIMS_Marine-satellite-imagery_R1',
  exportFolder: 'EarthEngine/World_AIMS_Marine-satellite-imagery/Timor-Sea',
  applySunglintCorrection: true,
  applyBrightnessAdjustment: true
};

// These options correspond to the secondary reference imagery.
// This will be made from the next best set of images. The goal
// is to provide a second set of imagery to determine if spots
// in the imagery are artefacts (from clouds) or real features.
var REF2_OPTIONS = {
  colourGrades: ['DeepFalse','Slope'],
    exportScale: [10, 30],
  exportBasename: 'World_AIMS_Marine-satellite-imagery_R1',
  exportFolder: 'EarthEngine/World_AIMS_Marine-satellite-imagery/Timor-Sea',
  applySunglintCorrection: true,
  applyBrightnessAdjustment: true
};

// ===============================================================
//
//                    Timor Sea
//
// ===============================================================
// North West Shelf, Australia. Baracouta East Shoal
// CLOUDY_PIXEL_PERCENTAGE = 0.1
// 40 of 76 Images

s2Utils.s2_composite_display_and_export(
  [
  // Excellent - no clouds
  // The following are ratings of the visibility of two shoals at the maximum depth of visibility
  // Each image was rated out of 5, where 0 indicates that the shoal is not visible.
  // Images where the visibility was rated 0 were excluded from the reference 1 image
  // Shoal 1 - Just east of Baracouta East (bottom left of tile)
  // Shoal 2 - North West of tile
                                                            // Shoal 1, Shoal 2
    "COPERNICUS/S2/20160824T015622_20160824T065137_T51LXG", // 1, 1
    "COPERNICUS/S2/20170819T015701_20170819T020019_T51LXG", // 1, 1.5
    "COPERNICUS/S2/20170903T015649_20170903T020007_T51LXG", // 2, 0.5
    "COPERNICUS/S2/20180610T015619_20180610T015817_T51LXG", // 0.5, 0.5
    "COPERNICUS/S2/20180725T015621_20180725T015621_T51LXG", // 1, 0.5 
    "COPERNICUS/S2/20190426T015629_20190426T015717_T51LXG", // 1, 1
    "COPERNICUS/S2/20190824T015029_20190824T015926_T51LXG"  // 0.5, 1.5
  ],
  false, true, REF1_OPTIONS);

// Excellent - no clouds, but lower water clarity
s2Utils.s2_composite_display_and_export(
  [
    "COPERNICUS/S2/20190506T015629_20190506T015719_T51LXG", // 0.5, 0.5 // some clouds
    "COPERNICUS/S2/20170511T015701_20170511T015839_T51LXG", // 0, 1
    "COPERNICUS/S2/20180511T015619_20180511T015619_T51LXG", // 0, 0
    "COPERNICUS/S2/20190705T015629_20190705T015719_T51LXG", // 0, 0
    "COPERNICUS/S2/20190804T015629_20190804T015718_T51LXG", // 0, 0
    "COPERNICUS/S2/20190829T015021_20190829T015658_T51LXG", // 0, 1
    "COPERNICUS/S2/20181013T015621_20181013T015617_T51LXG",	// 0.5, 1
    "COPERNICUS/S2/20190625T015629_20190625T015719_T51LXG",	// 0, 0.5
    "COPERNICUS/S2/20190809T015631_20190809T015625_T51LXG"	// 0, 0.5	// low waves
  ],
  false, false, REF2_OPTIONS);
  
// tileID = '51LXF';   // North West Shelf, Australia. Vulcan, Goeree Shoals
// CLOUDY_PIXEL_PERCENTAGE = 0.1
// 49 of 98 images

s2Utils.s2_composite_display_and_export(
  [
    // Excellent - no clouds
    "COPERNICUS/S2/20160824T015622_20160824T015622_T51LXF",
    "COPERNICUS/S2/20160913T015622_20160913T015617_T51LXF",
    "COPERNICUS/S2/20170730T015701_20170730T015834_T51LXF",
    "COPERNICUS/S2/20170903T015649_20170903T020007_T51LXF", // Some turbulence
    "COPERNICUS/S2/20180725T015621_20180725T015621_T51LXF",
    "COPERNICUS/S2/20180809T015619_20180809T020050_T51LXF",
    "COPERNICUS/S2/20180908T015609_20180908T020045_T51LXF",
    "COPERNICUS/S2/20180918T015609_20180918T020006_T51LXF",
    "COPERNICUS/S2/20181008T015619_20181008T020050_T51LXF"  // 0.5, 1.5
  ],
  false, true, REF1_OPTIONS);

// Excellent - no clouds, but lower water clarity
s2Utils.s2_composite_display_and_export(
  [
    // Excellent - no clouds, lower water clarity
    "COPERNICUS/S2/20160804T015622_20160804T015624_T51LXF",
    "COPERNICUS/S2/20170923T015639_20170923T015924_T51LXF",
    "COPERNICUS/S2/20180625T015621_20180625T015621_T51LXF",
    "COPERNICUS/S2/20180710T015619_20180710T020050_T51LXF",
    "COPERNICUS/S2/20180715T015621_20180715T015622_T51LXF",
    "COPERNICUS/S2/20180720T015619_20180720T015658_T51LXF",
    "COPERNICUS/S2/20180819T015619_20180819T015654_T51LXF",
    "COPERNICUS/S2/20180903T015621_20180903T015618_T51LXF",
    "COPERNICUS/S2/20190416T015629_20190416T015818_T51LXF",
    "COPERNICUS/S2/20190625T015629_20190625T015719_T51LXF",
    "COPERNICUS/S2/20190705T015629_20190705T015719_T51LXF",
    "COPERNICUS/S2/20190804T015629_20190804T015718_T51LXF",
    "COPERNICUS/S2/20190809T015631_20190809T015625_T51LXF",
    "COPERNICUS/S2/20190814T015029_20190814T015840_T51LXF",
    "COPERNICUS/S2/20190824T015029_20190824T015926_T51LXF",
    "COPERNICUS/S2/20190829T015021_20190829T015658_T51LXF"
  ],
  false, false, REF2_OPTIONS);

// North West Shelf, Australia. Ashmore reef
// CLOUDY_PIXEL_PERCENTAGE = 0.1
// 50 of 82 images

s2Utils.s2_composite_display_and_export(
  [
    // Excellent
    "COPERNICUS/S2/20170703T020751_20170703T020751_T51LWG",
    "COPERNICUS/S2/20170807T020749_20170807T020833_T51LWG",
    "COPERNICUS/S2/20170827T020749_20170827T020747_T51LWG",
    "COPERNICUS/S2/20180509T020451_20180509T020447_T51LWG",
    "COPERNICUS/S2/20180906T020441_20180906T021028_T51LWG",
    "COPERNICUS/S2/20190708T020459_20190708T020508_T51LWG",
    "COPERNICUS/S2/20190807T020029_20190807T020716_T51LWG",
    "COPERNICUS/S2/20190901T020021_20190901T020607_T51LWG"
  ],
  false, true, REF1_OPTIONS);

// Excellent - no clouds, but lower water clarity
s2Utils.s2_composite_display_and_export(
  [
    // Excellent, but with lower water quality          
    "COPERNICUS/S2/20180703T020449_20180703T020824_T51LWG",
    "COPERNICUS/S2/20180723T020439_20180723T020822_T51LWG",
    "COPERNICUS/S2/20180807T020451_20180807T020445_T51LWG",
    "COPERNICUS/S2/20190524T020451_20190524T020926_T51LWG",
    "COPERNICUS/S2/20190628T020459_20190628T021054_T51LWG",
    "COPERNICUS/S2/20190703T020451_20190703T021036_T51LWG",
    // Good                                             
    "COPERNICUS/S2/20180419T020451_20180419T021043_T51LWG",
    "COPERNICUS/S2/20180524T020439_20180524T020757_T51LWG",
    "COPERNICUS/S2/20180603T020439_20180603T021010_T51LWG",
    "COPERNICUS/S2/20180613T020449_20180613T020758_T51LWG",
    "COPERNICUS/S2/20180424T020449_20180424T020537_T51LWG",
    "COPERNICUS/S2/20180911T020439_20180911T020950_T51LWG",
    "COPERNICUS/S2/20190713T020451_20190713T021051_T51LWG",
    "COPERNICUS/S2/20190817T020029_20190817T020754_T51LWG",
    "COPERNICUS/S2/20160429T020809_20160429T033343_T51LWG"
  ],
  false, false, REF2_OPTIONS);

  //51LUE Scott Reef, WA, Australia
// 156 images; searched from 1-17 and 94 - 156

s2Utils.s2_composite_display_and_export(
  [
    //Excellent
    "COPERNICUS/S2/20210930T020451_20210930T020449_T51LUE",
    "COPERNICUS/S2/20210925T020449_20210925T021044_T51LUE",
    "COPERNICUS/S2/20210905T020439_20210905T020441_T51LUE",
    "COPERNICUS/S2/20210717T020449_20210717T020454_T51LUE",
    "COPERNICUS/S2/20210707T020449_20210707T020446_T51LUE",
    "COPERNICUS/S2/20210702T020451_20210702T020921_T51LUE",
    "COPERNICUS/S2/20210418T020439_20210418T020447_T51LUE",
    "COPERNICUS/S2/20201114T020451_20201114T021101_T51LUE",
    "COPERNICUS/S2/20201005T020451_20201005T020451_T51LUE",
    "COPERNICUS/S2/20200930T020449_20200930T021031_T51LUE",
    "COPERNICUS/S2/20200910T020449_20200910T020454_T51LUE",
    "COPERNICUS/S2/20200905T020451_20200905T020822_T51LUE"
  ],
  false, true, REF1_OPTIONS);


s2Utils.s2_composite_display_and_export(
  [
    // Excellent
    "COPERNICUS/S2/20200831T020449_20200831T020459_T51LUE",
    "COPERNICUS/S2/20200826T020451_20200826T020450_T51LUE",
    "COPERNICUS/S2/20200821T020449_20200821T020455_T51LUE",
    "COPERNICUS/S2/20200816T020451_20200816T021037_T51LUE",
    "COPERNICUS/S2/20200727T020451_20200727T021037_T51LUE",
    "COPERNICUS/S2/20200617T020451_20200617T021037_T51LUE",
    "COPERNICUS/S2/20200602T020449_20200602T020500_T51LUE",
    "COPERNICUS/S2/20200428T020451_20200428T021033_T51LUE",
    "COPERNICUS/S2/20200324T020449_20200324T021008_T51LUE",
    "COPERNICUS/S2/20200319T020441_20200319T021027_T51LUE"
  ],
  false, false, REF2_OPTIONS);
  
// 51LWH - North West Shelf
// CLOUDY_PIXEL_PERCENTAGE = 0.1
// 25 of 55 Images

s2Utils.s2_composite_display_and_export(
  [
    // Excellent
    "COPERNICUS/S2/20170802T020451_20170802T020833_T51LWH",
    "COPERNICUS/S2/20180603T020439_20180603T021010_T51LWH",
    "COPERNICUS/S2/20180723T020439_20180723T020822_T51LWH",

    // Good
    "COPERNICUS/S2/20170713T020451_20170713T020619_T51LWH",
    "COPERNICUS/S2/20170827T020749_20170827T020747_T51LWH",

    // ok
    "COPERNICUS/S2/20180613T020449_20180613T020758_T51LWH"
  ],
  false, true, REF1_OPTIONS);
  
// 51LYH - North West Shelf
// CLOUDY_PIXEL_PERCENTAGE = 0.1
// 25 of 49 Images
s2Utils.s2_composite_display_and_export(
  [
    // Excellent
    "COPERNICUS/S2/20180908T015609_20180908T015611_T51LYH",
    "COPERNICUS/S2/20190506T015629_20190506T015719_T51LYH",
    // Good
    "COPERNICUS/S2/20170730T015701_20170730T015834_T51LYH",
    "COPERNICUS/S2/20180610T015619_20180610T015817_T51LYH",
    "COPERNICUS/S2/20190809T015631_20190809T015625_T51LYH"
  ],
  false, true, REF1_OPTIONS);

// 51LXH - North West Shelf
// CLOUDY_PIXEL_PERCENTAGE = 0.1
// 30 of 76 Images
s2Utils.s2_composite_display_and_export(
  [
    // Excellent
    "COPERNICUS/S2/20170827T020749_20170827T020747_T51LXH",
    "COPERNICUS/S2/20180509T020451_20180509T020447_T51LXH",
    "COPERNICUS/S2/20190426T015629_20190426T015717_T51LXH",
    // Good
    "COPERNICUS/S2/20160107T015552_20160107T015552_T51LXH",
    "COPERNICUS/S2/20170713T020451_20170713T020619_T51LXH",
    "COPERNICUS/S2/20180703T020449_20180703T020824_T51LXH"
  ],
  false, true, REF1_OPTIONS);
  
// Australia, WA, Bonaparte Archipelago, Long Reef 
// This region is very turbid due to tidal movements.
// CLOUDY_PIXEL_PERCENTAGE = 0.1
// 40 of 118 images
s2Utils.s2_composite_display_and_export(
  [
    //Relative water clarity index 1 - aweful, 5 - ok
    // Excellent
    "COPERNICUS/S2/20170903T015649_20170903T020007_T51LYE", // (3)
    "COPERNICUS/S2/20170730T015701_20170730T015834_T51LYE", // (3)
    "COPERNICUS/S2/20170620T015701_20170620T015836_T51LYE", // (3)
    "COPERNICUS/S2/20180511T015619_20180511T015619_T51LYE", // (3)
    "COPERNICUS/S2/20180710T015619_20180710T020050_T51LYE", // (3)
    "COPERNICUS/S2/20180918T015609_20180918T020006_T51LYE", // (3)
    //"COPERNICUS/S2/20160715T015622_20160715T015624_T51LYE", // (2) (removed due to lower water clarity)
    //"COPERNICUS/S2/20160824T015622_20160824T015622_T51LYE", // (2) (removed due to lower water clarity)

    // Good
    "COPERNICUS/S2/20180411T015619_20180411T020056_T51LYE", // (4)
    "COPERNICUS/S2/20180918T015609_20180918T020006_T51LYE" //(5)
  ],
  false, true, REF1_OPTIONS);
  
// North West Shelf, Australia, Timor Sea, Big Bank Shoals
// Aligns with:
// A. Heyward, E. Pinceratto, L. Smith (1997) Big Bank Shoals of the Timor Sea. An Environmenal Resource Atlas
// CLOUDY_PIXEL_PERCENTAGE = 0.1
// 34 of 34 images
s2Utils.s2_composite_display_and_export(
  [
    // Excellent
    "COPERNICUS/S2/20180705T015621_20180705T015939_T51LZJ",
    
    // Good
    "COPERNICUS/S2/20160804T015622_20160804T015624_T51LZJ",
    "COPERNICUS/S2/20170715T015619_20170715T015902_T51LZJ",
    "COPERNICUS/S2/20180426T015621_20180426T015622_T51LZJ",
    "COPERNICUS/S2/20210604T015619_20210604T015621_T51LZJ",
    "COPERNICUS/S2/20210609T015621_20210609T015621_T51LZJ",
    
    // OK
    "COPERNICUS/S2/20200604T015631_20200604T015627_T51LZJ"
  ],
  false, true, REF1_OPTIONS);
  
  
// Australia, WA, Joseph Bonaparte Gulf, Ord River
// Ord-East Kimberly Expansion Project (https://www.abc.net.au/news/rural/2012-12-19/northern-territory-pushing-hard-to-develop-ord/6129516)
//Cloud percentage: 0.5%
//50 of 143 images
// This area is very shallow, super turbid with strong tides.
// The final image was chosen because it is the lowest tide image.
// Excellent
//COPERNICUS/S2/20160210T013702_20160210T013716_T52LEJ
//COPERNICUS/S2/20160619T013712_20160619T013859_T52LEJ
//COPERNICUS/S2/20170525T013721_20170525T013715_T52LEJ
//COPERNICUS/S2/20170917T013659_20170917T013702_T52LEJ
//COPERNICUS/S2/20180624T013709_20180624T013906_T52LEJ
//COPERNICUS/S2/20181007T013711_20181007T013709_T52LEJ
s2Utils.s2_composite_display_and_export([
    "COPERNICUS/S2/20171231T013711_20171231T013706_T52LEJ" // Extra low tide
  ],false, true, REF1_OPTIONS);

// Good
//COPERNICUS/S2/20170902T013711_20170902T013712_T52LEJ // Low tide

//Cloud percentage: 0.1%
//20 of 80 images
// Australia, NT, Joseph Bonaparte Gulf, Daly
// Excellent (scale indicates tide, 1 is lowest)
s2Utils.s2_composite_display_and_export([
    "COPERNICUS/S2/20160520T014043_20160520T044523_T52LFL", //2
    "COPERNICUS/S2/20160619T013859_20160619T081553_T52LFL", // 2
    "COPERNICUS/S2/20160719T014041_20160719T062935_T52LFL", //2
    "COPERNICUS/S2/20170525T013721_20170525T013715_T52LFL", // 2
    "COPERNICUS/S2/20180515T013709_20180515T013736_T52LFL", // 2
    "COPERNICUS/S2/20180609T013711_20180609T013712_T52LFL" // 3
  ],false, true, REF1_OPTIONS);
// Good
//COPERNICUS/S2/20160818T013712_20160818T014059_T52LFL //2




// Australia, NT, Joseph Bonaparte Gulf, Daly
//Cloud percentage: 0.1%
//30 of 163 images
// This area has blue water, however there are no visible
// marine features
//Excellent
s2Utils.s2_composite_display_and_export([
    "COPERNICUS/S2/20160729T013722_20160729T013908_T52LEL",
    "COPERNICUS/S2/20160818T013712_20160818T013715_T52LEL",
    "COPERNICUS/S2/20170525T013721_20170525T013715_T52LEL",
    "COPERNICUS/S2/20170614T013711_20170614T013713_T52LEL",
    "COPERNICUS/S2/20170724T013711_20170724T013714_T52LEL",
    "COPERNICUS/S2/20180505T013709_20180505T013711_T52LEL"
  ],false, true, REF1_OPTIONS);

// Australia, WA, Joseph Bonaparte Gulf, Ord River
//Cloud percentage: 0.1%
//30 of 212 images
// This area is super turbid, shallow and tidal. No reef structures
// or visible seagrass, only mud banks. Single right image used because
// it was significantly lower tide.
s2Utils.s2_composite_display_and_export([
    "COPERNICUS/S2/20170518T014701_20170518T015100_T52LDJ",
    "COPERNICUS/S2/20170806T014701_20170806T014701_T52LDJ", // Left
    //COPERNICUS/S2/20170808T013709_20170808T013711_T52LDJ // Right
    "COPERNICUS/S2/20170821T014659_20170821T014837_T52LDJ", // Left
    //COPERNICUS/S2/20170902T013711_20170902T013712_T52LDJ // Right
    "COPERNICUS/S2/20171231T013711_20171231T013706_T52LDJ" // Right, Extra low tide
  ],false, true, REF1_OPTIONS);

// Australia, WA, Joseph Bonaparte Gulf, Ord River
//Cloud percentage: 0.1%
//30 of 249 images
// This area is super turbid, tidally driven area. There were no visible
// reef features
s2Utils.s2_composite_display_and_export([
    "COPERNICUS/S2/20160423T014702_20160423T015022_T52LDK",
    "COPERNICUS/S2/20160619T013712_20160619T013859_T52LDK", // Right
    "COPERNICUS/S2/20160702T014702_20160702T014701_T52LDK", // Left
    "COPERNICUS/S2/20160729T013722_20160729T013908_T52LDK", // Right
    "COPERNICUS/S2/20160818T013712_20160818T081658_T52LDK", // Right
    "COPERNICUS/S2/20170704T013711_20170704T013711_T52LDK", // Right
    "COPERNICUS/S2/20170712T014659_20170712T015057_T52LDK", // Left
    "COPERNICUS/S2/20170719T013709_20170719T013712_T52LDK", // Right
    "COPERNICUS/S2/20170717T014701_20170717T015058_T52LDK" // Left
  ],false, true, REF1_OPTIONS);

// Australia, WA, Joseph Bonaparte Gulf, East of Ord River
//Cloud percentage: 0.1%
//20 of 83 images
s2Utils.s2_composite_display_and_export([
    "COPERNICUS/S2/20160619T013712_20160619T013859_T52LEK",
    "COPERNICUS/S2/20160818T013712_20160818T014059_T52LEK",
    "COPERNICUS/S2/20170505T013721_20170505T013715_T52LEK",
    "COPERNICUS/S2/20170704T013711_20170704T013711_T52LEK",
    "COPERNICUS/S2/20170719T013709_20170719T013712_T52LEK",
    "COPERNICUS/S2/20180609T013711_20180609T013712_T52LEK",
    "COPERNICUS/S2/20180709T013711_20180709T013714_T52LEK",
    "COPERNICUS/S2/20180724T013709_20180724T013717_T52LEK",
    "COPERNICUS/S2/20180808T013711_20180808T013712_T52LEK",
  ],false, true, REF1_OPTIONS);

// Australia, WA, Joseph Bonaparte Gulf, North West of Ord River
//Cloud percentage: 0.1%
//20 of 98 images
// This seems to be highly turbid region with no visible features
s2Utils.s2_composite_display_and_export([
    "COPERNICUS/S2/20160423T014702_20160423T015022_T52LCL",
    "COPERNICUS/S2/20180707T014659_20180707T014658_T52LCL",
    "COPERNICUS/S2/20180727T014659_20180727T014754_T52LCL",
    "COPERNICUS/S2/20180806T014659_20180806T014655_T52LCL"
  ],false, true, REF1_OPTIONS);