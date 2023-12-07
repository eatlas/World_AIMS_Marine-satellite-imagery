// Copyright 2022 Eric Lawrey - Australian Institute of Marine Science
// MIT License https://mit-license.org/

// This script is written to run on the Google Earth Engine at 
// https://code.earthengine.google.com/8381c7f6846e4460a5271dd8469896ae
//
// This script allows the user to browse through the image catalog to
// manually select the clearest images available. These can then be
// collated into a collection for subsequent processing.
// The IDs of the images at each step can be found in the console.


// === README: Change the path to your local copy of the s2Utils code ====
// The path to the util code must be an absolute path including the
// username and repository
var s2Utils = require('users/ericlawrey/World_AIMS_Marine-satellite-imagery:src/01-gee/sentinel2/s2Utils.js');
 
// Date range to iterate through the Sentinel 2 imagery.
var START_DATE = '2022-01-01';
var END_DATE = '2023-12-01';

//var START_DATE = '2020-10-29';
//var END_DATE = '2020-10-31';

// Maximum cloud cover to include the image. Setting a low value removes
// images that have lots of cloud that will probably not be useful for
// subsequent processing. 
// In most areas setting this to 1 (%) means that about 30 - 50% of the
// images are useful for generating final composite images. 
// In some areas where there are very few images available. In which case
// this can be raised up to 100 (%) to allow previewing of all available
// imagery.
var CLOUDY_PIXEL_PERCENTAGE = 2;

// Select the Sentinel 2 tiling grid to review the images for.
// Use the map link below to find the tileID for the area of interest.
// https://maps.eatlas.org.au/index.html?intro=false&z=7&ll=146.90137,-19.07287&l0=ea_ref%3AWorld_ESA_Sentinel-2-tiling-grid_Poly,ea_ea-be%3AWorld_Bright-Earth-e-Atlas-basemap,google_SATELLITE&v0=,,f
var tileID;

// This script only processes one tileID. Uncomment the tileID of the area under investigation.
// Normally the process is to select the best images to use for subsequent processing
// for each tile. Ensure that only one tileID is set then progressively record the Google Earth
// image IDs of the best images. This can then be copied into 03-create-composite.
// It typically takes 30 - 60 mins to preview all the images for a tile area (due to the limited
// processing speed of the Google Earth Engine.)
//
// Note the tile selection and the matching reefs in each tile were determined using:
//  - Sentinel 2 UTM Tiling Grid https://eatlas.org.au/data/uuid/f7468d15-12be-4e3f-a246-b2882a324f59
//  - Coral Sea geomorphic features (JCU) https://eatlas.org.au/data/uuid/25685ba5-6583-494f-974d-cce2f3429b78
// These were combined in 01-sentinel2-tile-selection map.
// The comments for the tileID of 'Far North', 'North', 'Central', and 'South' represent latitudinal
// regions in the Coral Sea. They are not based on any offical classification.
// Where a reef has been split across multiple tiles then which section of the reef is
// on the tile is indicated in brackets after the reef name.

// ---------- Coral Sea -------------------
//tileID = '55LBK';     // Boot Reef, Portlock Reefs (Coral Sea) - Far North
//tileID = '54LZP';     // Ashmore Reef (Coral Sea) - Far North
//tileID = '55LDE';     // Osprey Reef (Coral Sea) - North
//tileID = '55LEC';     // Bougainville Reef (Coral Sea) - Central
//tileID = '55LGC';     // Diane Bank (Coral Sea) - Central
//tileID = '55LHC';     // Willis Islets (Coral Sea) - Central
//tileID = '55KEB';     // Holmes Reefs (West), Flora Reef, McDermott Bank (Coral Sea) - Central
//tileID = '55KFB';     // Holmes Reefs (East) (Coral Sea) - Central
//tileID = '55KGB';     // Herald Cays, Willis Islets, Magdelaine Cays (West) (Coral Sea) - Central
//tileID = '55KHB';     // Magdelaine Cays, Coringa Islet (East), U/N reef (Coral Sea) - Central
//tileID = '56KLG';     // North Lihou Reef (Coral Sea, Australia) - Central
                        // (Boundaries: 25, Dry Reefs: 15, Cays/Islands: 6 )
