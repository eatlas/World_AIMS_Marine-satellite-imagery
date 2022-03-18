
// This script test the behaviour of converting an image to vector when there is nothing
// to digitise. I have found that when export as Shapefile the Task fails indicating that
// it can't export an empty set to Shapefile. I am see that with GeoJSON format I am getting
// broken files made that consist of just two brackets "]}". This debug script is to test
// if this problem is caused by exporting empty vectors.

// This script needs to be run, then the Task needs to be run to generate the output which
// is saved to Google Drive. The execution can take a few minutes as it needs to be scheduled
// in to the GEE task pool.

// You then need to check in Google Drive for the resulting generated file.

// Get a real image to ensure the geopatial coordinates are valid
var img = ee.Image("COPERNICUS/S2/20200909T005709_20200909T005710_T54LXP");
// Make sure there is nothing to generate a vector from, and simplify to a single band.
var emptyImg = img.multiply(0).select('B2');

// Need to set the image mask, otherwise it generates a polygon of the image extents.
// Convert the image to vectors.
var vector = emptyImg.reduceToVectors({
  crs: emptyImg.projection(),
  scale: 100,
  geometryType: 'polygon',
  eightConnected: false,
  labelProperty: 'DIN',
  maxPixels: 3e8
});

// Export the FeatureCollection to a KML file.
Export.table.toDrive({
  collection: vector,
  description: 'World_AIMS_Marine-sat-imagery_Debug_empty-poly',
  folder: 'World_AIMS_Marine-sat-imagery/debug',
  fileNamePrefix: 'World_AIMS_Marine-sat-imagery_Debug_empty-poly',
  fileFormat: 'GeoJSON'
});