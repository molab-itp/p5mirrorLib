//
// https://github.com/processing/p5.js-web-editor
//  p5.js-web-editor/client/modules/IDE/reducers/files.js

import objectID from 'bson-objectid';
// import * as ActionTypes from '../../../constants';
import { defaultSketch, defaultCSS, defaultHTML } from './createDefaultFiles.js';

export const initialState = () => {
  const a = objectID().toHexString();
  const b = objectID().toHexString();
  const c = objectID().toHexString();
  const r = objectID().toHexString();
  return [
    {
      name: 'root',
      id: r,
      _id: r,
      children: [b, a, c],
      fileType: 'folder',
      content: '',
    },
    {
      name: 'sketch.js',
      content: defaultSketch,
      id: a,
      _id: a,
      isSelectedFile: true,
      fileType: 'file',
      children: [],
      filePath: '',
    },
    {
      name: 'index.html',
      content: defaultHTML,
      id: b,
      _id: b,
      fileType: 'file',
      children: [],
      filePath: '',
    },
    {
      name: 'style.css',
      content: defaultCSS,
      id: c,
      _id: c,
      fileType: 'file',
      children: [],
      filePath: '',
    },
  ];
};
