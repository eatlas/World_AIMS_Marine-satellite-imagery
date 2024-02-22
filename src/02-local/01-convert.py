# Copyright 2021 Eric Lawrey - Australian Institute of Marine Science
#
# MIT License https://mit-license.org/
# This script converts the Geotiff images generated by the Google Earth Engine (GEE) into a
# format for publication to the web. 
# Files downloaded from GEE should be saved in unprocessed-data.
# This script also generates virtual rasters for each region and style combination so that
# all the images in each category can be loaded and manipulated in QGIS as mosaics.
# 
# Script environment - Windows
# To run this Python script you will need GDAL installed and available in the same
# environment as this script.

# To run the script with a different project name and paths, you would use a command like
# python 01-convert.py --project new_project_name --src_path /path/to/unprocessed-data/{PROJECT} --out_base /path/to/big-files/{PROJECT}
# To see the help message explaining how to use these command-line options, you can run:
# python 01-convert.py --help

import argparse
import os
import subprocess
import glob
from PIL import Image
import math

# Here we assume that the directory structure is that the SRC_PATH points to
# the images downloaded from GEE organised into folders corresponding to
# regions.
# SRC_PATH
#     - CoralSea
#       - *.tif
#     - Western-Australia
#       - *.tif
# OUT_BASE
#     - lossless
#       - Coral-Sea
#         - S2_R1_DeepFalse
#           - *.tif
#     - preview
#       - Coral-Sea
#         - S2_R1_DeepFalse
#           - *.tif
#       ...


# Initialize parser
parser = argparse.ArgumentParser(description='Convert Geotiff images for web publication.')

# Adding arguments
parser.add_argument('--project', default='marb', 
    help='Project name, used in directory paths.')
parser.add_argument('--src_path', default='../../unprocessed-data/{PROJECT}',  
    help='Source path where images from GEE are stored.')
parser.add_argument('--out_base', default='../../big-files/{PROJECT}', 
    help='Base path for processed files.')
parser.add_argument('--make_lossless', action='store_true', default=False, 
    help='Generate lossless GeoTiff format.')
parser.add_argument('--make_lossy', action='store_true', default=False, 
    help='Generate lossy version of dataset.')
parser.add_argument('--make_preview', action='store_true', default=False, 
    help='Generate JPEG preview images.')
parser.add_argument('--make_geopng', action='store_true', default=False, 
    help='Generate quartered PNG images for iPad.')
parser.add_argument('--make_virtual', action='store_true', default=False, 
    help='Generate virtual raster for QGIS.')

# Parse arguments
args = parser.parse_args()

# Use args to set variables
PROJECT = args.project
SRC_PATH = args.src_path.format(PROJECT=PROJECT)
OUT_BASE = args.out_base.format(PROJECT=PROJECT)
MAKE_LOSSLESS = args.make_lossless
MAKE_LOSSY = args.make_lossy
MAKE_PREVIEW = args.make_preview
MAKE_GEOPNG = args.make_geopng
MAKE_VIRTUAL = args.make_virtual

# Check if no processing options are selected
if not (MAKE_LOSSLESS or MAKE_LOSSY or MAKE_PREVIEW or MAKE_GEOPNG or MAKE_VIRTUAL):
    parser.error('No processing options selected. At least one of --make_lossless, --make_lossy, --make_preview, --make_geopng, or --make_virtual must be true.')

# All files associated with a project are grouped into a subfolder. Should be short.
#PROJECT = 'marb'

#SRC_PATH = f'../../unprocessed-data/{PROJECT}'

# Base path for the files to be processed
#OUT_BASE = f'../../big-files/{PROJECT}'


#MAKE_LOSSLESS = True # Lossless GeoTiff format with overviews and tiling
#MAKE_LOSSY = False   # Lossy version of dataset (This is not used because we found that
                     # the chroma compression in JPEG was unsuitable for digitisation, and
                     # the masking of the borders didn't work correctly).
#MAKE_PREVIEW = True  # JPEG preview image, suitable for browsing on the web`
#MAKE_GEOPNG = False  # Quartered PNG images with worldfiles for viewing on iPad
#MAKE_VIRTUAL = True  # Virtual raster (GDAL) that makes all the lossless images appear
                     # as a single image mosaic when loaded into QGIS.


OUT_LOSSLESS = f'{OUT_BASE}/lossless/' # Lossless original data (with minor fix ups)
OUT_LOSSY = f'{OUT_BASE}/lossy' # Compressed version of the data suitable for sharing 
OUT_GEOPNG = f'{OUT_BASE}/geopng'
OUT_PREVIEW = f'{OUT_BASE}/preview' # Path for preview images



