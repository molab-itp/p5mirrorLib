//
const path = require('path');

function init(my) {
  my.user_name = user_name = process.env.USER_NAME || 'p5name';
  my.limit = -1;
  my.root_path = path.join(__dirname, '..');
  my.latestFlag = 1;
  my.updateFlag = 1;
  my.verboseFlag = 0;

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
}

module.exports.init = init;