//tileID = '56KMG';     // North East Lihou Reef tip (Coral Sea, Australia) - Central
//tileID = '55KFA';     // Flinders, Dart Heralds Surprise (Coral Sea) - Central
//tileID = '55KGA';     // Malay Reef, Magdelaine Cays, Coringa Islet (South), Abington Reef, 
                        // U/N Reef (Coral Sea) - Central
//tileID = '55KHA';     // Tregrosse Reefs, Diamond Islet West, Magdelaine Cays, Coringa Islet (South) 
                        // (Coral Sea) - Central
//tileID = '56KKF';     // Tregrosse Reefs, Diamond Islet (Coral Sea) - Central
//tileID = '56KLF';     // (V0) Lihou reef (South West) (Coral Sea, Australia) - Central
//tileID = '56KMF';     // Lihou reef (West) (Coral Sea, Australia) - Central
//tileID = '56KQF';     // Mellish Reef (Coral Sea) - Central
                        // This tile only had 2 images with < 1% cloud cover,
                        // neither of them were useful.
                        // Raising the threshold to 3% only gave 5 images, none
                        // of which were useful. We therefore instead use the neighbouring
                        // tile to pick up Mellish Reef.
//tileID = '56KRF';     // Mellish Reef (Coral Sea) - Central
                        // Raising the CLOUDY_PIXEL_PERCENTAGE to 10% still
                        // only resulted in 6 images. All of which were used.
//tileID = '56KME';     // (V0) Marion Reef (North) (Coral Sea, Australia) - Central
//tileID = '56KMD';     // (V0) Marion Reef (South) (Coral Sea, Australia) - Central
//tileID = '56KPC';     // Calder Bank, Coral Sea - South
//tileID = '56KNB';     // Saumarez Reefs (North) (Coral Sea, Australia) - South
//tileID = '56KPB';     // (V0) Frederick Reef (Coral Sea, Australia) - South
//tileID = '56KQB';     // Kenn Reefs (Coral Sea) - South
//tileID = '56KNA';     // Saumarez Reefs (South) (Coral Sea) - South
//tileID = '56KQA';     // Wreck Reefs (Coral Sea) - South
//tileID = '56KQV';     // Cato Reef (Coral Sea) - South
//tileID = '55LCJ';     // Eastern Fields (PNG) - Far North (Just ouside Coral Sea Marine Park)


// Sea mounts that probably don't have reefs.
//tileID = '56KQU';     // Fraser Seamount - South
//tileID = '56KQE';     // U/N Sea mount - Central AUS04634 - 29 m feature in marine chart 
                        // Only partial image scenes. 16 images, but none with clear
                        // view over reef area.
//tileID = '57KTS';     // Selfridge Rock (https://web.archive.org/web/20130305015208/http://www.shom.fr/fileadmin/data-www/01-LE_SHOM/02-ACTUALITES/01-LES_COMMUNIQUES/fig_2_-_Sandy_Island.png)
                        // Only one image and it has high cloud cover
//tileID = '57KUS';     // Selfridge Rock 2 images but neither are useful.
//tileID = '56KRB';     // Obstn Rep (1962) AUS04643 - only 1 image covered in clouds

//tileID = '56KKG';     // Magdelaine Cays, Coringa Islet (Coral Sea, Australia) (Boundaries: 8, Dry Reefs: 2, Cays/Islands: 2 )