# List of all the styles to potentially process. Images will be sorted
# into directories matching these style names.
# We use a predefined list of Satellite, quality and style combinations
# to limit the amount of parsing that is needed in this script.
styles = [
    'S2_R1_DeepMarine','S2_R2_DeepMarine','L8_R1_DeepMarine','L8_R2_DeepMarine',
    'S2_R1_DeepFalse', 'S2_R2_DeepFalse','S2_LT1_DeepFalse', 'L8_R1_DeepFalse', 'L8_R2_DeepFalse',
    'S2_R1_ReefTop', 'S2_R2_ReefTop', 'S2_LT1_ReefTop', 'L8_R1_ReefTop', 'L8_R2_ReefTop',
    'S2_R1_Shallow', 'S2_R2_Shallow', 'S2_LT1_Shallow', 'L8_R1_Shallow', 'L8_R2_Shallow',
    'S2_R1_TrueColour', 'S2_R2_TrueColour', 'S2_LT1_TrueColour', 'L8_R1_TrueColour', 'L8_R2_TrueColour',
    'S2_R1_Slope', 'S2_R2_Slope', 'S2_LT1_Slope', 'L8_R1_Slope', 'L8_R2_Slope',
    'S2_R1_Infrared', 'S2_R2_Infrared', 'S2_LT1_Infrared'
    ]

# =======================================
# MAKE_LOSSY configuration
# The aim of this version of the dataset was to create a more compressed version of the
# dataset that could be more easily shared. For this I tried to create GeoTiffs with internal
# JPG compression, combined with an internal mask. I found that this format did not work
# reliable across different GIS applications, in particular the masking in the images seemed
# to often be based on applying a nodata value to the JPEG imagery, even though a separate
# mask channel was specified. Using the nodata value on the JPEG imagery results in noisy black
# borders due to the noise introduced by the lossy compression.
# An additional problem that the lossy compression introduces is that it down samples the colour
# resolution to half the original image, even if little compression is applied. I presume that
# it is using 4:2:2 chroma subsampling. This makes observing very small features like coral
# substrate, in which the texture is only a couple of pixels, far worse.
# As a result the LOSSY compression was not used. It is included here mainly as a basis
# for future applications to document where I got to in this dataset.

# Command line calls for each image type
# -mask 1        Copy the binary mask from channel 1 (red?). This works because the nodata value in the image
#                is 0 and thus all values above 0 get set to 1 in the mask.
# -co TILED=YES  Tile the data into 256x256 blocks instead of pixels rows. Makes extraction of data in the 
#                middle of the image faster.
# -co JPEG_QUALITY=94 Use low JPEG compression. This compression level was chosen so that there would 
#                be minimal visual loss even when zooming in at 200% zoom. This is important as many key features
#                in the image (coral textures, beach rock) are on a couple of pixels in size. 
# -co COMPRESS=JPEG Set the compression type to JPEG
# -co PHOTOMETRIC=YCBCR Transform the colour space from RGB to YCBCR. This improves the JPEG compression
#                efficiency by ~2x.
# --config GDAL_TIFF_INTERNAL_MASK YES Create an internal mask layer. The important bit here is that this
#                mask is not JPEG compressed so has a crisp boundary.
JPG = 'gdal_translate -mask 1 -co TILED=YES -co JPEG_QUALITY=94 -co COMPRESS=JPEG -co PHOTOMETRIC=YCBCR --config GDAL_TIFF_INTERNAL_MASK YES '

# -co "COMPRESS=LZW" Use lossless compression
# -co "TILED=YES"    Tile the data into blocks (see above)
# -a_nodata 0        Set the nodata value to be 0 so black values become transparent. As part of the GEE
#                    image preparation the brightness intensity of the imagery was scaled to be 1-255 to
#                    ensure there was no overlap between the nodata and the imagery, at the expense that
#                    the imagery doesn't represent true black (0).
LZW = 'gdal_translate -co "COMPRESS=LZW" -co "TILED=YES" -a_nodata 0 '

# Which format to use for each style. Must match the styles array. 
# Not all styles lend themselves to lossy conversion. This table
# indicates if lossy conversion should be used.
processing = [
    JPG, JPG, JPG, JPG,    # DeepMarine
    JPG, JPG, JPG, JPG,    # DeepFalse
    LZW, LZW, LZW, LZW,    # ReefTop
    JPG, JPG, JPG, JPG,    # Shallow
    JPG, JPG, JPG, JPG,    # TrueColour
    LZW, LZW, LZW, LZW    # Slope
    ]

