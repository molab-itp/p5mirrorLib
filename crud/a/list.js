//
// display list users of sketch id and sketch name
//
// node a/list.js

import { init } from '../init.js';
import { sketches_list } from '../init/sketches_list.js';

let my = {};

async function main() {
  init(my);

  my.allFlag = 1;
  let remote = my.arg_remote;

  let list = await sketches_list(my, 'list', { remote });
  // console.log('watermark list', list);

  let report = [];
  for (let item of list) {
    //
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
