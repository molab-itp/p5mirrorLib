//

import fetch from 'node-fetch';

export async function delete_file(my, project, sketchId, filePath) {
  //
  let ref = delete_ref(my, project, sketchId, filePath);
  console.log('delete_file ref', ref);
  if (!ref) {
    console.log('delete_file failed', filePath);
    return;
  }

  let url = `https://editor.p5js.org/editor/projects/${sketchId}/files/${ref}`;
  console.log('delete_file url', url);

  const res = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Cookie: `sessionId=${my.sessionId}`,
    },
  });
  // console.log('read_project res', res);
  console.log('delete_file res.statusText', res.statusText);
}

function delete_ref(my, project, sketchId, filePath) {
  console.log('delete_ref sketchId', sketchId, 'fileName', filePath);

  // Find file item id in json
  let item = project.itemsByFilePath[filePath];
  // console.log('delete_ref item', item);
  if (!item) {
    return null;
  }

  // 66198b5e9b0419001abecf0f?parentId=661986c55b0810ed10c51b80

  return `${item.file.id}?parentId=${item.parent.file.id}`;
}
