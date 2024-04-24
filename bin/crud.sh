#!/bin/bash

# crud.sh list

# echo bin-path ${0%/*}
bin_path="${0%/*}"
abs_path="$(readlink -f "$bin_path")"
# echo $abs_path
root=`pwd`
# echo root $root
# exit

home=crud
# Install npm if needed for node build scripts
#
dest=$abs_path/../$home
if [ ! -e "$dest/node_modules" ]; then
  pushd "$dest" > /dev/null
  npm install
  popd > /dev/null
fi

node "$abs_path/../$home/a/$1.js" --root "$root" "$@"

