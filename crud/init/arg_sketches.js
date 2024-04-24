//

import readline from 'node:readline';
import path from 'path';

import { list_projects } from '../lib/read_project.js';
import { fileNodes } from '../lib/fileNodes.js';

export async function arg_sketches(my, label, options) {
  options = options || {};
  let ask = options.ask;
  let folder = options.folder;
  //
  let list = [];
  if (my.allFlag) {
    //
    if (folder) {
      list = list_folder(my, folder);
    } else {
      list = await list_projects(my);
    }
    if (ask) {
      list = all_check(my, list, label);
    }
    //
  } else if (my.arg_sketches) {
    //
    list = my.arg_sketches.map((item) => {
      return { id: item };
    });
    //
  } else if (my.arg_sketch) {
    //
    list = [{ id: my.arg_sketch }];
    //
  } else if (folder) {
    list = [my.source_folder];
  } else {
    //
    console.log('arg_sketches no --sketch, --sketches, or --all');
  }
  // console.log('arg_sketches list', list);
  return list;
}

function list_folder(my, folder) {
  let list = fileNodes(my.root_source_path, folder, { maxDepth: 1 });
  list = list.flatMap((item) => {
    if (!item.parent) return [];
    let npath = path.join(folder, item.filePath);
    return [npath];
  });
  return list;
}

async function all_check(my, list, label) {
  //
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const myPromise = new Promise((resolve, reject) => {
    console.log(`${label}`, list);
    rl.question(`${label} n=${list.length} yes or no: `, (answer) => {
      rl.close();
      if (answer == 'yes') {
        console.log(`Performing ${list.length} ${label}`);
        resolve(list);
      } else {
        console.log(`Cancelled ${label}`);
        resolve([]);
      }
    });
  });

  return myPromise;
}
