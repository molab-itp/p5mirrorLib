#!/bin/bash
# cd ${0%/*}

#
# download html,js,css AND media files to folder
#
# bin/import.sh sketchid destination-folder

# echo bin-path ${0%/*}
bin_path="${0%/*}"
abs_path="$(readlink -f "$bin_path")"
# echo $abs_path
root=`pwd`
# echo root $root

sketchid=$1
dest=$2
zipdest="$root/downloads/zips/$sketchid.zip"

echo "downloading sketch $sketchid to $dest"

curl -s https://editor.p5js.org/editor/projects/$sketchid/zip -o "$zipdest"

fulldest="$root/$dest"
echo "unzip $fulldest"

rm -rf "$fulldest"
mkdir "$fulldest"
pushd "$fulldest" > /dev/null
unzip -q "$zipdest"
popd > /dev/null

# remove redundant p5.js p5.sound.min.js
rm -f "$fulldest/"p5.*

# record sketchid assocation with destination-folder
home=crud
# Install npm if needed for node build scripts
#
ndest=$abs_path/../$home
if [ ! -e "$ndest/node_modules" ]; then
  pushd "$ndest" > /dev/null
  npm install
  popd > /dev/null
fi

node "$abs_path/../$home/a/imported.js" --root "$root" --folder "$dest" --sketch "$sketchid"
