//
// display list users of sketch id and sketch name
//
// node a/list.js

import { init } from '../init.js';
import { read_project } from '../lib/read_project.js';

let my = {};

async function main() {
  init(my);
  let projects = await read_project(my, '');
  let report = [];
  for (let item of projects) {
    if (my.idFlag) {
      report.push(item.id);
    } else {
      report.push(`${item.id} ${item.name}`);
    }
  }
  let sep = my.idFlag ? ' ' : '\n';
  console.log(report.join(sep));
}

main();