# JPEG compressed preview image intended for quickly browsing through the imagery in an image gallery.
# --config GDAL_PAM_ENABLED NO    Disable the creation of the aux.xml files so the preview folders aren't cluttered.
# -outsize 50% 50%                Reduce the size of the imagery to 50% (about 5500 pixels) for smaller file sizes
# -r average                      Use averaging in the resizing to remove aliasing.
# -co QUALITY=80                  Improve the image quality slightly above the default of 75.
# -co EXIF_THUMBNAIL=YES          Embed a 128x128 pixel thumbnail. Might make browsing the previews faster?
PREVIEW = 'gdal_translate -of JPEG -r average -outsize 50% 50% --config GDAL_PAM_ENABLED NO -co QUALITY=80 -co EXIF_THUMBNAIL=YES '


    
# While QGIS can render the JPG compressed GeoTiff correctly they don't work properly
# with the GDAL virtual layers. The compressed JPGs also cause issues with GeoServer
# ImageMosaics, however this can be overcome by creating a footprints.properties file
# with footprint_source=raster in it, along with setting the Footprint Behaviour in
# the GeoServer layer settings to "Transparent".
# The problem with the GeoTiff/JPG format is that even though we create an embed a 
# separate image mask in the GeoTiff, GDAL virtual rasters ignores this mask during
# the image overlapping process and simply uses the no-data value, which is noisy
# due to the JPEG compression. This results in distracting messy black lines between
# the image tiles.
# Due to these limitations of the JPG GeoTiff format we must distribute the lossless
# version of the imagery (for processing in QGIS) and lossy (JPG) for hosting on the
# eAtlas GeoServer (this will reduce the storage requirements.

