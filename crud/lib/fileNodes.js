//
import fs from 'fs-extra';
import path from 'path';

// FileNode
//  filePath,
//  name,
//  parent,
//  children: [
//    FileNode, ...

// create an array of FileNodes from file tree at root_folder
// returns [
//  FileNode, ... ]
//
export function fileNodes(root_path, root_folder, options) {
  options = options || {};
  let maxDepth = options.maxDepth || -1;
  // init array of files to list
  // array will expand with directory contents
  let files = [{ filePath: '', name: 'root', depth: 0 }];
  let nodes = []; // output array of FileNode's
  for (let index = 0; index < files.length; index++) {
    let ent = files[index];
    // console.log('ent', ent);
    let { filePath, name, parent, depth } = ent;
    if (filePath.substring(0, 1) == '.' && !filePath.substring(0, 2) == './') continue;
    const fullPath = path.join(root_path, root_folder, filePath);
    // console.log('fullPath', fullPath);
    let depthHit = maxDepth > 0 && depth >= maxDepth;
    if (!fs.lstatSync(fullPath).isDirectory() || depthHit) {
      // Add simple files to nfiles array
      add_node(nodes, filePath, name, parent);
      continue;
    }
    // Entry is a directory, add contents to files array
    let dfiles = fs.readdirSync(fullPath);
    if (!dfiles) {
      console.log('fs.readdirSync no files', fullPath);
      continue;
    }
    let nnode = add_node(nodes, filePath, name, parent, []);
    for (let dfile of dfiles) {
      if (dfile.substring(0, 1) == '.') continue;
      let nfilePath = path.join(filePath, dfile);
      files.push({ filePath: nfilePath, name: dfile, parent: nnode, depth: depth + 1 });
    }
  }
  return nodes;
}

function add_node(nodes, filePath, name, parent, children) {
  let nnode = { filePath, name, parent };
  if (children) {
    nnode.children = children;
  }
  if (parent) {
    parent.children.push(nnode);
  }
  nodes.push(nnode);
  return nnode;
}

export function isSourceFileType(fname) {
  fname = fname.toLowerCase();
  return fname.endsWith('.js') || fname.endsWith('.html') || fname.endsWith('.css');
}

// Return last path component to use as sketch name
//  or --name if present
export function sourceName(my, source_folder) {
  if (my.arg_name) {
    return my.arg_name;
  }
  let name = '';
  if (source_folder) {
    let index = source_folder.lastIndexOf('/');
    if (index >= 0) {
      name = source_folder.substring(index + 1);
    }
  }
  return name;
}
