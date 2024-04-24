//
// # create a new sketch
// node a/new.js

import fetch from 'node-fetch';
// import fs from 'fs-extra';
// import objectID from 'bson-objectid';

import { login } from '../lib/login.js';
import { initialState } from '../lib/p5-web-editor/files.js';

let my = {};

async function main() {
  //
  await login(my);

  fresh_project(my);

  await newProject();
}

// .../p5.js-web-editor/client/modules/IDE/reducers/project.js
// const initialState = () => {
// return {
//   name: generatedName,
//   updatedAt: '',
//   isSaving: false
// };

function fresh_project(my) {
  //
  my.payLoad = {
    name: '',
    updatedAt: '',
    isSaving: false,
    files: initialState(),
  };

  if (my.arg_name) {
    my.payLoad.name = my.arg_name;
  } else {
    let date_s = new Date().toISOString();
    // 2024-04-12T09:32:41.197Z
    // my.payLoad.name = date_s.substring(0, 19);
    my.payLoad.name = date_s.substring(0, 10) + ' ' + random_sketch_name();
  }
}

function random_sketch_name() {
  let items = ['black', 'red', 'green', 'gold'];
  let index = Math.floor(Math.random() * items.length);
  return items[index];
}

async function newProject() {
  //
  let payLoad = my.payLoad;
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
  } else {
    console.log(content.id);
  }
}

main();

// --
// 2024-04-11 16:02:45
// from Peter - Ziyuan Lin

// --
// 2024-04-11 18:02:18
// Need to have email signin
