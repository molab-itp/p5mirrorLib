//

import readline from 'node:readline';
import path from 'path';

import { list_projects } from '../lib/read_project.js';
import { fileNodes } from '../lib/fileNodes.js';
import { sketchId_map } from '../lib/sketchId_map.js';

// options = { ask, folder, remote }
export async function sketches_list(my, label, options) {
  options = options || {};
  let list = [];
  if (my.allFlag) {
    //
    if (options.folder) {
      list = list_folder(my, options.folder);
    } else if (options.remote) {
      list = await list_projects(my);
    } else {
      list = list_sketches(my);
    }
    if (options.ask) {
      list = all_check(my, list, label);
    }
    //
  } else if (my.arg_sketches) {
    //
    list = my.arg_sketches.map((id) => {
      return { id };
    });
    //
  } else if (my.arg_sketch) {
    //
    list = [{ id: my.arg_sketch }];
    //
  } else if (options.folder) {
    //
    list = [{ folder: my.source_folder }];
  } else {
    //
    console.log('sketches_list no --sketch, --sketches, or --all');
  }
  // console.log('sketches_list list', list);
  return list;
}

function list_sketches(my) {
  let map = sketchId_map(my);
  return Object.values(map.items);
}

function list_folder(my, folder) {
  let list = fileNodes(my.root_source_path, folder, { maxDepth: 1 });
  list = list.flatMap((item) => {
    if (!item.parent) return [];
    let npath = path.join(folder, item.filePath);
    return [{ folder: npath }];
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
        console.log(`\nPerforming ${list.length} ${label}`);
        resolve(list);
      } else {
        console.log(`\nCancelled ${label}`);
        resolve([]);
      }
    });
  });

  return myPromise;
}
