//
import fetch from 'node-fetch';

import { init } from '../init.js';

// my.sessionId

export async function login(my) {
  //
  init(my);

  const credentials = {
    email: my.email,
    password: my.password,
  };

  const res = await fetch('https://editor.p5js.org/editor/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  let cookie = res.headers.get('set-cookie');
  // console.log('cookie', cookie);
  // cookie sessionId=s%3AaJ2D4FOx3LMUihdtsaz7Do8yXDYGyBL5.WwZxGOHxNFlPpd8P4qUQrQXW24igIVeDLDNJqUgZEys; Path=/; HttpOnly

  if (!cookie) {
    console.log('login failed cookie', cookie);
    return;
  }
  my.sessionId = cookie.split(';')[0].split('=')[1];
  if (my.verboseFlag) {
    console.log('my.sessionId', my.sessionId);
  }
}

// https://github.com/processing/p5.js-web-editor/blob/develop/contributor_docs/public_api.md
