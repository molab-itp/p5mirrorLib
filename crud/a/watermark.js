//
// update sketch with a watermark
//
// node a/watermark.js --sketch H50oU4N6K
//
// -- watermark format
// script.js first two lines: // url // name
// eg:
// // https://editor.p5js.org/p5name/sketches/NAReIkM1c
// // background 0 1
//

// import fetch from 'node-fetch';
// import fs from 'fs-extra';

import { login } from '../lib/login.js';
import { arg_sketches } from '../init/arg_sketches.js';
import { read_project } from '../lib/read_project.js';
import { update_project } from '../lib/update_project.js';

let my = {};

async function main() {
  await login(my);

  let list = await arg_sketches(my, 'watermark');

  for (let item of list) {
    //
    let payLoad = await read_project(my, item.id);

    modify_payLoad(payLoad);

    await update_project(my, payLoad);
  }
}

function modify_payLoad(payLoad) {
  //
  // current date, eg: 2024-04-18T22:51:10.314Z
  let date_s = new Date().toISOString();
  payLoad.updatedAt = date_s;

  // --name "Sketch new name"
  if (my.arg_name) {
    payLoad.name = my.arg_name;
  }

  for (let item of payLoad.files) {
    item.createdAt = date_s;
    item.updatedAt = date_s;
    item.isSelectedFile = item.name == 'sketch.js' || item.name == 'a_sketch.js';
    if (item.isSelectedFile) {
      //
      modify_sketch(payLoad, item);
    }
  }
}

// Add a watermark to sketch if not present
function modify_sketch(payLoad, item) {
  //
  let lines = item.content.split('\n');
  // eg: https://editor.p5js.org/jht1900/sketches/tvvbC7Uyt
  let url = `https://editor.p5js.org/${my.user_name}/sketches/${payLoad.id}`;
  let watermark = `// ${url}`;
  if (lines[0] !== watermark) {
    lines.splice(0, 0, watermark);
    let proposed_nameLine = `// ${payLoad.name}\n`;
    lines.splice(1, 0, proposed_nameLine);
  }
  let nameLine = lines[1];
  let proposed_nameLine = `// ${payLoad.name}\n`;
  if (!nameLine.startsWith(proposed_nameLine)) {
    lines.splice(1, 0, proposed_nameLine);
  } else {
    // !!@ increment version number after name line
  }
  item.content = lines.join('\n');
}

main();
