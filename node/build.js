const fs = require('fs-extra');
const axios = require('axios');

const collection_list = require('./collection_list');
const { init } = require('./build_init');
const { markDownQuote } = require('./markDownQuote');
const { fixForFileName } = require('./fixForFileName');

let my = {};

init(my);
// console.log('run start');
run();
// console.log('run end');

async function run() {
  //
  // my_init();

  // let last_updatedAt = '';
  // if (my.updateFlag && fs.pathExistsSync(my.last_updatedAt_path)) {
  //   last_updatedAt = fs.readFileSync(my.last_updatedAt_path) + '';
  //   // console.log('last_updatedAt', last_updatedAt);
  // }

  await collection_list.run(my);

  // console.log('my.checkFlag', my.checkFlag);
  if (!fs.pathExistsSync(my.sketch_json_path) || my.latestFlag) {
    await read_href(my.sketch_href, my.sketch_json_path);
  }
  if (!fs.pathExistsSync(my.sketch_json_path)) {
    console.log('Missing', my.sketch_json_path);
    return;
  }
  let sks = fs.readJsonSync(my.sketch_json_path);

  // sort by name
  // let options =  { sensitivity: 'case', caseFirst: 'lower' };
  // attempts at case-sensitive fail
  let options = { sensitivity: 'case' };
  sks.sort((item1, item2) => item1.name.localeCompare(item2.name, 'en', options));

  list_sketches(sks, my.list_path);

  // sort by updatedAt
  sks.sort((item1, item2) => item1.updatedAt.localeCompare(item2.updatedAt));
  sks.reverse();
  list_sketches(sks, my.list_recent_path);

  // sks.forEach((item, index) => {
  //   console.log(index, 'updatedAt', item.updatedAt);
  // });

  // Write new pending_updateAt.txt
  let pending_updateAt = '';
  if (sks.length > 0) {
    pending_updateAt = sks[0].updatedAt;
  }
  fs.writeFileSync(my.pending_updatedAt_path, pending_updateAt);

  // create the download scripts in updateAt order
  // gives user a chance to prune script to only update recent changes
  //
  download_sh(sks, my.download_sh_path, my.unzip_sh_path, my.last_updatedAt);

  // console.log('');
}

// let mfile = markDownQuote(afile);
// let efile = encodeURIComponent(afile);
// let id = extract_id(afile);
// // console.log('afile', afile);
// let p5js = `[p5js](https://editor.p5js.org/${my.user_name}/sketches/${id})`;
// lines.push(`- [${mfile}](./p5projects/${efile}) \[${p5js}\]`);

// let id = item.id;
// let name = fixForFileName(item.name + '-' + id);

function list_sketches(sks, list_path) {
  // console.log('sks', sks);
  // console.log('sks.length', sks.length);
  let lines = [];
  lines.push('# Sketches for ' + my.user_name);
  lines.push([`${sks.length} sketches  `]);
  sks.forEach((item) => {
    // console.log(index, 'project.name', item.project.name);
    // console.log(index, 'projectId', item.projectId);
    let name = item.name;
    let id = item.id;
    let updatedAt = item.updatedAt;
    let mname = markDownQuote(name);
    let fname = fixForFileName(item.name + '-' + id);
    let efile = encodeURIComponent(fname);
    let fpath = `../../p5projects/${efile}`;
    // let mid = markDownQuote(id);
    let p5js = `[p5js](https://editor.p5js.org/${my.user_name}/sketches/${id})`;
    lines.push(`[${mname}](${fpath}) \[${p5js}\]<!-- ${updatedAt} -->  `);
  });
  fs.writeFileSync(list_path, lines.join('\n'));
}

function download_sh(sks, download_sh_path, unzip_sh_path, last_updatedAt) {
  // console.log('sks', sks);
  // console.log('sks.length', sks.length);
  let download_lines = [];
  let unzip_lines = [];
  unzip_lines.push(`cd "${my.downloads_path}/../p5projects"`);
  // unzip_lines.push(`pwd`);
  let index = 0;
  let count = 0;
  sks.forEach((item) => {
    // console.log(index, 'project.name', item.project.name);
    // console.log(index, 'projectId', item.projectId);
    index++;
    if (my.limit > 0 && index > my.limit) return;
    if (last_updatedAt && item.updatedAt <= last_updatedAt) {
      // item too old, already downloaded
      return;
    }
    let id = item.id;
    let name = fixForFileName(item.name + '-' + id);
    download_lines.push(`echo download ${index} "${name}"`);
    download_lines.push(
      `curl -s https://editor.p5js.org/editor/projects/${id}/zip -o "${my.downloads_path}/zips/${name}.zip"`
    );
    unzip_sh(unzip_lines, index, name);
    count++;
  });
  if (my.verboseFlag) {
    download_lines.push('echo');
  }
  unzip_lines.push(`
cd ..
# remove redundant p5.js p5.sound.min.js
rm -f p5projects/*/p5.*
# sync last_updatedAt.txt
cd downloads/json
if [ -e pending_updatedAt.txt ]; then
  rm -f last_updatedAt.txt
  mv pending_updatedAt.txt last_updatedAt.txt
fi`);
  if (my.verboseFlag) {
    unzip_lines.push('echo');
  }
  fs.writeFileSync(download_sh_path, download_lines.join('\n'));
  fs.writeFileSync(unzip_sh_path, unzip_lines.join('\n'));

  if (my.updateFlag) {
    console.log('download new ' + count + ' ' + last_updatedAt);
  } else {
    console.log('download n ' + count);
  }
}

// pushd $dest > /dev/null
// npm install
// popd > /dev/null

function unzip_sh(unzip_lines, index, name) {
  unzip_lines.push(`#`);
  unzip_lines.push(`echo unzip ${index} "${name}"`);
  unzip_lines.push(`rm -rf "./${name}"`);
  unzip_lines.push(`mkdir "./${name}"`);
  unzip_lines.push(`pushd "./${name}" > /dev/null`);
  unzip_lines.push(`unzip -q "../../downloads/zips/${name}"`);
  unzip_lines.push(`popd > /dev/null`);
}

// cd ..
// # remove redundant p5.js p5.sound.min.js
// rm p5projects/*/p5.*

// cd p5projects
// rm -r "my sketch name"
// mkdir "my sketch name"
// cd "my sketch name"
// unzip "../../downloads/zips/my sketch name.zip"
// cd ..
//

async function read_href(sketch_href, json_path) {
  // console.log('');
  if (my.verboseFlag) {
    console.time('sketch read_href');
  }
  try {
    const response = await axios.get(sketch_href);
    const sks = response.data;
    if (my.verboseFlag) {
      console.log('sketch n', sks.length);
    }
    sks.sort((item1, item2) => item1.name.localeCompare(item2.name));
    fs.writeJsonSync(json_path, sks, { spaces: 2 });
  } catch (err) {
    // console.log('read_href err', err);
    console.log('read_href error sketch_href', sketch_href);
  }
  if (my.verboseFlag) {
    console.timeEnd('sketch read_href');
    console.log('');
  }
}

//     "updatedAt": "2021-03-21T20:48:04.012Z",
// [Ex_05_99 Robot03_Response](https://editor.p5js.org/jht1493/sketches/sWEVGT4bm)

// https://github.com/jprichardson/node-fs-extra

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare
