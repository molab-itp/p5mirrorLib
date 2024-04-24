//
// test delete file server request
//
// node a/delete_file.js  --sketch gi5q3UnJD --file sub/sub3/SpiralWalker2.js

import { login } from '../../lib/login.js';
import { delete_file } from '../../lib/delete_file.js';
import { project_load } from '../../lib/project.js';

let my = {};

async function main() {
  await login(my);

  let project = project_load(my, my.projectId);

  await delete_file(my, project, my.projectId, my.arg_file);
}

main();
