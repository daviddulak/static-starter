#!/usr/bin/env bash
# This script assumes that ImageMagick is installed and the convert command is accessible via the $PATH variable

path='icon_source.png'

# If an argument exists, assign the argument to the path variable so it is easier to follow throughout the script.
if [ "$#" -eq 1 ]
then
  path=$1
fi

# Ensure that the path points to a valid file.
if [ ! -f "$path" ]
then
  echo "Path must point to a valid file."
  exit 1
fi

# This function takes in the dimension of the icon (it assumes the icon is a square) and the name of the file to save the icon to.
function createIconImage()
{
  iconDimension=$1
  iconName=$2

  convert "$path" -resize ${iconDimension}x${iconDimension}^ -gravity center -extent ${iconDimension}x${iconDimension} $iconName
}

# Create all the suggested icons for both the iPhone and iPad platforms to ensure the best appearance.
createIconImage 57  src/apple-icon-57x57.png
createIconImage 60  src/apple-icon-60x60.png
createIconImage 72  src/apple-icon-72x72.png
createIconImage 76  src/apple-icon-76x76.png
createIconImage 114 src/apple-icon-114x114.png
createIconImage 120 src/apple-icon-120x120.png
createIconImage 144 src/apple-icon-144x144.png
createIconImage 152 src/apple-icon-152x152.png
createIconImage 180 src/apple-icon-180x180.png
createIconImage 192 src/android-icon-192x192.png
createIconImage 32  src/favicon-32x32.png
createIconImage 96  src/favicon-96x96.png
createIconImage 16  src/favicon-16x16.png
createIconImage 36  src/android-icon-36x36.png
createIconImage 48  src/android-icon-48x48.png
createIconImage 72  src/android-icon-72x72.png
createIconImage 96  src/android-icon-96x96.png
createIconImage 144 src/android-icon-144x144.png
createIconImage 192 src/android-icon-192x192.png
createIconImage 558 src/tile.png

# Create Tile Wide
convert "$path" -resize 558x270^ -gravity center -extent 558x270 src/tile-wide.png

# Create favicon.ico
convert "$path"  -bordercolor white -border 0 \
      \( -clone 0 -resize 16x16 \) \
      \( -clone 0 -resize 32x32 \) \
      \( -clone 0 -resize 48x48 \) \
      \( -clone 0 -resize 64x64 \) \
      -delete 0 -alpha off -colors 256 src/favicon.ico