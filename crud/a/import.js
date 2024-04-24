//
// import a sketch from server and write to source folder
// only html, css, js files and folders downloaded
//  does NOT download media files!
//
// node a/import.js --folder "MazeSpin-subs2" --sketch Fovt_UVbT

import path from 'path';

import { init } from '../init.js';
import { expand_sketchId } from '../lib/expand_sketchId.js';
import { read_project } from '../lib/read_project.js';

let my = {};

async function main() {
  //
  init(my);

  await read_project(my, my.projectId);

  let spath = path.join(my.root_source_path, my.source_folder);

  expand_sketchId(my, my.projectId, spath);
}

main();
