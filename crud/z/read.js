//
// download project/sketch json to folder downloads/json
//
// node a/read.js --sketch H50oU4N6K

import { init } from '../../init.js';
import { read_project } from '../../lib/read_project.js';

let my = {};

async function main() {
  //
  init(my);

  await read_project(my, my.projectId);
}

main();
