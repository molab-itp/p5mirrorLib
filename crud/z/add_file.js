//
// test add file server request
//
// node a/add_file.js  --sketch gi5q3UnJD --file sub/sub3/SpiralWalker2.js

// import fetch from 'node-fetch';
import fs from 'fs-extra';
import path from 'path';

import { login } from '../../lib/login.js';
import { add_payLoad, add_file } from '../../lib/add_file.js';
import { project_load } from '../../lib/project.js';

let my = {};

async function main() {
  await login(my);

  let sketchId = my.projectId;

  let project = project_load(my, sketchId);
  // console.log('add_file project', project);

  let filePath = my.arg_file;
  let spath = path.join(my.root_sketches_path, sketchId);
  let fpath = path.join(spath, filePath);
  let content = fs.readFileSync(fpath) + '';

  let payLoad = add_payLoad(my, project, filePath, content);
  // console.log('add_file payLoad', payLoad);
  if (!payLoad) {
    return;
  }

  await add_file(my, my.projectId, payLoad);
}

main();
