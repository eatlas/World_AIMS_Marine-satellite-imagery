# World Marine satellite imagery

Eric Lawrey – 13 September 2022

Australian Institute of Marine Science

This repository contains scripts for processing Sentinel 2 imagery using the Google Earth 
Engine and the Python scripts for subsequent post processing
of the imagery. 

## What is this dataset

This repository contains all the scripts used to create clear water composite images from Sentinel 2 and
Landsat 8. 

The satellite imagery is processed in the original scenes of the satellites being processed.
For Sentinel 2 this corresponds to 100 x 100 km scenes. For Landsat 8 this corresponds to 
larger scenes.

The image composites were processed into a number of different styles that each
focus on a different task:
- `DeepFalse` - False colour for best for viewing deep reef features (B2, B3, B4)
- `Shallow` - False colour showing shallow (< 3 m) and dry areas (B5, B8, B11).
- `TrueColour` - True colour imagery (B3, B4, B5)
- `Depth5m` - Reef top features down to 5 m depth. No tidal compensation.
- `Depth10m` - Reef top features down to 10 m depth. No tidal compensation.

## Sentinel 2 image processing

The satellite image composites were created using the following processing:
1. The Sentinel 2 tiles to be processed were selected using the 
[map of Sentinel 2 tiles](https://maps.eatlas.org.au/index.html?intro=false&z=7&ll=146.90137,-19.07287&l0=ea_ref%3AWorld_ESA_Sentinel-2-tiling-grid_Poly,google_SATELLITE)
to find the IDs of the locations of interest.
2. The `src\01-gee\sentinel2\01-select-sentinel2-images.js` tool in Google Earth Engine was used
to select the best images (lowest cloud, low sunglint, clear water) from those available. Typically
a low cloud cover filter used (typically starting with 1%) to eliminate unsuitable images. This
threshold was increased if not enough good images could be found.
3. These images were partitioned into two collections: the clearest of the images and the rest of the images.
These were recorded in `src\01-gee\sentinel2\03-create-composite-X.js`, where X corresponds to
the region. In this dataset the tiles were split into regions:
 - `Coral-Sea` - Images of Coral Sea reefs
 - `Coral-Sea-water` - Open water images of the Coral Sea. Used to verify that there are no new
 coral platforms.
 - `Global` - Selected reefal areas around the world to verify the robustness of the
 imaging techinques.
4. These two collections were then converted into two satellite composite images. 
5. Each image was preprocessed, prior to being combined into a composite by:
    1. Removing surface reflectance on the water based on estimates of the reflection using infrared bands.
    2. Clouds masking was applied to cut out the clouds and their shadows.
6. A composite was then created using the available images in each collection. The composite was
created using a median of the images in the collection (i.e. at each location the matching pixel of each
of the images in the collection was located and the final composite value was the median of those pixels).
7. A composite of the images with and without cloud masking was created and layered together. This 
was to solve the problem that some coral cays were misinterpretted as clouds and thus would result in
holes in the composite image. These holes are plugged with an underlying image composite created from
the same set of images, just with no cloud masking applied. Since the composite image were created using
a median reducer, as long as the cays are covered in clouds less than 50% of the time then the resulting
image would be cloud free. This works because the image collections were chosen to have very low cloud cover
and coral cays are bright areas that are much less sensitive to brightness adjustments from the fringes of 
clouds.
8. The brightness of the image was normalised to ensure that the deep water areas of the image were
consistent from one scene to the next. This was done by creating a mask of 'deep water' areas in the image.
The difference between the average brightness of these masked areas and a reference image was calculated. 
This adjustment was then applied to the whole image. This brightness adjustment helps ensure consistent
brighness across all scenes and that when subsequent contrast enhancement is applied to the images then 
no areas of the image become overly dark. Without this adjustment it was found that certain regions
would consistently produce slightly darker imagery. This can be seen in the [original draft version of this dataset](https://eatlas.org.au/data/uuid/2932dc63-9c9b-465f-80bf-09073aacaf1c) where this adjustment was not made.
9. Multiple image styles were then created from the composite image (DeepFalse, TrueColour, Shallow)
based on selecting different bands to highlight various aspects of the imagery. In this process 
contrast enhancement was applied.

More details about the processing can be found in the extensive comments in the `01-gee/sentinel2/s2Utils.js`
script library.

In addition to the imagery, depth contours (5 m and 10 m) were estimated using Satellite Derived Bathymetry. 
The intention of these contours was for the 5 m contour was to develop a more quantitative measure of the
reef top. The GBR features dataset has a matching 'Dry Reefs' dataset that has no documented definition.
Matching these features to bathymetry indicates that they correspond to approximately the 5 m depth
contour and thus don't represent areas that dry out. We therefore use an estimate of the 5 m contour
as a replacement for the 'Dry Reefs' in the Coral Sea. A 10 m contour was also developed to provide
an addtional represention of the 3D structure of the reef.

There was no high resolution bathymetry available for any of the Coral Sea reefs and so the satellite
derived bathymetry was estimated using depth measurements available in other regions. The algorithm
developed used standard green / blue band ratio, which is moderately accurate from 4 - 12 m, however
it is influenced by water colour (no too much of a problem in the Coral Sea due to the clear water), 
and substrate brightness, neither of these factors were fully compensated for in the algorthm.

As such the depth contours should not be considered as high accuracy and may contain depth errors 
up to 5 m.

They parameters needed to calibrate the band ratio depth estimate were based the limited number depth measurements 
in marine charts in Shark Bay in WA for depths between 0 - 15 m. This area was chosen due to its clear
water, gentle slopes (minimising any positional errors), and the extensive seagrass meadows that allowed us
to establish the affect of dark substrates on the depth estimates. The method used is only moderately accurate 
from 4 - 12 m of depth. The algorithm performs better than simply performing the ln(B3), but is still suseptible to 
very dark substrates, such as the thick seagrass meadows seen in Shark bay in WA, particularly in shallow areas. 
These can introduce errors of up to 5 m in depth, as compared with an error of about 8 m by just using the 
B3 channel. This algorithm was found to be less effective at shallow depths (0 - 5 m) and depths greater than 13 m 
and so contours at 5 and 10 m were extracted. 

These bathymetry polygons are raw and do contain false detections due to anomalies in the images such as clouds. 
They are merged together 

## Landsat 8 image processing

A simplier workflow was established for processing Landsat8 imagery. Less research was applied to
optimising the Landsat 8 imagery as its primary purpose was to act as backup imagery for when there
was no good Sentinel 2 images and to provide an independent set of imagery for checking the 
reef boundary mapping.

## s2 composites
Sentinel 2 imagery is organised into regions to limit the number of scenes within one file. These regions are based on 
[Global reef regions](https://github.com/eatlas/World_AIMS_Reef-regions).


## This repository contains: 
1. Google Earth Engine javascript code that generates the satellite image composites and depth contours
and exports them to Google Drive. 
2. Local Python scripts for subsequent optimisation of the image file format,
generation of GDAL virtual layers and merging of the depth contours. 

This repository does not contain the image data itself.

## Folders
`big-files`: This contains all large files in this dataset including all the final satellite
imagery and GIS file to make preview maps. These files are not stored in the repository
as GitHub and particularly Google Earth Engine impose limitations on repository storage.
These files are available for [download and browsing](https://nextcloud.eatlas.org.au/apps/sharealias/a/cs-aims-coral-sea-features-img).

`media`: This contains preview images. These images are kept small to allow this repository
to be uploaded to Google Earth Engine, which only supports small files.

`src\gee`: This corresponds to the Google Earth Engine scripts used for the production
of this imagery in this dataset.

`src\local`: This contains the Python\GDAL script that is run on your local machine to
post process the imagery downloaded from GEE into the `unprocessed-data` folder. This script
optimises the internals of the GeoTiff images (adding internal tiling and overviews) and
creates GDAL virtual rasters to make the images easier to manipulate in QGIS.

`unprocessed-data`: Images generated by GEE should be exported to Google Drive then downloaded
into this folder. The `src\local\01-convert.py` script will then process them into the `big-files\data`
folder. Once the image has been processed they can be deleted from this directory.

## Setup

A low tech approach to getting the code in the GEE editor is simply copying and
pasting the code from GitHub. This approach is only suitable if you want just a few files,
otherwise it is much better to clone the whole repository over. 

### Clone this repository into Google Earth Engine
1. Create an empty repository in GEE using `Scripts\NEW\Repository`. Name the 
repository `World_AIMS_Marine-satellite-imagery`. Technically the names don't need
to match but it could get confusing if the names don't match.

2. On you local machine clone the repository from GitHub. 
```
git clone https://github.com/eatlas/World_AIMS_Marine-satellite-imagery.git
```

3. Change into the newly downloaded empty repository, cloned from GEE. 
```
cd World_AIMS_Marine-satellite-imagery
```

4. Switch the push origin to the GEE repository. Find the path to your empty
GEE repository by hovering over the new repository and select the `Configure` 
button (it looks like a small cog). 
This will show the command to clone the new repository to your local machine. For
```
git clone https://earthengine.googlesource.com/users/<username>/World_AIMS_Marine-satellite-imagery
```
We are interesting in the path to the repository. Add this as the push
origin.
```
git remote set-url origin https://earthengine.googlesource.com/users/<username>World_AIMS_Marine-satellite-imagery
```
5. Push the repository up to GEE.
```
git push 
```
6. Refresh the repositories in GEE. There is a refresh button next to the `NEW` button.
You can now make changes on your local machine and push them up to GEE. If you make changes
on GEE you will need to perform a `git pull`. 

### Pushing code back to GitHub
To push code back to GitHub instead of GEE you can simply use.
```
git push https://github.com/eatlas/World_AIMS_Marine-satellite-imagery.git
```


### Setting up pushing to both GitHub and Google Earth Engine at same time
The following are some of the commands needed to edit this repository locally, but to
be able to push updates to both Google Earth Engine and GitHub.

Part of the required setup is to allow Google Source to have access to your Google Account.
I was prompted for this when I cloned the original git repository from GEE.

These instructions were based on [Working with multiple remote repositories](https://jigarius.com/blog/multiple-git-remote-repositories)

Create a new remote called "all" with the URL of the primary repo. It was unnecessary for me
because this was already set when I cloned from GEE. This might be different when setting up
from GitHub.
```
git remote add all https://earthengine.googlesource.com/users/<username>/World_AIMS_Marine-satellite-imagery
```

Re-register the remote as a push URL. 
```
git remote set-url --add --push all https://earthengine.googlesource.com/users/<username>/World_AIMS_Marine-satellite-imagery
```

Add a push URL to a remote. This means that "git push" will also push to this git URL.
```
git remote set-url --add --push all https://github.com/eatlas/World_AIMS_Marine-satellite-imagery.git
```

Push local changes to both GEE and GitHub. GEE seems to display and use the master branch.
```
git push all master
```
The .git/config file should look similar to the following (except with your Google username).
Note: I initially pushed to the `main` branch, unfortunately the Google Earth Engine seems to
only update from the `master` branch.
```
[remote "origin"]
	url = https://earthengine.googlesource.com/users/<username>/World_AIMS_Marine-satellite-imagery
	fetch = +refs/heads/*:refs/remotes/origin/*
[branch "main"]
	remote = origin
	merge = refs/heads/main
[remote "all"]
	url = https://earthengine.googlesource.com/users/<username>/World_AIMS_Marine-satellite-imagery
	fetch = +refs/heads/*:refs/remotes/all/*
	pushurl = https://github.com/eatlas/World_AIMS_Marine-satellite-imagery.git
	pushurl = https://earthengine.googlesource.com/users/<username>/World_AIMS_Marine-satellite-imagery
[branch "master"]
	remote = origin
	merge = refs/heads/master
```

## Tagging new versions of the library
When there is a new release version of this dataset or the utility libraries (s2Utils.js) then
update the version number in the library, commit this, then add a tag to the repo.
```
git tag -a v1.1 -m "Stable update for CS_AIMS_Coral-Sea-Features_Imagery dataset"
```
To see existing tags:
```
git tag
```
To push this tag to GitHub:
```
git push https://github.com/eatlas/World_AIMS_Marine-satellite-imagery.git <name of tag>
```

To push this to Google Earth Engine, assuming it is set as the origin. Note: I don't think Google Earth Engine 
does anything with the tags.
```
git push origin <name of tag>
```

## Choosing new image tiles
To expand the selection of tiles that have been analysed use the `src\gee\apps\select-sentinel2-images.js`
app to select the best images for area of interest.

To determine the Sentinel 2 tile for the area of interest find the tile ID from [this interactive map](https://maps.eatlas.org.au/index.html?intro=false&z=7&ll=146.90137,-19.07287&l0=ea_ref%3AWorld_ESA_Sentinel-2-tiling-grid_Poly,ea_ea-be%3AWorld_Bright-Earth-e-Atlas-basemap,google_SATELLITE&v0=,,f).