# Iterate through the regions in the SRC_PATH
# Use slash on the end to only pick up directories.
srcRegionDirs = glob.glob(os.path.join(SRC_PATH,"*/"))
regionCount = 1
numRegions = len(srcRegionDirs)
for srcRegionDir in srcRegionDirs:
    # Get the name of the region so that we can include it in the output paths
    # The path being processed is something like: 
    # ../../unprocessed-data\CoralSea\
    # dirname strips off the last slash and basename extracts 'Coral-Sea'
    region = os.path.basename(os.path.dirname(srcRegionDir))
    print('=== Processing region '+region+' ('+str(regionCount)+' of '+str(numRegions)+') ===')
    regionCount = regionCount+1
    
    

    # Search through all the files to be processed, downloaded from Google Earth Engine
    # We don't permanently retain these files because they are large. We should therefore
    # consider the files in the SRC_PATH to be a temporary holding area.
    # Get the files in the subsubdirectories such as Global/S2_R1_DeepFalse/*.tif and 
    # just in subdirectories Global/*.tif
    srcFiles = glob.glob(os.path.join(srcRegionDir,"**/*.tif")) + glob.glob(os.path.join(srcRegionDir,"*.tif"))

    
    # Make sure we are dealing with a directory containing images. If not
    # then there is a directory in the SRC_PATH not corresponding to the
    # expected structure.
    if not (os.path.isdir(srcRegionDir) and (len(srcFiles) > 0)):
        print('Skipping region '+srcRegionDir)
        continue

    fileCount = 1
    numFiles = len(srcFiles)
    for srcFile in srcFiles:
        print("Processing "+str(fileCount)+" of "+str(numFiles)+" files")
        fileCount = fileCount+1
        # Extract the filename from the path so we can create the destination path
        fileName = os.path.basename(srcFile)
        
        # Extract the image style from the file name
        # Examples: 
        # CS_AIMS_Coral-Sea-Features_Img_S2_R1_DeepMarine_55KFA.tif
        # CS_AIMS_Coral-Sea-Features_Img_S2_R2_DeepMarine_55KFA.tif
        # CS_AIMS_Coral-Sea-Features_Img_S2_R1_ReefTop_55KHA.tif
        # In these examples we want 'S2_R1_DeepMarine', 'S2_R2_DeepMarine', 'S2_R1_ReefTop' 
        # Extract this to put each image style in a different directory.
        # Assume that the naming convention is as in the example.
        imgStyle = 'Unknown'
        styleIndex = 1
        for style in styles:
            if(style in fileName):
                imgStyle = style
                break
            styleIndex = styleIndex + 1        # Keep track so we can determine the appropriate 
                                            # processing
        if imgStyle == 'Unknown':
            raise AssertionError('image contains unknown style: '+srcFile)
        
        # Handle shorting of the names (this was to reduce file path lengths).
        # This is only a temporary hack so we don't have to regenerate and download all the imagery
        # from GEE. After the transistion this code is deprecated, but should affect the result.
        # Rename the files
        outFileName = fileName.replace("_Imagery_","_Img_")
        
        if MAKE_LOSSLESS:
            # ------------- Lossless ----------------
            # Generate the lossless version of the data. This can be used for subsequent reprocessing,
            # but is large 200 - 300 MB per image.
            
            # Create an output directory for the region and style if it doesn't already exists
            outStylePath = os.path.join(OUT_LOSSLESS, region, imgStyle)
            #print("Out raw path: "+outStylePath)
            if not os.path.exists(outStylePath):
                os.makedirs(outStylePath)
                print(f'Making output directory: {outStylePath}')
            
            # Temp hack to rename old generated files
            #origDest = os.path.join(outStylePath, fileName)
            #newDest = os.path.join(outStylePath, outFileName)
            
            dest = os.path.join(outStylePath, outFileName)
            #print("Dest: "+str(os.path.isfile(dest))+" "+dest)
            # Test if the destination file already exists. If so skip over the conversion.
            # Note: This returns false when the path is over 240 characters (not sure why it isn't 260).
            if os.path.isfile(dest): 
                print("Skipping "+fileName+" as output already exists "+dest)
            else:
                callStr = LZW+srcFile+' '+dest
                print("Lossless system call: "+callStr)
                subprocess.call(callStr)
                subprocess.call('gdaladdo -r average '+dest)

                #os.rename(origDest,newDest)
        if MAKE_LOSSY:
            # ------------- Compressed output ----------------
            # Generate the lossy version of the data suitable for public delivery.
            # This compresses large images using JPG compression shrinking them to 40 - 50 MB each
            
            # Get the GDAL processing for the style. Some images have LZW and some are JPG compressed.
            gdalProcessing = processing[styleIndex]
            
            # Create an output directory for the region and style if it doesn't already exists
            outStylePath = os.path.join(OUT_LOSSY, region, imgStyle)
            # print("Out public path: "+outStylePath)
            if not os.path.exists(outStylePath):
                os.makedirs(outStylePath)
                print(f'Making output directory: {outStylePath}')

            dest = os.path.join(outStylePath, outFileName)
            # Test if the destination file already exists. If so skip over the conversion.
            if os.path.isfile(dest): 
                print("Skipping "+fileName+" as output already exists "+dest)
            else:
                callStr = gdalProcessing+srcFile+' '+dest
                print("Lossy system call: "+callStr)
                subprocess.call(callStr)
                subprocess.call('gdaladdo -r average '+dest)
        
        if MAKE_PREVIEW:
            # ------------- Preview images ----------------
            # Generate JPEG preview images.
            
            # Create an output directory for the region and style if it doesn't already exists
            outStylePath = os.path.join(OUT_PREVIEW, region, imgStyle)
            #print("Out preview path: "+outStylePath)
            if not os.path.exists(outStylePath):
                os.makedirs(outStylePath)
            
            # Replace the .tif with .jpg in the filename
            dest = os.path.join(outStylePath, outFileName.replace(".tif",".jpg"))
            #print("Dest: "+str(os.path.isfile(dest))+" "+dest)
            # Test if the destination file already exists. If so skip over the conversion.
            if os.path.isfile(dest): 
                print("Skipping "+fileName+" as output already exists "+dest)
            else:
                callStr = PREVIEW+srcFile+' '+dest
                print("Preview system call: "+callStr)
                subprocess.call(callStr)
                
        if MAKE_GEOPNG:
            # ------------- Preview images ----------------
            # Generate JPEG preview images.
            
            # Create an output directory for the region and style if it doesn't already exists
            outStylePath = os.path.join(OUT_GEOPNG, region, imgStyle)
            #print("Out preview path: "+outStylePath)
            if not os.path.exists(outStylePath):
                os.makedirs(outStylePath)
            
            # Replace the .tif with .jpg in the filename
            dest = os.path.join(outStylePath, outFileName.replace(".tif",".png"))


            # Get the image size so we can cut up the imagery into 4 parts per image 
            # to limit the size of the images.
            Image.MAX_IMAGE_PIXELS = None   # disables the warning
            
            img=Image.open(srcFile)
            w,h=img.size    # w=Width and h=Height
            xsize1 = math.floor(w/2)
            xsize2 = w-xsize1
            ysize1 = math.floor(h/2)
            ysize2 = h - ysize1
            dest = os.path.join(outStylePath, outFileName.replace(".tif","1.png"))
            # Test if the destination file already exists. If so skip over the conversion.
            if os.path.isfile(dest): 
                print("Skipping "+fileName+" as output already exists "+dest)
            else:
                callStr = 'gdal_translate -of PNG -srcwin '+str(0)+' '+str(0)+' '+str(xsize1)+' '+str(ysize1)+' -co WORLDFILE=YES '+srcFile+' '+dest
                subprocess.call(callStr)
                
            dest = os.path.join(outStylePath, outFileName.replace(".tif","2.png"))
            if os.path.isfile(dest): 
                print("Skipping "+fileName+" as output already exists "+dest)
            else:
                callStr = 'gdal_translate -of PNG -srcwin '+str(xsize1)+' '+str(0)+' '+str(xsize2)+' '+str(ysize1)+' -co WORLDFILE=YES '+srcFile+' '+dest
                subprocess.call(callStr)
            
            dest = os.path.join(outStylePath, outFileName.replace(".tif","3.png"))
            if os.path.isfile(dest): 
                print("Skipping "+fileName+" as output already exists "+dest)
            else:
                callStr = 'gdal_translate -of PNG -srcwin '+str(0)+' '+str(ysize1)+' '+str(xsize1)+' '+str(ysize2)+' -co WORLDFILE=YES '+srcFile+' '+dest
                subprocess.call(callStr)
                
            dest = os.path.join(outStylePath, outFileName.replace(".tif","4.png"))
            if os.path.isfile(dest): 
                print("Skipping "+fileName+" as output already exists "+dest)
            else:
                callStr = 'gdal_translate -of PNG -srcwin '+str(xsize1)+' '+str(ysize1)+' '+str(xsize2)+' '+str(ysize2)+' -co WORLDFILE=YES '+srcFile+' '+dest
                subprocess.call(callStr)
            