// Additional tiles in search of new reefs
//tileID = '55LBJ';   // (North Western) Coral Sea 
//tileID = '55LBH';   // (North Western) Coral Sea 
//tileID = '55LCH';   // (North Western) Coral Sea 
//tileID = '55LBG';   // (North Western) Coral Sea 
//tileID = '55LBF';   // (North Western) Coral Sea 
//tileID = '55LCF';   // (North Western) Coral Sea 
//tileID = '55LDF';   // (North Western) Coral Sea, north of Osprey
//tileID = '55LEF';     // (North Western) Coral Sea, north of Osprey
//tileID = '55LCE';   // (North Western) Coral Sea, west of Osprey
//tileID = '55LEE';   // (North Western) Coral Sea, east of Osprey
//tileID = '55LFE';   // (North Western) Coral Sea, east of Osprey
//tileID = '55LGE';   // (North Western) Coral Sea, east of Osprey
//tileID = '56LQK';   // (North Eastern) Coral Sea
//tileID = '56LRK';   // (North Eastern) Coral Sea
//tileID = '56LTE';   // (North Eastern) Coral Sea (0 images at 100% cloud threshold)
//tileID = '55LDD';   // (Central) Coral Sea
//tileID = '55LED';   // (Central) Coral Sea
//tileID = '55LFD';   // (Central) Coral Sea
//tileID = '55LGD';   // (Central) Coral Sea
//tileID = '55LHD';   // (Central) Coral Sea
//tileID = '56LQJ';   // (Central eastern) Coral Sea
//tileID = '56LRJ';   // (Central eastern) Coral Sea
//tileID = '56LTD';   // (Central eastern) Coral Sea (0 images at 100% cloud threshold)
//tileID = '56LUD';   // (Central eastern) Coral Sea (0 images at 100% cloud threshold)
//tileID = '55LDC';   // (Central) Coral Sea, west Bougainville Reef
//tileID = '55LFC';   // (Central) Coral Sea, east Bougainville Reef
//tileID = '56LKH';   // (Central) Coral Sea, west Dianne bank
//tileID = '56LLH';   // (Central) Coral Sea, west Dianne bank
//tileID = '56LMH';   // (Central) Coral Sea, North west of Lihou
//tileID = '56LNH';   // (Central) Coral Sea, North west of Lihou
//tileID = '55KDB';   // (Central) Coral Sea
tileID = '55KFV';     // (Central) Coral Sea, North of Prawn and Castor Reef
tileID = '55KGV';     // (Central western) Coral Sea
tileID = '55KHV';     // (Central western) Coral Sea
tileID = '56KKE';     // (Central western) Coral Sea
tileID = '56KLE';     // (Central western) Coral Sea
tileID = '55KHU';     // (Southern) Coral Sea, Hyde Reef, Wyatt Reef (Edge of GBR)
tileID = '56KKD';     // (Southern) Coral Sea, Wyatt Reef (Edge of GBR)
tileID = '56KLD';     // (Southern) Coral Sea
tileID = '56KLC';     // (Southern) Coral Sea, Olympic Reef (Edge of GBR)
tileID = '56KMC';     // (Southern) Coral Sea
tileID = '57KTR';     // (Southern western) Coral Sea, West of Wreck reef

tileID = '55KDB';     // Australia, GBR, Moore Reef


// Potential shallow areas in Eastern Coral Sea
// These areas were identified as having potentially shallow areas based
// on the SRTM30-plus v8.0 dataset. 
//tileID = '57KXT';   
//tileID = '57KYT';       // Lansdowne Bank (potential 29 m Obstn)
//tileID = '57KYS';
//tileID = '57KZS';
//tileID = '57KXS';
//tileID = '57KWP';
//tileID = '57JWN';

// ------------- Global test reefs --------------
// Reefs around the world for testing the definition of reef boundaries

// Drowned coral atoll reefs because of subsidence 
//tileID = '56NLP';   // Federated States of Micronesia (0 images available)
//tileID = '55PHK';   // Federated States of Micronesia (0 images available)
//tileID = '56PLQ';   // Federated States of Micronesia (0 images available)
//tileID = '56PMQ';   // Federated States of Micronesia (0 images available)

// Near surface drowned continental areas
//tileID = '41LMJ';   // Saya de Malha Banks (1 image, not much vis)
//tileID = '41LLJ';   // Saya de Malha Banks (6 images, 2 usable images)
//tileID = '41LLK';   // Saya de Malha Banks 

//tileID = '57KVV';   // Chesterfield Reefs 7 images
//tileID = '57KVU';   // Chesterfield Reefs
//tileID = '57KVT';   // Chesterfield Reefs
//tileID = '57KVS';   // Chesterfield Reefs  11 images
//tileID = '57KWS';   // Chesterfield Reefs, lots of sunglint
//tileID = '57KWR';   // Chesterfield Reefs, Not images at 0.1% cloud
//tileID = '57KWU';   // Chesterfield Reefs, Infamous non existant 'Sandy Island'
//tileID = '57KWR';   // Chesterfield Reefs, South (3 images, 1 blank, 2 with heavy clouds)
//tileID = '57KWQ';   // Chesterfield Reefs, South (3 images, 1 blank, 2 with heavy clouds, 0 usable images)
//tileID = '57KXT';   // New caledonia, Lansdowne Bank
// --------------------------------------------------------

