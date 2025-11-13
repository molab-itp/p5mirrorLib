// Keep track of duplicate names to suffix with count
let counts = {};

function fixForFileName(str) {
  // Map chars not happy in file name to ''
  str = str.replace(/[\/\\:*?"<>\{\}]/g, '');
  // compress multiple consecutive - or space to single
  str = str.replace(/\-+/g, '-');
  str = str.replace(/ +/g, ' ');
  let count = counts[str];
  if (!count) {
    counts[str] = 1;
    return str;
  }
  // let nstr = str + '-' + count;
  // counts[str] = count + 1;
  // return nstr;
  return str;
}

module.exports.fixForFileName = fixForFileName;
