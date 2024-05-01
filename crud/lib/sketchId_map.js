//

import fs from 'fs-extra';

export function sketchId_setFolder(my, id, folder, name) {
  // console.log('sketchId_setFolder id', id, 'folder', folder);
  let updatedAt = new Date().toISOString();
  let map = sketchId_map(my);
  let entry = map.items[id];
  if (!entry) {
    entry = { id, folder, updatedAt };
  }
  entry.folder = folder;
  if (name) entry.name = name;
  map.items[id] = entry;
  map.dirty = 1;
}

export function sketchId_getFolder(my, id) {
  let ent = sketchId_entry(my, id);
  if (!ent) return '';
  return ent.folder;
}

export function sketchId_entry(my, id) {
  let map = sketchId_map(my);
  let ent = map.items[id];
  return ent;
}

export function sketchId_map(my) {
  if (!my.sketchId_map) {
    my.sketchId_map = { items: {} };
    if (fs.existsSync(my.sketch_id_map_path)) {
      my.sketchId_map = fs.readJsonSync(my.sketch_id_map_path);
    }
  }
  return my.sketchId_map;
}

export function sketchId_flush(my) {
  let map = my.sketchId_map;
  if (!map) return;
  // console.log('sketchId_flush map', map);
  // console.log('sketchId_flush map.dirty', map.dirty);
  if (map.dirty) {
    delete map.dirty;
    fs.writeJsonSync(my.sketch_id_map_path, map, { spaces: 2 });
  }
}

export function sketchId_delete(my, id) {
  let ent = sketchId_entry(my, id);
  if (!ent) {
    // console.log('sketchId_delete no id', id);
    return;
  }
  delete my.sketchId_map.items[id];
  my.sketchId_map.dirty = 1;
}
