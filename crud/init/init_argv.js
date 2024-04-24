//

// console.log('process.env', process.env);
// console.log('process.env.P5_EMAIL', process.env.P5_EMAIL);

export function init_argv(my) {
  //
  my.user_name = process.env.P5_USER;
  my.arg_email = process.env.P5_EMAIL;
  my.arg_password = process.env.P5_PASSWORD;
  my.arg_verbose = process.env.P5_VERBOSE;
  my.limit = -1;
  my.latestFlag = 1;
  my.updateFlag = 1;
  my.verboseFlag = my.arg_verbose ? parseFloat(my.arg_verbose) : 0;
  my.cleanFlag = 0;
  my.idFlag = 0;
  my.allFlag = 0;

  for (let index = 0; index < process.argv.length; index++) {
    // console.log(index, process.argv[index]);
    let val = process.argv[index];
    if (val == '--root') {
      index++;
      my.root_path = process.argv[index];
    } else if (val == '--limit') {
      index++;
      my.limit = parseFloat(process.argv[index]);
    } else if (val == '--full') {
      my.updateFlag = 0;
    } else if (val == '--current') {
      my.latestFlag = 0;
    } else if (val == '--clean') {
      my.cleanFlag = 1;
    } else if (val == '--verbose') {
      my.verboseFlag = 1;
    } else if (val == '--id') {
      my.idFlag = 1;
    } else if (val == '--all') {
      my.allFlag = 1;
    } else if (val == '--name') {
      index++;
      my.arg_name = process.argv[index];
    } else if (val == '--sketch') {
      index++;
      my.arg_sketch = process.argv[index];
    } else if (val == '--user') {
      index++;
      my.user_name = process.argv[index];
    } else if (val == '--email') {
      index++;
      my.arg_email = process.argv[index];
    } else if (val == '--password') {
      index++;
      my.arg_password = process.argv[index];
    } else if (val == '--folder') {
      index++;
      my.arg_folder = process.argv[index];
    } else if (val == '--file') {
      index++;
      my.arg_file = process.argv[index];
    } else if (val == '--sketches') {
      index = collect_arg(my, 'arg_sketches', index);
    }
  }
  // console.log('');
}

function collect_arg(my, prop, index) {
  let arr = [];
  for (index; index < process.argv.length; index++) {
    let arg = process.argv[index];
    if (!arg.startsWith('--')) {
      arr.push(arg);
    }
  }
  my[prop] = arr;
  return index;
}
