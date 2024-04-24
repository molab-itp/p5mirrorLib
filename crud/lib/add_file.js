//

import fetch from 'node-fetch';
// import fs from 'fs-extra';
import path from 'path';

export function add_payLoad(my, project, filePath, content) {
  // console.log('add_payLoad filePath', filePath);

  let parsed = path.parse(filePath);
  let fileDir = parsed.dir;
  let fileName = parsed.base;
  let item = project.itemsByFilePath[fileDir];
  // console.log('add_payLoad item', item);
  if (!item) {
    console.log('add_payLoad no item for filePath', fileDir);
    return null;
  }
  let parentId = item.file.id;
  // console.log('add_payLoad parentId', parentId);

  return {
    name: fileName,
    content: content,
    parentId: parentId,
    children: [],
  };
}

export async function add_file(my, sketchId, payLoad) {
  //
  let url = `https://editor.p5js.org/editor/projects/${sketchId}/files`;
  if (my.verboseFlag) {
    console.log('add_file url', url);
  }
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Cookie: `sessionId=${my.sessionId}`,
    },
    body: JSON.stringify(payLoad),
  });
  if (my.verboseFlag) {
    // console.log('read_project res', res);
    console.log('add_file res.statusText', res.statusText);
  }
}
