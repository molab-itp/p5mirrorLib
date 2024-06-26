//
// delete a project/sketch server request
//
// node a/delete.js --sketch H50oU4N6K

import fetch from 'node-fetch';

import { login } from '../lib/login.js';
import { sketches_list } from '../init/sketches_list.js';
import { sketchId_delete, sketchId_flush } from '../lib/sketchId_map.js';

let my = {};

async function main() {
  //
  await login(my);

  let remote = my.arg_remote;
  let list = await sketches_list(my, 'delete', { ask: 1, remote });
  // console.log('delete list ', list);

  for (let item of list) {
    //
    await deleteProject(item.id);

    sketchId_delete(my, item.id);
  }

  sketchId_flush(my);
}

async function deleteProject(sketchId) {
  //
  // let url = `https://editor.p5js.org/editor/${my.user_name}/projects/${sketchId}`;
  let url = `https://editor.p5js.org/editor/projects/${sketchId}`;
  const res = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Cookie: `sessionId=${my.sessionId}`,
    },
  });
  // const content = await res.json();
  // console.log('deleteProject res', res);
  if (my.verboseFlag) {
    console.log('deleteProject res.url', res.url);
    console.log('deleteProject res.status', res.status);
    console.log('deleteProject res.statusText', res.statusText);
  }
  if (res.status == 200) {
    console.log('deleteProject res.url', res.url);
  } else {
    console.log('deleteProject url', url);
    // console.log('deleteProject res.url', res.url);
    console.log('deleteProject res.status', res.status);
    console.log('deleteProject res.statusText', res.statusText);
  }
}

main();
