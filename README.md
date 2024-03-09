# World Marine satellite imagery

Eric Lawrey – 7 March 2024

Australian Institute of Marine Science

## What is this repository

This repository contains both scripts and image data for creating clear water composite images from Sentinel 2 and Landsat 8 for a range of projects. This contains a growing repository of scenes that have image composites created from a manually selected collection of specific image dates. This repository contains scripts and images prepared for multiple projects, based on a common processing code base. Each of these projects typically has a set of images that are created to test various remote sensing algorithms and mapping techniques. This dataset provides the imagery for the subsequent processing in these projects.  

This code base includes:
* Core utility libraries for Google Earth Engine (`src\01-gee\sentinel2\s2Utils.js` and `src\01-gee\landsat8\l8Utils.js`)
* Tool for sequentially previewing images for a scene, with cloud filtering and over a date range. This is typically used manual collation of images to be used in image composites. `\src\01-gee\sentinel2\apps\select-sentinel2-images.js`
* Tool for reviewing a specific set of image, by IDs. This is used checking or manually ranking a small set of preknown images. `\src\01-gee\sentinel2\apps\view-selected-sentinel2-images.js`
* Code and images prepared for various projects (`projects` folder). 

This code base is an extension of the scripts developed for the mapping of the Coral Sea ([Lawrey and Hammerton, 2022](https://doi.org/10.26274/NH77-ZW79)).



The image composites were processed into a number of different styles that each
focus on a different task:
- `DeepFalse` - False colour for best for viewing deep reef features (B2, B3, B4)
- `Shallow` - False colour showing shallow (< 3 m) and dry areas (B5, B8, B11).
- `TrueColour` - True colour imagery (B3, B4, B5)
- `Depth5m` - Reef top features down to 5 m depth. No tidal compensation.
- `Depth10m` - Reef top features down to 10 m depth. No tidal compensation.
- `Raw-B1-B4` - No contrast enhance applied, 16 bit. Optional sunglint correction.

## Sentinel 2 image processing

The following is a general guide to how the satellite image composites were prepared for each project.
1. A subfolder of `projects` is created for each project needing a set of composite images. A Google Earth Engine script, such as `projects\CS_NESP-MaC-2-3_AIMS_Benthic-reflectance\depth-albedo.js` is created to record the images prepared for that project. 
2. The Sentinel 2 tiles to be processed were selected using the 
[map of Sentinel 2 tiles](https://maps.eatlas.org.au/index.html?intro=false&z=7&ll=146.90137,-19.07287&l0=ea_ref%3AWorld_ESA_Sentinel-2-tiling-grid_Poly,google_SATELLITE)
to find the IDs of the locations of interest.
3. The `src\01-gee\sentinel2\app\select-sentinel2-images.js` was modified to specify the scene, cloud cover and date range to review. This tool was used in Google Earth Engine to select the best images (lowest cloud, low sunglint, clear water) from those available. A cloud cover filter typically starting with 1% was used to eliminate unsuitable images. This threshold was increased if not enough good images could be found.
4. In some projects the collection of good images found were partitioned into two collections: the clearest of the images (R1) and the rest of the images (R2). In other projects only a single composite image was create for a given scene.
5. As part of the processing on GEE, each image is preprocessed, prior to being combined into a composite by:
    1. Removing surface reflectance on the water based on estimates of the reflection using infrared bands.
    2. Clouds masking was applied to cut out the clouds and their shadows.
6. The composite is created using a median of the images in the collection (i.e. at each location the matching pixel of each
of the images in the collection was located and the final composite value was the median of those pixels).
7. A composite of the images with and without cloud masking was created and layered together. This was to solve the problem that some coral cays were misinterpretted as clouds and thus would result in holes in the composite image. These holes are plugged with an underlying image composite created from
the same set of images, just with no cloud masking applied. Since the composite image were created using a median reducer, as long as the cays are covered in clouds less than 50% of the time then the resulting image would be cloud free. This works because the image collections were chosen to have very low cloud cover and coral cays are bright areas that are much less sensitive to brightness adjustments from the fringes of 
clouds.
8. The brightness of the image was normalised to ensure that the deep water areas of the image were consistent from one scene to the next. This was done by creating a mask of 'deep water' areas in the image.
The difference between the average brightness of these masked areas and a reference image was calculated. This adjustment was then applied to the whole image. This brightness adjustment helps ensure consistent
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

## Region organisation of imagery
Sentinel 2 imagery is organised into regions to limit the number of scenes within one file. These regions are based on 
[Global reef regions](https://github.com/eatlas/World_AIMS_Reef-regions).


## This repository contains: 
1. Google Earth Engine javascript code that generates the satellite image composites and depth contours
and exports them to Google Drive. 
2. Local Python scripts for subsequent optimisation of the image file format,
generation of GDAL virtual layers and merging of the depth contours. 

This repository does not contain the image data itself. The image data files were too large to include
in the repository however they are available for [downloading and browsing](https://nextcloud.eatlas.org.au/apps/sharealias/a/world-aims-marine-sat-imagery)

To reconstruct this dataset and scripts as was originally prepared these files should be placed in the `big-files` directory.

## Dataset metadata and lineage
More information about this dataset can be found on the 
[Dataset metadata page](https://eatlas.org.au/data/uuid/5d67aa4d-a983-45d0-8cc1-187596fa9c0c).


## Folders
`big-files`: This contains all large files in this dataset including all the final satellite
imagery and GIS file to make preview maps. These files are not stored in the repository
as GitHub and particularly Google Earth Engine impose limitations on repository storage.
These files are available for [download and browsing](https://nextcloud.eatlas.org.au/apps/sharealias/a/cs-aims-coral-sea-features-img).

`media`: This contains preview images. These images are kept small to allow this repository
to be uploaded to Google Earth Engine, which only supports small files.

`src\01-gee`: This corresponds to the Google Earth Engine scripts used for the production
of this imagery in this dataset.

`src\01-local`: This contains the Python\GDAL script that is run on your local machine to
post process the imagery downloaded from GEE into the `unprocessed-data` folder. This script
optimises the internals of the GeoTiff images (adding internal tiling and overviews) and
creates GDAL virtual rasters to make the images easier to manipulate in QGIS.

`unprocessed-data`: Images generated by GEE should be exported to Google Drive then downloaded
into this folder. The `src\local\01-convert.py` script will then process them into the `big-files\data`
folder. Once the image has been processed they can be deleted from this directory.

## Reproducing this dataset

This repository is intended to allow others to reproduce and extend this
dataset. 

## Setup and installation
This dataset is created using the Google Earth Engine followed by some
file format adjustments using a Python scripts to process the imagery using
GDAL tools. For the depth contours the Python script uses OGR2OGR to 
merge all the polygons from each image tile into single shapefiles for
each region (Coral Sea, Global)

To reproduce this dataset from scratch you will need:
 - [Google Earth Engine account](https://earthengine.google.com/)
 - Python and GDAL installed. On Windows [OSGeo4W](https://www.osgeo.org/projects/osgeo4w/) 
 can be used to install both QGIS and GDAL. If you have troubles with OSGeo4W you can install
 GDAL via Anaconda)
 - Git - For copying code from GitHub into Google Earth Engine
 - Google Drive with >30 GB of space for exporting the imagery from Google Earth Engine.

On Windows this can be done using OSGeo4W or Anaconda.
 
### OSGeo4W
I have used OSGeo4W for many years to install both QGIS and GDAL.
1. Download and install OSGeo4W making sure GDAL gets installed (https://www.osgeo.org/projects/osgeo4w/)
2. Start the OSGeo4W cmd window. The default path for this is C:\OSGeo4W64\OSGeo4W.bat
3. Test that GDAL installed OK by running: `gdalinfo --version`
   You should get something like: GDAL 3.4.1, released 2021/12/27
4. `cd <directory to this script (convert.py)>`
5. `python convert.py`

If you have trouble with GDAL from OSGeo4W (which sometime happens) you can install GDAL
via Anaconda.

### Anaconda - GDAL only
1. Download and install Anaconda from (https://www.anaconda.com/products/individual). 
2. Start the Anaconda Navigator / CMD.exe 
3. Run `conda install -c conda-forge gdal`
4. Test that GDAL installed OK by running: `gdalinfo --version`
   You should get something like: GDAL 3.0.2, released 2019/10/28
5. `cd <directory to this script (convert.py)>`
6. `python convert.py`
 

### Google Earth Engine Setup

The most reliable way of getting the code into Google Earth is using Git to pull the 
code from GitHub then push it into Google Earth Engine. This is described in detail 
below. You can however also simply manually copy the files from `src\01-gee` into
a session on Google Earth Engine to run them.

Once you have a copy of the code in Google Earth Engine you need to adjust the 
path to the `s2Utils.js` and `l8utils.js` in each of the scripts to match
your username and repository name. Each of the main processing scripts
uses an associated library file, one for Sentinel 2 processing and one for Landsat8
processing. This library is imported as the first line in each of the scripts.
Unfortunately Google Earth Engine does not support relative paths for these
imports and so they are absolute paths. As a result when you copy the code
into your repository these paths will not work.

In the sentinel 2 scripts this line will look something like:
```
var s2Utils = require('users/ericlawrey/World_AIMS_Marine-sat-imagery:src/01-gee/sentinel2/s2Utils.js');
```
If your Google Earth Engine username is `janesmith` and the repository that you copied
the code into is called `Coral-sea-imagery` then the above code should be changed to:
```
var s2Utils = require('users/janesmith/Coral-sea-imagery:src/01-gee/sentinel2/s2Utils.js');
```


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

### Pull from Google Earth Engine to local
If you have made code changes in Google Earth Engine and would like to bring them back into
your local copy, so you can push back into GitHub then use:
```
git pull
```
This is assuming that you set the Google Earth Engine as the origin for the repository.
(See step 4 in Clone this repository into Google Earth Engine)

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

## Google Source Crediential Renewal

If you haven't used Google Earth Engine for a while connecting to the source with `git pull` might fail as the authentication might fail.

```
remote: INVALID_ARGUMENT: Request contains an invalid argument
remote: [type.googleapis.com/google.rpc.LocalizedMessage]
remote: locale: "en-US"
remote: message: "Invalid authentication credentials. Please generate a new identifier: https://earthengine.googlesource.com/new-password"
```
In this case follow the link in the error message to update the authentication.

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
To expand the selection of tiles that have been analysed use the `src/01-gee/sentinel2/apps/select-sentinel2-images.js`
app to select the best images for area of interest.

To determine the Sentinel 2 tile for the area of interest find the tile ID from [this interactive map](https://maps.eatlas.org.au/index.html?intro=false&z=7&ll=146.90137,-19.07287&l0=ea_ref%3AWorld_ESA_Sentinel-2-tiling-grid_Poly,ea_ea-be%3AWorld_Bright-Earth-e-Atlas-basemap,google_SATELLITE&v0=,,f).

## Exporting many images from Google Earth Engine
The `src/01-gee/sentinel2/s2-composites/XXX.js` scripts generate many run tasks to perform the export of each
image. Manually clicking the `Run` button can be quite tedious. Ideally the code could have been
rewritten into Python to automate this process. (Maybe next time). 

You can automate the clicking of the `Run` button with Javascript pasted
into the Webbrowser console, noting that this automated attempts to open all the
export task dialogs at once and so might crash your browser. If this happens try processing
in smaller batches.
https://gis.stackexchange.com/questions/290771/batch-task-execution-in-google-earth-engine

1. Run the `src/01-gee/sentinel2/s2-composites/XXX.js` script and wait for all the tasks to be generated, waiting
for your input to trigger them.
2. Open your browser Web Developer Tools (usually Ctrl+Shift+I) and go to the Console. Paste the 
following Javascript. This setups the functions for triggering run and confirm buttons in the 
browser.

``` Javascript
/**
 * Copyright (c) 2017 Dongdong Kong. All rights reserved.
 * This work is licensed under the terms of the MIT license.  
 * For a copy, see <https://opensource.org/licenses/MIT>.
 *
 * Batch execute GEE Export task
 *
 * First of all, You need to generate export tasks. And run button was shown.
 *   
 * Then press F12 get into console, then paste those scripts in it, and press 
 * enter. All the task will be start automatically. 
 * (Firefox and Chrome are supported. Other Browsers I didn't test.)
 * 
 * @Author: 
 *  Dongdong Kong, 28 Aug' 2017, Sun Yat-sen University
 *  yzq.yang, 17 Sep' 2021
 */
function runTaskList(){
    // var tasklist = document.getElementsByClassName('task local type-EXPORT_IMAGE awaiting-user-config');
    // for (var i = 0; i < tasklist.length; i++)
    //         tasklist[i].getElementsByClassName('run-button')[0].click();
    $$('.run-button' ,$$('ee-task-pane')[0].shadowRoot).forEach(function(e) {
         e.click();
    })
}

function confirmAll() {
    // var ok = document.getElementsByClassName('goog-buttonset-default goog-buttonset-action');
    // for (var i = 0; i < ok.length; i++)
    //     ok[i].click();
    $$('ee-table-config-dialog, ee-image-config-dialog').forEach(function(e) {
         var eeDialog = $$('ee-dialog', e.shadowRoot)[0]
         var paperDialog = $$('paper-dialog', eeDialog.shadowRoot)[0]
         $$('.ok-button', paperDialog)[0].click()
    })
}
```
Paste the above functions, then paste runTaskList(), then paste confirmAll().
Run this line then wait until all tasks popups have been created. This might take a few minutes
as there maybe potentially hundreds of dialogue being rendered. If this process crashes your
browser then you will need to reduce the number of exports being performed in one batch. See
the section below.
``` Javascript
runTaskList();
```

Once all the dialogue boxes have appeared then run this command to confirm all of them.
``` Javascript
confirmAll();

# References
Lawrey, E., & Hammerton, M. (2022). Coral Sea features satellite imagery and raw depth contours (Sentinel 2 and Landsat 8) 2015 – 2021 (AIMS) [Data set]. eAtlas. https://doi.org/10.26274/NH77-ZW79