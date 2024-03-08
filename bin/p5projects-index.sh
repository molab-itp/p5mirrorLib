#!/bin/bash
# cd ${0%/*}

# echo bin-path ${0%/*}
bin_path="${0%/*}"
abs_path="$(readlink -f "$bin_path")"
# echo $abs_path
root=`pwd`
# echo root $root

node $abs_path/../node/p5projects_index.js --root $root "$@"

