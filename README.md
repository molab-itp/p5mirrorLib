# [github p5mirrorLib](https://github.com/molab-itp/p5mirrorLib.git)

# Mirror

- mirror your editor.p5js sketches in local repo
- implementation notes [notes/a-mirror-notes.txt](./notes/a-mirror-notes.txt)

```
# download, unzip, and generate index for a editor.p5js user p5name

bin/mirror.sh --user p5name

```

## Generated files

- [p5projects-index](./p5projects-index.md)

## Listings

- [downloads/gen/sketches_recent.md](./downloads/gen/sketches_recent.md)
- [downloads/gen/sketches.md](./downloads/gen/sketches.md)
- [downloads/gen/collections.md](./downloads/gen/collections.md)

# import

```
#
# download html,js,css AND media files to destination folder
#
# args: sketchID destination
#
bin/import.sh COK08srwr "source/My sketch"
```

# CRUD

- create-read-update-delete
- scripts to CRUD your editor.p5js account content!
- implementation notes [notes/a-crud-test.txt](./notes/a-crud-test.txt)

```
# add to .gitignore
.env
downloads
p5mirrorLib

# create .env file with credentials
# requires email signin
# github and google signin currently NOT supported
# eg.
nano .env
P5_USER=p5moLab
P5_EMAIL=p5moLab@gmail.com
P5_PASSWORD=XXXXXXXXX

# P5_EMAIL & P5_PASSWORD require to sign in to editor.p5js
#

git clone https://github.com/molab-itp/p5mirrorLib.git p5mirrorLib

# crud ops

alias crud=./p5mirrorLib/bin/crud.sh

crud export_new --folder "examples" --all

crud export_update --all

crud list

crud watermark --all

crud delete --sketch XXXXXX

crud delete --all


```
