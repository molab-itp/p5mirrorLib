//
// update a sketch from a folder in source
//
// node a/export_watermark.js --folder "MazeSpin-subs" --sketch COK08srwr

// import fetch from 'node-fetch';
import fs from 'fs-extra';
import path from 'path';

import { login } from '../lib/login.js';
import { read_project } from '../lib/read_project.js';
import { delete_file } from '../lib/delete_file.js';
import { project_load } from '../lib/project.js';
import { fileNodes, isSourceFileType } from '../lib/fileNodes.js';
import { update_project } from '../lib/update_project.js';
import { add_payLoad, add_file } from '../lib/add_file.js';
import { sketches_list } from '../init/sketches_list.js';
import { sketchId_setFolder, sketchId_getFolder, sketchId_flush } from '../lib/sketchId_map.js';

let my = {};

async function main() {
  //
  await login(my);

  if (my.arg_sketch && my.arg_folder) {
    sketchId_setFolder(my, my.arg_sketch, my.arg_folder, my.arg_name);
  }
  let remote = my.arg_remote;
  let list = await sketches_list(my, 'export_update', { ask: 1, remote });

  for (let item of list) {
    //
    let source_folder = sketchId_getFolder(my, item.id);
    console.log('export_update id', item.id, 'source_folder', source_folder);
    if (!source_folder) {
      console.log('export_update skipping', item.id);
      continue;
    }
    // project json must be latest from server
    await read_project(my, item.id);

    // determine changes: updates, deletes, additions
    await export_update(my, item.id, source_folder);

    // read back project json to verify changes
    await read_project(my, item.id);

    sketchId_setFolder(my, item.id, source_folder, item.name);
  }

  sketchId_flush(my);
}

//
export async function export_update(my, projectId, source_folder) {
  //
  let spath = path.join(my.root_source_path, source_folder);

  // prior files are load from json
  let project = project_load(my, projectId);

  // next state is from local source
  let fnodes = fileNodes(my.root_source_path, source_folder);
  let fnodesByFilePath = {};
  for (let node of fnodes) {
    // console.log('node.filePath', node.filePath);
    fnodesByFilePath[node.filePath] = node;
  }

  let date_s = new Date().toISOString();
  project.json.updatedAt = date_s;

  // determine list of files to be
  //  deleted, updated or added
  //
  let deletes = [];
  for (let item of project.items) {
    let file = item.file;

    if (file.fileType != 'file') {
      continue;
    }
    if (!isSourceFileType(file.name)) {
      // non source files .html, .js, .css
      console.log('export_update skipping', file.name);
      continue;
    }
    // console.log('item.filePath', item.filePath);
    // eg. MazeSpin.js
    // is item in next state?
    let node = fnodesByFilePath[item.filePath];
    if (!node) {
      // not in next, mark for deletion
      console.log('no node item.filePath', item.filePath);
      if (file.fileType == 'file') {
        deletes.push(item);
      }
      continue;
    }
    let cpath = path.join(spath, node.filePath);
    let content = fs.readFileSync(cpath) + '';

    if (file.content != content) {
      if (my.verboseFlag) {
        console.log('export_update update item.filePath', item.filePath);
      }
    }
    file.content = content;
    file.createdAt = date_s;
    file.updatedAt = date_s;
    file.isSelectedFile = file.name == 'sketch.js' || file.name == 'a_sketch.js';
    node.updated = 1;
  }

  // --name "Sketch new name"
  if (my.arg_name) {
    project.json.name = my.arg_name;
  }

  // update files already present in json
  //
  await update_project(my, project.json);

  // delete files not present in source
  //
  for (let item of deletes) {
    console.log('export_update delete item.filePath', item.filePath);
    await delete_file(my, project, projectId, item.filePath);
  }

  // add new content
  // for fnodes not marked updated
  //
  for (let node of fnodes) {
    if (node.updated || node.children || !isSourceFileType(node.name)) {
      continue;
    }
    let filePath = node.filePath;
    console.log('export_update add filePath', filePath);

    let cpath = path.join(spath, filePath);
    let content = fs.readFileSync(cpath) + '';

    let payLoad = add_payLoad(my, project, filePath, content);
    // console.log('add_file payLoad', payLoad);
    if (!payLoad) return;

    await add_file(my, projectId, payLoad);
  }
}

main();
