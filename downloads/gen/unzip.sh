cd "/Users/jht2/Documents/projects/2024/p5mo/p5mirror/p5mirrorLib/downloads/../p5projects"
pwd

cd ..
# remove redundant p5.js p5.sound.min.js
rm -f p5projects/*/p5.*
# sync last_updatedAt.txt
cd downloads/json
if [ -e pending_updatedAt.txt ]; then
  rm -f last_updatedAt.txt
  mv pending_updatedAt.txt last_updatedAt.txt
fi
echo