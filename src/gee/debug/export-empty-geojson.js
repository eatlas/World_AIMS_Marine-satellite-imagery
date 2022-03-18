

  // Convert the image to vectors.
  var vector = imgContour.reduceToVectors({
    geometry: geometry,
    crs: imgContour.projection(),
    scale: scale,
    geometryType: 'polygon',
    eightConnected: false,
    labelProperty: 'DIN',
    maxPixels: 3e8
  });
  
  if (is_display) {
    // Make a display image for the vectors, add it to the map.
    var display = ee.Image(0).updateMask(0).paint(vector, '000000', 2);
    Map.addLayer(display, {palette: '000000'}, layerName, false);
  }
  if (is_export) {
    // Export the FeatureCollection to a KML file.
    Export.table.toDrive({
      collection: vector,
      description: fileName,
      folder:exportFolder,
      fileNamePrefix: fileName,
      fileFormat: 'GeoJSON'
    });