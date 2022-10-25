// This script is to help understand how we can save the UTM
// projection information from Sentinel 2 images in the final
// composite image, so we can restore the projection back.

// Conclusion: Using the image.set() and image.get() methods work
// but the image objects are immutable and so the result of a
// set needs to be saved. i.e.
// image.set('my-property','hello');    // Doesn't work
// image = image.set('my-property','hello'); // Does work
// Another problem is that any manipulations of an image
// seems to destroy any custom properties. i.e. the image
// manipulations do not copy over the properties and thus
// they are very fragile.


// Let's try a single image
var image = ee.Image("COPERNICUS/S2/20180811T001111_20180811T001108_T56KKF");
var projection = image.select('B1').projection();

// Try adding a simple property to the image using set
image = image.set('My_property','test');
print(image);
print(image.get('My_property'));   // Success: Returns test

// Try changing an existing property of an image
// This fails because image objects are immutable and must be
// saved to a new object inorder for the set to have an affect.
image.set('SENSING_ORBIT_NUMBER',1000);    // Set doesn't do anything
print(image.get('SENSING_ORBIT_NUMBER'));  // Returns 73 (property is read only)


var newImage = ee.Image(image.setMulti({'test':'test'}));
print(newImage.get('test'));    // Returns 'test'

// Can I save the projection
newImage = ee.Image(image.setMulti({'projection':projection}));
print(newImage.get('projection'));  // Success: Prints the projection object

// Can I save the projection using the set method
newImage = image.set('projection-set', projection);
print(newImage.get('projection-set'));  // Success: Prints the projection object

print('==== With composite image ====');
var images = [
    ee.Image("COPERNICUS/S2/20180811T001111_20180811T001108_T56KKF"), // Right image
    ee.Image("COPERNICUS/S2/20180829T002049_20180829T002045_T56KKF"), // Left image
    ee.Image("COPERNICUS/S2/20170809T002111_20170809T002107_T56KKF")  // Left image
  ];

var composite_collection = ee.ImageCollection(images);

// When I attempted to print the projection of the whole image GEE warns
// that not all the layers in the image contain the same projection and
// that a select was needed. I reviewed the projection of the layers by
// printing out the image and found that all layers were the same projection
// an so I assume that the error response from GEE is wrong.
var projection = composite_collection.first().select('B1').projection();
print("Projection of images");
print(projection);   // EPSG:32756

var composite = composite_collection.reduce(ee.Reducer.mean());

// Try adding a simple property to the image using set
var composite2 = composite.set('My_property','test');
print(composite2);
print(composite2.get('My_property'));   // Success: Returns test

// Are the images mutable?
composite.set('test','test');
print("Are images mutable objects? - No");
print(composite.get('test'));   // No. Returns null.

// Do manipulations on images affect the image properties.
print("Do manipulations on images affect the image properties? - Yes")
var composite3 = composite2.multiply(2);
print(composite3.get('My_property'));   // Fail: Returns null