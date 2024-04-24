//
// create a new project from folder in source directory
//
// node a/export_new.js --folder "MazeSpin-subs"

import fetch from 'node-fetch';
import fs from 'fs-extra';
import objectID from 'bson-objectid';
import path from 'path';

import { login } from '../lib/login.js';
import { expand_sketchId } from '../lib/expand_sketchId.js';
import { read_project } from '../lib/read_project.js';
import { fileNodes, isSourceFileType, sourceName } from '../lib/fileNodes.js';
import { arg_sketches } from '../init/arg_sketches.js';
import { sketchId_setFolder, sketchId_flush } from '../lib/sketchId_map.js';

let my = {};

async function main() {
  //
  await login(my);

  let list = await arg_sketches(my, 'export_new', { ask: 1, folder: my.source_folder });

  for (let source_folder of list) {
    //
    console.log('export_new source_folder', source_folder);

    await export_new(my, source_folder);
  }

  sketchId_flush(my);
}

async function export_new(my, source_folder) {
  //
  let file_nodes = fileNodes(my.root_source_path, source_folder);
  // console.log('export_new file_nodes', file_nodes);

  my.payLoad = fresh_project(file_nodes, source_folder);

  // console.log('export_new my.payLoad', my.payLoad);

  let projectId = await newProject(my.payLoad);

  await read_project(my, projectId);

  expand_sketchId(my, projectId);

  sketchId_setFolder(my, projectId, source_folder);
}

function fresh_project(file_nodes, source_folder) {
  //
  let payLoad = {
    name: sourceName(my, source_folder),
    updatedAt: '',
    isSaving: false,
    files: init_files(file_nodes, source_folder),
  };
  return payLoad;
}

function init_files(file_nodes, source_folder) {
  let spath = path.join(my.root_source_path, source_folder);

  let files = [];
  for (let node of file_nodes) {
    //
    let item = {};

    item.name = node.name;
    item.id = objectID().toHexString();
    item._id = item.id;
    item.children = [];

    node.item = item;

    if (node.children) {
      //
      item.fileType = 'folder';
      item.content = '';
      //
    } else if (isSourceFileType(item.name)) {
      //
      let cpath = path.join(spath, node.filePath);
      let content = fs.readFileSync(cpath) + '';

      item.fileType = 'file';
      item.content = content;
      item.isSelectedFile = item.name == 'sketch.js' || item.name == 'a_sketch.js';
      item.filePath = '';
    } else {
      console.log('init_files skipping', item.name);
      continue;
    }
    if (node.parent) {
      node.parent.item.children.push(item.id);
    }
    files.push(item);
  }
  return files;
}

async function newProject(payLoad) {
  //
  let url = `https://editor.p5js.org/editor/projects`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Cookie: `sessionId=${my.sessionId}`,
    },
    body: JSON.stringify(payLoad),
  });
  const content = await res.json();
  // console.log('newProject', content);
  if (my.verboseFlag) {
    console.log('newProject content.id', content.id);
  }
  console.log(content.id);
  return content.id;
}

main();

// --
// 2024-04-11 16:02:45
// from Peter - Ziyuan Lin

// --
// 2024-04-11 18:02:18
// Need to have email signin
