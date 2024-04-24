//
import fs from 'fs-extra';
import fetch from 'node-fetch';
import path from 'path';

export async function read_project(my, sketchId) {
  //
  let url = `https://editor.p5js.org/editor/${my.user_name}/projects/${sketchId}`;
  // console.log('read_project url', url);
  // console.log('read_project sketchId', sketchId);
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Cookie: `sessionId=${my.sessionId}`,
    },
  });
  // console.log('read_project res', res);
  // console.log('read_project res.statusText', res.statusText);
  let content;
  if (res.status == 200) {
    content = await res.json();
    // console.log('read_project content', content);
    if (my.verboseFlag) {
      console.log('read_project content.id', content.id);
    }
    let jpath = path.join(my.root_json_path, `${sketchId}.json`);
    fs.writeJsonSync(jpath, content, { spaces: 2 });
  } else {
    console.log('read_project res.url', res.url);
    console.log('read_project res.status', res.status);
    console.log('read_project res.statusText', res.statusText);
  }
  return content;
}

export async function list_projects(my) {
  let projects = await read_project(my, '');
  let list = [];
  for (let item of projects) {
    let { id, name } = item;
    list.push({ id, name });
  }
  return list;
}
