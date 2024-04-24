//

import 'dotenv/config';

import { init_argv } from './init/init_argv.js';
import { init_paths } from './init/init_paths.js';

export function init(my) {
  //
  init_argv(my);
  init_paths(my);

  my.projectId = my.arg_sketch || '-missing-';

  my.user_name = my.user_name;
  my.email = my.arg_email;
  my.password = my.arg_password;

  // my.root_json_path = `../downloads/json/`;
  // my.root_sketches_path = `../downloads/sketches`;

  my.test_delete_file = 'index.html';
  my.test_add_file = 'index.html';

  my.source_folder = my.arg_folder || 'video clock';
  // source/My Sketch --> My Sketch
  // if (!my.arg_name) {
  //   if (my.source_folder) {
  //     let index = my.source_folder.lastIndexOf('/');
  //     if (index >= 0) {
  //       my.arg_name = my.source_folder.substring(index + 1);
  //     }
  //   }
  // }

  if (my.verboseFlag) {
    console.log('my.user_name', my.user_name);
    console.log('my.email', my.email);
    console.log('my.password', my.password);
  }
}

// --
// 2024-04-11 16:02:45
// from Peter - Ziyuan Lin

// 2024-04-11 18:02:18
// Need to have email signin

// 2024-04-14 05:31:11
// Use .env for credentials