//tileID = '58KCC';   // New caledonia, Yande Island                
//tileID = '58KFC';   // New Caledonia, Ouvea
//tileID = '58KCD';   // New Caledonia, North, Wala
//tileID = '58KCE';   // New Caledonia, Far North East
//tileID = '58KBE';   // New Caledonia, Far North West
//tileID = '01KCV';   // Fiji, Moce, Tubou
//tileID = '06LWH';   // French Polynesia, Palliser Islands, Kaukura Atoll
//tileID = '06LUJ';   // French Polynesia, Tikehau, Mataiva Atoll
//tileID = '04NFH';   // Kitibati, Kiritimati
//tileID = '58PGR';   // Marshall Islands, Kwajalein Atoll
//tileID = '58PET';   // Marshall Islands, Bikini Atoll
//tileID = '55PHK';   // Makur Islands, Namonuito Atoll
//tileID = '53NMJ';   // Palau
//tileID = '43NCE';   // Maldives, Hulhumale
//tileID = '56LKR';   // PNG, Trobriand Islands
//tileID = '56LLN';   // PNG, 


//tileID = '54LZN';   // Australia, GBR, Raine Island
//tileID = '54LZM';   // Australia, GBR, Great Detached reef, Wishbone reef
//tileID = '54LYM';   // Australia, GBR, Cockburn Reef, Nomad Reef, Gallon Reef
//tileID = '55KGU';   // Australia, GBR, Hardy Reef, Block Reef
//tileID = '55LCD';   // Australia, GBR, Lizard Island, Ribbon No 10 reef

//tileID = '55KFU';   // Australia, GBR, Dingo Reefs, Gould Reefs
//tileID = '56KKC';   // Australia, GBR, Cockatoo Reef, Hopley comparison 
//tileID = '55KCB';   // Australia, GBR, Green Island, Arlington, Hopley comparison
                      // For comparision with Hopley D, et. al., (2007), 
                      // The Geomorphology of the Great Barrier Reef
//tileID = '56KLB';   // Australia, GBR, North west Swains, Heralds Reef
//tileID = '56KMA';   // Australia, GBR, South east Swains, Horseshoe, Hackle
//tileID = '56KMB';   // Australia, GBR, North east Swains, Elusive Reef
//tileID = '56KMU';   // Australia, GBR, Lady Musgrave
//tileID = '55KEV';   // Australia, GBR, Davies, Grub, Chicken
//tileID = '55KCA';     // Australia, GBR, Mission beach
//tileID = '55KDA';     // Australia, GBR, Howies Reef, Nathan Reefm Otter Reef, King reef



// ======== Arafura-Sea ======
tileID = '54LVJ';      // Gulf of Carpentaria, South East (3 north of Karumba) (Two shoals on marine charts)
tileID = '54LVH';      // Gulf of Carpentaria, South East (2 north of Karumba) (Two shoals on marine charts)
//tileID = '54KVG';      // Gulf of Carpentaria, South East (1 north of Karumba) (Two shoals on marine charts)

// ======== Timor-Sea =======
//tileID = '51LZJ';   // North West Shelf, Australia, Timor Sea, Big Bank Shoals
                      // Aligns with:
                      // A. Heyward, E. Pinceratto, L. Smith (1997) Big Bank Shoals of the Timor Sea. An Environmenal Resource Atlas
//tileID = '51LXG';   // North West Shelf, Australia. Baracouta East Shoal
//tileID = '51LXF';   // North West Shelf, Australia. Vulcan, Goeree Shoals
                      // https://northwestatlas.org/nwa/pttep/synthesis2
//tileID = '51LWG';                      // North West Shelf, Australia, Ashmore reef
//tileID = '51LXH';   // North West Shelf
//tileID = '51LYH';   // North West Shelf
//tileID = '51LWH';   // North West Shelf
//tileID = '51LUE';   // Australia, WA, Scott Reef
//tileID = '52LDL';   // Australia, WA, Joseph Bonaparte Gulf, North of Ord River, East of Daly
//tileID = '52LCL';   // Australia, WA, Joseph Bonaparte Gulf, North West of Ord River
//tileID = '52LEK';   // Australia, WA, Joseph Bonaparte Gulf, East of Ord River
//tileID = '52LDK';   // Australia, WA, Joseph Bonaparte Gulf, Ord River
//tileID = '52LDJ';   // Australia, WA, Joseph Bonaparte Gulf, Ord River
//tileID = '52LEL';   // Australia, NT, Joseph Bonaparte Gulf, Daly
//tileID = '52LFL';   // Australia, NT, Joseph Bonaparte Gulf, Daly
//tileID = '52LEJ';   // Australia, WA, Joseph Bonaparte Gulf, Ord River
                    // Ord-East Kimberly Expansion Project (https://www.abc.net.au/news/rural/2012-12-19/northern-territory-pushing-hard-to-develop-ord/6129516)

