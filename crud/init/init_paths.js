//
import path from 'path';
import fs from 'fs-extra';
import url from 'url';

// console.log('import.meta.url', import.meta.url);
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

export function init_paths(my) {
  //
  if (!my.root_path) {
    my.root_path = path.join(__dirname, '../../');
  }
  my.downloads_path = path.join(my.root_path, './downloads');
  my.p5projects_path = path.join(my.root_path, './p5projects');

  my.root_source_path = path.join(my.root_path, './');

  my.root_json_path = path.join(my.downloads_path, 'json');
  my.root_sketches_path = path.join(my.downloads_path, 'sketches');

  my.gen_path = path.join(my.downloads_path, 'gen');
  my.zips_path = path.join(my.downloads_path, 'zips');
  my.json_path = path.join(my.downloads_path, 'json');

  fs.ensureDirSync(my.gen_path);
  fs.ensureDirSync(my.zips_path);
  fs.ensureDirSync(my.json_path);
  fs.ensureDirSync(my.root_sketches_path);

  fs.ensureDirSync(my.p5projects_path);

  // my.sketch_json_path = path.join(my.json_path, 'sketches.json');
  my.sketches_json_path = path.join(my.json_path, 'sketches.json');
  my.last_updatedAt_path = path.join(my.json_path, 'last_updatedAt.txt');
  my.pending_updatedAt_path = path.join(my.json_path, 'pending_updatedAt.txt');

  my.sketch_id_map_path = path.join(my.gen_path, 'sketch_id_map.json');

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

  if (my.verboseFlag) {
    console.log('my.root_path', my.root_path);
  }
}
