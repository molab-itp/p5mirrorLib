//
const fs = require('fs-extra');
const path = require('path');

const { init } = require('./build_init');
const { markDownQuote } = require('./markDownQuote');
const { fixForFileName } = require('./fixForFileName');

let my = {};
init(my);
run();

function my_init() {
  // my.p5projects_path = path.join(my.root_path, '../p5projects');
  // console.log('p5projects_index ', my.p5projects_path);
  my.p5projects_index_path = path.join(my.p5projects_path, '../p5projects-index.md');
}

function run() {
  //
  my_init();

  if (
    !fs.pathExistsSync(my.p5projects_path) || //
    !fs.lstatSync(my.p5projects_path).isDirectory()
  ) {
    console.log('no folder', my.p5projects_path);
    return;
  }

  // if (my.cleanFlag) {
  remove_unreferenced();
  // }

  let dfiles = fs.readdirSync(my.p5projects_path);
  // console.log('dfiles', dfiles);
  // console.log('dfiles n', dfiles.length);
  let lines = [];
  lines.push(`# ${my.user_name} p5projects`);
  lines.push('');
  let count = 0;
  for (let afile of dfiles) {
    if (afile.startsWith('.')) {
      continue;
    }
    let mfile = markDownQuote(afile);
    let efile = encodeURIComponent(afile);
    let id = extract_id(afile);
    // console.log('afile', afile);
    let p5js = `[p5js](https://editor.p5js.org/${my.user_name}/sketches/${id})`;
    lines.push(`- [${mfile}](./p5projects/${efile}) \[${p5js}\]`);
    count++;
  }
  console.log('indexed n', count);
  console.log('');
  let stats = `${count} sketches ${my.last_updatedAt}`;
  let recent_link = `[${stats}](./downloads/gen/sketches_recent.md)`;
  lines.splice(1, 0, recent_link);

  fs.writeFileSync(my.p5projects_index_path, lines.join('\n'));
}

function extract_id(link) {
  // substring(indexStart, indexEnd)
  return link.substring(link.length - 9);
}

function remove_unreferenced() {
  let sks = [];
  if (fs.pathExistsSync(my.sketch_json_path)) {
    sks = fs.readJsonSync(my.sketch_json_path);
  }
  // Create dictionary of all sketches by filename
  let sks_dict = {};
  sks.forEach((item) => {
    let name = fixForFileName(item.name + '-' + item.id);
    sks_dict[name] = 1;
  });
  // remove sketches not present in sks_dict
  //
  let dfiles = fs.readdirSync(my.p5projects_path);
  for (let afile of dfiles) {
    if (afile.startsWith('.')) {
      continue;
    }
    let present = sks_dict[afile];
    let pfile = path.join(my.p5projects_path, afile);
    if (!present) {
      if (my.cleanFlag) {
        console.log('removing', pfile);
        fs.removeSync(pfile);
      } else {
        console.log('unreferenced', pfile);
      }
    } else {
      // console.log('present', pfile);
    }
  }
}
