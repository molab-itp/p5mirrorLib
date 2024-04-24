//
import fetch from 'node-fetch';

export async function update_project(my, payLoad) {
  //
  // console.log('update_project payLoad', payLoad);

  let url = `https://editor.p5js.org/editor/projects/${payLoad.id}`;
  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Cookie: `sessionId=${my.sessionId}`,
    },
    body: JSON.stringify(payLoad),
  });
  let content;
  if (res.status == 200) {
    content = await res.json();
    // console.log('updateProject', content);
    if (my.verboseFlag) {
      console.log('updateProject content.id', content.id);
    }
  } else {
    console.log('updateProject res.url', res.url);
    console.log('updateProject res.status', res.status);
    console.log('updateProject res.statusText', res.statusText);
  }
  return content;
}

// console.log('updateProject content.user._id', content.user._id);
// console.log('updateProject content.user.username', content.user.username);
// console.log('updateProject content.files.length', content.files.length);
// console.log('updateProject content.name', content.name);
