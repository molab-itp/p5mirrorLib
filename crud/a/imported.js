//
// bin/import.sh
// node "$abs_path/../$home/a/imported.js" --root "$root" --folder "$dest" --sketch "$sketchid"

import { init } from '../init.js';
import { sketchId_setFolder, sketchId_flush } from '../lib/sketchId_map.js';

let my = {};

async function main() {
  //
  init(my);

  if (!my.arg_sketch || !my.arg_folder) {
    console.log('imported missing --sketch --folder', my.arg_sketch, my.arg_folder);
    return;
  }
  sketchId_setFolder(my, my.arg_sketch, my.arg_folder);

  sketchId_flush(my);
}

main();
