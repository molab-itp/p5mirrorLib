//
// expand json for project stored in
//  downloads/json/sketchId
//  to files in folder downloads/sketches/sketchId/
//
// node a/expand.js --sketch H50oU4N6K

import { init } from '../../init.js';
import { expand_sketchId } from '../../lib/expand_sketchId.js';

let my = {};

function main() {
  init(my);
  expand_sketchId(my, my.projectId);
}

main();
