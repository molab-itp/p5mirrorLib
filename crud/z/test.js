//
// test something
//
// node a/test.js

import { init } from '../init.js';
import { login } from '../lib/login.js';
import { project_load } from '../lib/project.js';

let my = {};

async function main() {
  // init(my);
  login(my);

  // let project = project_load(my, my.projectId);
  // console.log('project', project);
}

main();