# Build GDAL Virtual Raster for each of the styles for the lossless version of the dataset.
# We don't do this for the lossy version because the virtual raster format does not work
# for the JPEG in GeoTiff lossy format. The virtual raster format in QGIS does not handle
# the internal masking in the images properly resulting in masking being determined by the
# lossy embedded JPEG image using the nodata value instead of the embedded mask. This results
# in messy black boundaries between the images.

# The Virtual raster format allows all the images in a particular style to be loaded into QGIS and 
# treated as a single layer, making process and styling much more straight forward. We do the 
# building of the virtual layer here because QGIS has two bugs that make its 'Build Virtual Raster' feature
# unusable. The QGIS version (in version 3.18) makes all the file paths absolute making it not possible to
# share the resulting maps, and it converts all the file paths to 8.3 DOS format which makes the
# paths unreadable and probably not compatible across different platforms. 
# If we use gdalbuildvrt directly here the paths are made relative and without the
# conversion to 8.3 DOS names.
if MAKE_VIRTUAL:
    outputPaths = [OUT_LOSSLESS]
    for outputPath in outputPaths:
        outRegionDirs = glob.glob(os.path.join(outputPath,"*/"))
        print("=================== Virtual Raster =====================")
        print(outRegionDirs)
        for outRegionDir in outRegionDirs:
            # Look through all the directories that might have been created corresponding to 
            # the image styles. We could have try to process all OUT_PATH folders, looking for
            # any TIF files, however this way we won't accidentially attempt to create a virtual
            # raster for folders created through some other process.
            # Additionally if not all the styles have been downloaded from Google Earth Engine
            # then there will be style directories that don't exist. We must handle this case.
            for style in styles:
                imgDir = os.path.join(outRegionDir,style)
                # Only process if there is a directory for the style and it has some TIF files in it.
                if os.path.isdir(imgDir) and (len(glob.glob(os.path.join(imgDir,"*.tif"))) > 0):
                    # Place the virtual raster in the directory with the tif images. This will
                    # help keep the relative paths clean.
                    print('==== Building Virtual Raster files '+imgDir+' =====')
                    cmdString = 'gdalbuildvrt '+style+'.vrt'+' *.tif'
                    print(cmdString)
                    subprocess.call(cmdString, cwd = imgDir)
                else:
                    print("No files found for "+imgDir)