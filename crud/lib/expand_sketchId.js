//

import fs from 'fs-extra';
import path from 'path';

import { project_load } from '../lib/project.js';
import { isSourceFileType } from '../lib/fileNodes.js';

export function expand_sketchId(my, sketchId, spath) {
  //
  if (!spath) {
    spath = path.join(my.root_sketches_path, sketchId);
  }

  let project = project_load(my, sketchId);

  let dirs = {};
  for (let item of project.items) {
    if (item.file.fileType != 'file' || !isSourceFileType(item.file.name)) {
      // console.log('expand skipping', item);
      // console.log('expand skipping', item.file.name);
      continue;
    }
    let nowfolder = path.parse(item.filePath).dir;
    let hit = dirs[nowfolder];
    if (!hit) {
      let npath = path.join(spath, nowfolder);
      // console.log('expand emptyDirSync', npath);
      fs.emptyDirSync(npath);
      dirs[nowfolder] = 1;
    }
    let filePath = path.join(spath, item.filePath);
    // console.log('expand filePath', filePath);
    fs.writeFileSync(filePath, item.file.content);
  }
}
