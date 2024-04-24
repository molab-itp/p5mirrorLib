//
import fs from 'fs-extra';
import path from 'path';

// Project json -- aka sketch
//   _id: s5Xzju9bV
//   name: 2024-04-15 red
//   createdAt: 2024-04-15T11:50:11.213Z
//   updatedAt: 2024-04-15T11:51:34.560Z
//   slug: 2024-04-15_red
//   __v: 0
//   user: {
//     _id: 6606f3a878d1a2001c31d32c
//     username: p5moLab
//   files: [ ProjectFile ...

// ProjectFile folder
//       _id: 661d1473184e274b116b8d35
//       fileType: folder
//       name: root
//       children: [
//         661d1473184e274b116b8d33 ...
//       createdAt: 2024-04-15T11:51:34.560Z
//       updatedAt: 2024-04-15T11:51:34.560Z
//       -- content:

// ProjectFile file
//       _id: 661d1473184e274b116b8d33
//       fileType: file
//       name: index.html
//       content: " ... "
//       createdAt: 2024-04-15T11:51:34.560Z
//       updatedAt: 2024-04-15T11:51:34.560Z
//       -- children: []

// ProjectFileItem
//  file: ProjectFile
//  parent: ProjectFileItem
//  filePath: String

export function project_load(my, sketchId) {
  //
  let project = {
    json: {}, // from json file
    items: [], // ProjectFileItem
    itemsById: {}, // maps id to ProjectFileItem
    itemsByFilePath: {}, // maps fileName to ProjectFileItem
  };
  let jpath = path.join(my.root_json_path, `${sketchId}.json`);
  project.json = fs.readJsonSync(jpath);

  // name 'root' --> ''
  // project.json.files[0].name = '';

  // build fileItems
  for (let file of project.json.files) {
    let item = {};
    item.file = file;
    project.items.push(item);

    project.itemsById[file.id] = item;
  }

  // set parents
  for (let item of project.items) {
    for (let cid of item.file.children) {
      let child = project.itemsById[cid];
      child.parent = item;
    }
  }

  // set filePaths
  for (let item of project.items) {
    let filePath = item.file.name;
    if (filePath == 'root') {
      filePath = '';
    }
    let parent = item.parent;
    if (parent) {
      if (parent.filePath == undefined) {
        console.log('project_load not parent.filePath', parent);
        continue;
      }
      filePath = path.join(parent.filePath, filePath);
    }
    // console.log('filePath', filePath);
    item.filePath = filePath;

    project.itemsByFilePath[filePath] = item;
  }

  return project;
}
