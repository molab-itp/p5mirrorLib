const P5URL = 'https://editor.p5js.org';
let sid = '';

const credentials = {
  email: 'ziyuanlin05@gmail.com',
  password: '********',
};

const payLoad = {
  name: 'Skitter abacus',
  files: [
    {
      name: 'root',
      id: '6577a11c93b4c17638462b5e',
      _id: '6577a11c93b4c17638462b5e',
      children: ['6577a11c93b4c17638462b5c', '6577a11c93b4c17638462b5b', '6577a11c93b4c17638462b5d'],
      fileType: 'folder',
      content: '',
    },
    {
      name: 'sketch.js',
      content:
        'function setup() {\n  //This is a programatically generated file!!! \n createCanvas(400, 400);\n}\n\n\nfunction draw() {\n  background(220);\n}',
      id: '6577a11c93b4c17638462b5b',
      _id: '6577a11c93b4c17638462b5b',
      isSelectedFile: true,
      fileType: 'file',
      children: [],
      filePath: '',
    },
    {
      name: 'index.html',
      content:
        '<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.js"></script>\n    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/addons/p5.sound.min.js"></script>\n    <link rel="stylesheet" type="text/css" href="style.css">\n    <meta charset="utf-8" />\n\n  </head>\n  <body>\n    <main>\n    </main>\n    <script src="sketch.js"></script>\n  </body>\n</html>\n',
      id: '6577a11c93b4c17638462b5c',
      _id: '6577a11c93b4c17638462b5c',
      fileType: 'file',
      children: [],
      filePath: '',
    },
    {
      name: 'style.css',
      content: 'html, body {\n  margin: 0;\n  padding: 0;\n}\ncanvas {\n  display: block;\n}\n',
      id: '6577a11c93b4c17638462b5d',
      _id: '6577a11c93b4c17638462b5d',
      fileType: 'file',
      children: [],
      filePath: '',
    },
  ],
};

async function getSession() {
  const res = await fetch(P5URL + '/editor/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  sid = res.headers.get('set-cookie').split(';')[0].split('=')[1];
  console.log(sid);
}

async function insertProject() {
  const res = await fetch(P5URL + '/editor/projects', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Cookie: `sessionId=${sid}`,
    },
    body: JSON.stringify(payLoad),
  });
  const content = await res.json();
  console.log(content);
}

async function main() {
  await getSession();
  await insertProject();
}

main();

// --
// 2024-04-11 16:02:45
// from Peter - Ziyuan Lin
