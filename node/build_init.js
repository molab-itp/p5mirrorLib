//
const path = require('path');
const fs = require('fs-extra');

function init(my) {
  my.user_name = user_name = process.env.USER_NAME || 'p5name';
  my.limit = -1;
  my.root_path = path.join(__dirname, '..');
  my.latestFlag = 1;
  my.updateFlag = 1;
  my.verboseFlag = 0;
  my.cleanFlag = 0;

  for (let index = 0; index < process.argv.length; index++) {
    // console.log(index, process.argv[index]);
    let val = process.argv[index];
    if (val == '--root') {
      index++;
      my.root_path = process.argv[index];
    } else if (val == '--user') {
      index++;
      my.user_name = process.argv[index];
      // console.log('argv user_name', my.user_name);
    } else if (val == '--limit') {
      index++;
      my.limit = parseFloat(process.argv[index]);
      console.log('argv limit', my.limit);
    } else if (val == '--full') {
      my.updateFlag = 0;
    } else if (val == '--current') {
      my.latestFlag = 0;
    } else if (val == '--clean') {
      my.cleanFlag = 1;
    } else if (val == '--verbose') {
      my.verboseFlag = 1;
    }
  }
  // console.log('');
  if (my.verboseFlag) {
    console.log('my.user_name', my.user_name);
    console.log('my.root_path', my.root_path);
  }

  my.downloads_path = path.join(my.root_path, './downloads');
  my.p5projects_path = path.join(my.root_path, './p5projects');

  my_init(my);
}

function my_init(my) {
  my.gen_path = path.join(my.downloads_path, 'gen');
  my.zips_path = path.join(my.downloads_path, 'zips');
  my.json_path = path.join(my.downloads_path, 'json');

  fs.ensureDirSync(my.gen_path);
  fs.ensureDirSync(my.zips_path);
  fs.ensureDirSync(my.json_path);
  fs.ensureDirSync(my.p5projects_path);

  my.sketch_json_path = path.join(my.json_path, 'sketches.json');
  my.last_updatedAt_path = path.join(my.json_path, 'last_updatedAt.txt');
  my.pending_updatedAt_path = path.join(my.json_path, 'pending_updatedAt.txt');

  my.list_path = path.join(my.gen_path, 'sketches.md');
  my.list_recent_path = path.join(my.gen_path, 'sketches_recent.md');
  my.download_sh_path = path.join(my.gen_path, 'download.sh');
  my.unzip_sh_path = path.join(my.gen_path, 'unzip.sh');

  my.sketch_href = `https://editor.p5js.org/editor/${my.user_name}/projects`;

  my.last_updatedAt = '';
  if (fs.pathExistsSync(my.last_updatedAt_path)) {
    my.last_updatedAt = fs.readFileSync(my.last_updatedAt_path) + '';
    // console.log('last_updatedAt', last_updatedAt);
  }
}

module.exports.init = init;
