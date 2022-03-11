// This script aims to trial a basic satellite derived bathymetry (SDB). My goal was to trial its
// viability for improving the slope estimations, with the goal of:
// 1. Having something that will work well at depth.
// 2. Be insensitive to substrate darkness.

// The tuning of the SDB is only approximate. My make goal was that is the depth monotonically
// decreasing with depth? Are there strange anomalies? How well does the algorithm deal with
// substrate variation?

// Conclusion: Satellite derived bathymetry is poor for our intended application. SDB using the
// blue and green channel appears to only be effective to approximately 10 m. After that there
// are strange inversions of depth, where 'shallow regions' appear deeper than 'deeper' regions.
// It took me a while to find a scene where it worked well enough to realise that it was not
// entirely broken. Essentially it is useless for reef mapping due to its depth limitation.
// It did however appear to be relatively insensitive to sea grass substrate, provided it was
// in shallow water. This appears to simply be a quirk because seagrass is green and that
// the dark seagrass appears light in green.
// Switch to the ratio of B2 / B1 the depth coverage of the SDB was much greater, appearing
// to cover approximately 30 - 40 m of depth. Unfortunately due to the low resolution of 
// B1 the depth estimate is very blurry and has lots of anomalies introduced by trying to
// down sample the B2 channel to a similar resolution to B1. Additionally B1 is significantly
// affected by water clarity making it not very robust. The main problem with using it as
// a product is that dark substrates seem to be exaggerated, i.e. the depth is highly
// affected by substrate brightness. As such is it no better than simply using a scaled brightness
// of a single channel such as the blue channel.
 
 //Saumarez Reefs (South) (Coral Sea) - South 
 // This atoll has a flat platform at 30 - 40 m. The B3B2 SDB is terrible.
 //var img = ee.Image("COPERNICUS/S2/20170729T000219_20170729T000217_T56KNA");   
 
 // var img = ee.Image("COPERNICUS/S2/20170608T231141_20170608T231144_T58KFC"); //New Caledonia, Ouvea 
  
  //Australia, GBR, Hardy Reef, Block Reef
  //var img = ee.Image("COPERNICUS/S2/20170814T002109_20170814T002103_T55KGU"); 
  
  // North West Shelf, Australia, Timor Sea, Big Bank Shoals
  //var img = ee.Image("COPERNICUS/S2/20180705T015621_20180705T015939_T51LZJ");
  
  // Western Australia, Shark bay
  var img = ee.Image("COPERNICUS/S2/20151001T024446_20151001T024444_T49JGM");
    
    var scaled_img = img.divide(1e4);
    //var B3contrast = scaled_img.select('B3');
    //var B2contrast = scaled_img.select('B2');
    // https://doi.org/10.5194/isprs-archives-XLII-4-W5-159-2017
    var B3contrast = scaled_img.select('B3');
    var B2contrast = scaled_img.select('B2');

    var nB3B2 = 0.01;
    var m1B3B2 = 10;
    var m0B3B2 = 0.90;
    var depthB3B2 = B2contrast.multiply(nB3B2).log().divide(B3contrast.multiply(nB3B2).log()).subtract(m0B3B2).multiply(m1B3B2); 
    var depthB3B2scaled = depthB3B2.multiply(40).subtract(40);
    
    
    // With an offset applied to the images prior to log transformation
    var nB3B2 = 0.01;
    var m1B3B2 = 10;
    var m0B3B2 = 0.90;
    var oB2 = 0.00;
    var oB3 = 0.01;
    var depthB3B2offset = B2contrast.subtract(oB2).multiply(nB3B2).log().divide(B3contrast.subtract(oB3).multiply(nB3B2).log()).subtract(m0B3B2).multiply(m1B3B2); 
    var depthB3B2offsetscaled = depthB3B2offset.multiply(30).subtract(20);
    

    var filteredB2 = B2contrast.focal_median(
      {kernel: ee.Kernel.circle({radius: 60, units: 'meters'}), iterations: 2}
    );
    var B1contrast = scaled_img.select('B1');

    var nB2B1 = 0.01;
    var m1B2B1 = 17;
    var m0B2B1 = 0.95;
    var depthB2B1 = B1contrast.multiply(nB2B1).log().divide(filteredB2.multiply(nB2B1).log()).subtract(m0B2B1).multiply(m1B2B1); 
    var depthB2B1scaled = depthB2B1.multiply(40).subtract(40);
    

// Zoom to our tile of interest.
Map.centerObject(scaled_img.geometry(), 10);

//Map.addLayer(depthB3B2scaled, {min: -50, max: 0}, 'Sentinel 2 - SDB - B3B2');
Map.addLayer(depthB3B2offsetscaled, {min: -30, max:0}, 'Sentinel 2 - SDB - B3B2');
//Map.addLayer(depthB2B1scaled, {min: -50, max: 0}, 'Sentinel 2 - SDB - B2B1');
//Map.addLayer(scaled_img, {bands:['B4','B3','B2'], min: [0.02, 0.04, 0.08], max: 0.2, gamma: 2}, 'Sentinel 2 - Image');

//Map.addLayer(scaled_img, {bands:['B2'], min: [0.08], max: 0.2, gamma: 2}, 'Sentinel 2 - Image');