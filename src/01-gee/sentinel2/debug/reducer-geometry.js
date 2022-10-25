// This code investigates whether using a reducer on an image collection
// breaks the image geometry. 
// Conclusion:
// Applying a reducer to an image collection results in an image with its
// geometry get to the whole world. This can impact subsequent processing.
// This apparent bug can be worked around by clipping the output of
// the reducer.

// Here we have chosen three images from the same Sentinel 2 tile.
// These images do not however cover the full extent of the tile area.
// This the resulting composite image will have a geometry that is
// different to each of the images.
var images = [
    ee.Image("COPERNICUS/S2/20180811T001111_20180811T001108_T56KKF"), // Right image
    ee.Image("COPERNICUS/S2/20180829T002049_20180829T002045_T56KKF"), // Left image
    ee.Image("COPERNICUS/S2/20170809T002111_20170809T002107_T56KKF")  // Left image
  ];

var composite_collection = ee.ImageCollection(images);
print("Image geometry");
print(composite_collection.geometry());

// Reduce the collection back to an image. Use the simplest reducer.
// The geometry of the composite should match that of the image in
// the collection.
// Unfortunately it sets the geometry to be the whole world
var composite = composite_collection.reduce(ee.Reducer.mean());
print("Geometry after reduce. Should match image");
print(composite.geometry());

// Work around is to clip the output of the reduce to the
// correct geometry. Note that ee.ImageCollection.geometry
// appears to create a MultiPolygon with the set of the geometry of
// all the images in the collection. We therefore need to dissolve
// simply the shape.
var compositeClipped = composite.clip(composite_collection.geometry().dissolve());
print("Geometry after clipping. Should match image");
print(compositeClipped.geometry());


Map.setCenter(150.6, -17.5, 9);
var vis = {bands: ['B4_mean','B3_mean','B2_mean'], min: 0, max: 1500};
Map.addLayer(composite, vis, 'Sentinel 2 - composite');
Map.addLayer(compositeClipped, vis, 'Sentinel 2 - clipped');