// ======== Sth-E-Asian-Arch =======
//tileID = '51MWT';   // Indonesia, Melilis Island


// ======== Philippines =======
//tileID = '51PWN';   // Philippines, Visayan Sea, Bantayan Island
//tileID = '37PFT';   // Eritrea, Red Sea, Dahlak Marine National Park

// Western Australia - Pilbra
//tileID = '50KQD';   // Australia, Western Australia, North East of Port Headland
//tileID = '50KPD';   // Australia, Western Australia, North of Port Headland
//tileID = '50KPC';   // Australia, Western Australia, Port Headland
//tileID = '49KGR';   // Australia, WA, Ningaloo reef
//tileID = '51LYE';   // Australia, WA, Bonaparte Archipelago, Long Reef 
//tileID = '49JGM';   // Australia, WA, Shark bay. This scene is used to highlight
                      // recognising dark substrates due to the seagrass meadows.
tileID = '51KWB';   // King Sound 
tileID = '51LWC';   // Buccaneer Archipelago
tileID = '51LXC';   // Montgomery Reef
//tileID = '51KXB';   // Wallcott Inlet
                      

// ============== Speed run =====================
/* tileID = '52LHQ'; // Arafura Sea
tileID = '53KRB'; // Arafura Sea
tileID = '53LKJ'; // Arafura Sea
tileID = '53LKK'; // Arafura Sea
tileID = '53LLH'; // Arafura Sea
tileID = '53LLJ'; // Arafura Sea
tileID = '53LLK'; // Arafura Sea
tileID = '53LMG'; // Arafura Sea
// tileID = '53LMH'; // Arafura Sea
tileID = '53LMJ'; // Arafura Sea
tileID = '53LND'; // Arafura Sea
tileID = '53LNE'; // Arafura Sea
tileID = '53LNF'; // Arafura Sea
tileID = '53LNG'; // Arafura Sea
tileID = '53LNH'; // Arafura Sea
tileID = '53LNJ'; // Arafura Sea
tileID = '53LPC'; // Arafura Sea
tileID = '53LPD'; // Arafura Sea
//tileID = '53LPE'; // Arafura Sea
tileID = '53LPF'; // Arafura Sea
tileID = '53LPG'; // Arafura Sea
tileID = '53LPH'; // Arafura Sea
tileID = '53LPJ'; // Arafura Sea
tileID = '53LQC'; // Arafura Sea
tileID = '53LQD'; // Arafura Sea
tileID = '53LQE'; // Arafura Sea
tileID = '53LQF'; // Arafura Sea
tileID = '53LQG'; // Arafura Sea
tileID = '53LQH'; // Arafura Sea
tileID = '53LQJ'; // Arafura Sea
tileID = '53LRC'; // Arafura Sea
tileID = '53LRD'; // Arafura Sea
tileID = '54KTG'; // Arafura Sea
tileID = '54KUF'; // Arafura Sea
tileID = '54KUG'; // Arafura Sea
tileID = '54KVF'; // Arafura Sea
tileID = '54KVG'; // Arafura Sea
tileID = '54KWG'; // Arafura Sea
//tileID = '54LTH'; // Arafura Sea
tileID = '54LTJ'; // Arafura Sea
tileID = '54LUH'; // Arafura Sea
tileID = '54LUJ'; // Arafura Sea
tileID = '54LVH'; // Arafura Sea
tileID = '54LVJ'; // Arafura Sea
tileID = '54LVK'; // Arafura Sea
tileID = '54LVL'; // Arafura Sea
tileID = '54LWH'; // Arafura Sea
tileID = '54LWJ'; // Arafura Sea
tileID = '54LWK'; // Arafura Sea
tileID = '54LWL'; // Arafura Sea
tileID = '54LWM'; // Arafura Sea
tileID = '49JFL'; // Western Australia
tileID = '49JFM'; // Western Australia
tileID = '49JFN'; // Western Australia
tileID = '49JGJ'; // Western Australia
tileID = '49JGK'; // Western Australia
tileID = '49JGL'; // Western Australia
//tileID = '49JGM'; // Western Australia
tileID = '49JGN'; // Western Australia
tileID = '49KFP'; // Western Australia
tileID = '49KGP'; // Western Australia
tileID = '49KGQ'; // Western Australia
//tileID = '49KGR'; // Western Australia
tileID = '49KGS'; // Western Australia
tileID = '49KHR'; // Western Australia
tileID = '49KHS'; // Western Australia
tileID = '49KHT'; // Western Australia
tileID = '50JKN'; // Western Australia
tileID = '50JKP'; // Western Australia
tileID = '50JKR'; // Western Australia
tileID = '50JKS'; // Western Australia
tileID = '50KKB'; // Western Australia
tileID = '50KKC'; // Western Australia
tileID = '50KKD'; // Western Australia
tileID = '50KLB'; // Western Australia
tileID = '50KLC'; // Western Australia
tileID = '50KLD'; // Western Australia
tileID = '50KMB'; // Western Australia
tileID = '50KMC'; // Western Australia
tileID = '50KMD'; // Western Australia
tileID = '50KNC'; // Western Australia
tileID = '50KND'; // Western Australia
//tileID = '50KPC'; // Western Australia
//tileID = '50KPD'; // Western Australia
tileID = '50KPE'; // Western Australia
tileID = '50KQC'; // Western Australia
//tileID = '50KQD'; // Western Australia
tileID = '50KQE'; // Western Australia
tileID = '50KRD'; // Western Australia
tileID = '50KRE'; // Western Australia
tileID = '50KRF'; // Western Australia
tileID = '51KTA'; // Western Australia
tileID = '51KTB'; // Western Australia
tileID = '51KTU'; // Western Australia
tileID = '51KTV'; // Western Australia
tileID = '51KUU'; // Western Australia
tileID = '51KUV'; // Western Australia
tileID = '51KVV'; // Western Australia
tileID = '54LWN'; // Great Barrier Reef & Torres Strait
tileID = '54LXM'; // Great Barrier Reef & Torres Strait
tileID = '54LXN'; // Great Barrier Reef & Torres Strait
tileID = '46LHM'; // Southeast Asian Archipelago
tileID = '46LHN'; // Southeast Asian Archipelago
tileID = '47LKG'; // Southeast Asian Archipelago
tileID = '47LKH'; // Southeast Asian Archipelago
tileID = '47LLG'; // Southeast Asian Archipelago
tileID = '48LWN'; // Southeast Asian Archipelago
tileID = '48LWP'; // Southeast Asian Archipelago
tileID = '48LXP'; // Southeast Asian Archipelago
tileID = '57HVE'; // Subtropical Eastern Australia
tileID = '57HWE'; // Subtropical Eastern Australia
tileID = '57JVF'; // Subtropical Eastern Australia
tileID = '57JVG'; // Subtropical Eastern Australia
tileID = '57JVH'; // Subtropical Eastern Australia
tileID = '57JWF'; // Subtropical Eastern Australia
tileID = '57JWG'; // Subtropical Eastern Australia
tileID = '57JWH'; // Subtropical Eastern Australia
tileID = '50KPF'; // Timor Sea
tileID = '50KPG'; // Timor Sea
tileID = '50KQF'; // Timor Sea
tileID = '50KQG'; // Timor Sea
tileID = '51KUA'; // Timor Sea
tileID = '51KUB'; // Timor Sea
tileID = '51KVA'; // Timor Sea
tileID = '51KVB'; // Timor Sea
tileID = '51KWA'; // Timor Sea
tileID = '51KWB'; // Timor Sea
tileID = '51KXB'; // Timor Sea
tileID = '51LUC'; // Timor Sea
//tileID = '51LUE'; // Timor Sea
tileID = '51LUF'; // Timor Sea
tileID = '51LVC'; // Timor Sea
tileID = '51LVD'; // Timor Sea
tileID = '51LVE'; // Timor Sea
tileID = '51LVF'; // Timor Sea
tileID = '51LVG'; // Timor Sea
tileID = '51LWC'; // Timor Sea
tileID = '51LWD'; // Timor Sea
tileID = '51LWE'; // Timor Sea
tileID = '51LWF'; // Timor Sea
//tileID = '51LWG'; // Timor Sea
tileID = '51LXC'; // Timor Sea
tileID = '51LXD'; // Timor Sea
tileID = '51LXE'; // Timor Sea
//tileID = '51LXF'; // Timor Sea
//tileID = '51LXG'; // Timor Sea
//tileID = '51LXH'; // Timor Sea
tileID = '51LYD'; // Timor Sea
//tileID = '51LYE'; // Timor Sea
tileID = '51LYF'; // Timor Sea
tileID = '51LYG'; // Timor Sea
//tileID = '51LYH'; // Timor Sea
tileID = '51LYJ'; // Timor Sea
tileID = '51LZD'; // Timor Sea
tileID = '51LZE'; // Timor Sea
tileID = '51LZF'; // Timor Sea
tileID = '51LZG'; // Timor Sea
tileID = '51LZH'; // Timor Sea
//tileID = '51LZJ'; // Timor Sea
tileID = '52LBJ'; // Timor Sea
tileID = '52LBK'; // Timor Sea
tileID = '52LBL'; // Timor Sea
tileID = '52LBM'; // Timor Sea
tileID = '52LBN'; // Timor Sea
tileID = '52LBP'; // Timor Sea
tileID = '52LBQ'; // Timor Sea
tileID = '52LCJ'; // Timor Sea
tileID = '52LCK'; // Timor Sea
//tileID = '52LCL'; // Timor Sea
tileID = '52LCP'; // Timor Sea
tileID = '52LCQ'; // Timor Sea
//tileID = '52LDJ'; // Timor Sea
//tileID = '52LDK'; // Timor Sea
tileID = '52LDL'; // Timor Sea
tileID = '52LDM'; // Timor Sea
tileID = '52LDN'; // Timor Sea
tileID = '52LDP'; // Timor Sea
tileID = '52LDQ'; // Timor Sea
//tileID = '52LEJ'; // Timor Sea
//tileID = '52LEK'; // Timor Sea
//tileID = '52LEL'; // Timor Sea
tileID = '52LEM'; // Timor Sea
tileID = '52LEN'; // Timor Sea
tileID = '52LEP'; // Timor Sea
tileID = '52LEQ'; // Timor Sea
tileID = '52LFL'; // Timor Sea
tileID = '52LFM'; // Timor Sea
tileID = '52LFN'; // Timor Sea
tileID = '52LFP'; // Timor Sea
tileID = '52LFQ'; // Timor Sea
tileID = '52LGM'; // Timor Sea
//tileID = '52LGN'; // Timor Sea
//tileID = '52LGP'; // Timor Sea
//tileID = '52LGQ'; // Timor Sea
//tileID = '52LHM'; // Timor Sea
//tileID = '52LHN'; // Timor Sea
//tileID = '52LHP'; // Timor Sea
//tileID = '53LKH'; // Timor Sea
//tileID = '53LLG'; // Timor Sea
//tileID = '58JGM'; // Sth-West-Pacific (no images)
//tileID = '58JGN'; // Sth-West-Pacific (no images)
//tileID = '58JGP'; // Sth-West-Pacific (no images)
//tileID = '59JKG'; // Sth-West-Pacific (no images)
//tileID = '59JKH'; // Sth-West-Pacific (no images)
//tileID = '59JKJ'; // Sth-West-Pacific (no images)



tileID = '54KTG'; // Arafura Sea
//tileID = '53LQE'; // Arafura Sea
//tileID = '49KGQ'; // Western Australia
//tileID = '51LXD'; // Timor Sea 

//tileID = '55KCA';     // Australia, GBR, Mission beach
//tileID = '55KDA';     // Australia, GBR, Howies Reef, Nathan Reefm Otter Reef, King reef
tileID = '54LZQ';   // Australia, Torres Strait, Mer, Bramble Cay
//tileID = '54LYP';   // Australia, Torres Strait, South East
//tileID = '54LYQ';   // Australia Eastern Torres Strait, PNG border (Warrior Reef, Daru)
tileID = '54LZR';   
*/
s2Utils.createSelectSentinel2ImagesApp(tileID, START_DATE, END_DATE, CLOUDY_PIXEL_PERCENTAGE);

