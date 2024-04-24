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
- only files supported: .html, .js, .css
- editor.p5js account must be email sign on mode
- media files must be uploaded manually

## CRUD setup

```

# assuming you are in the directory/repo for you sketches
#
# add to .gitignore of your repo
.env
downloads
p5mirrorLib

# create .env file with credentials
# requires email signin
# github and google signin currently NOT supported
#
nano .env
P5_USER=p5moLab
P5_EMAIL=p5moLab@gmail.com
P5_PASSWORD=XXXXXXXXX

# P5_EMAIL & P5_PASSWORD require to sign in to editor.p5js
#

# clone this repository
#
git clone https://github.com/molab-itp/p5mirrorLib.git p5mirrorLib

# create alias the crud tool
#
alias crud=./p5mirrorLib/bin/crud.sh

# export all the sketches in examples folder to your editor.p5js account
# new sketches are created for each folder in examples
#
crud export_new --folder "examples" --all

# update all the sketches in examples folder to your editor.p5js account
#
crud export_update --all

# show a list of all your sketches
#
crud list

```

## CRUD details

```
# create a sketch for the contents of folder examples/My sketch
#
crud export_new --folder "examples/My sketch"

# update a sketch for the contents of folder "examples/My sketch"
# sketch id XXXXXX
#
crud export_update --folder "examples/My sketch" --sketch XXXXXXX

# add watermark comment to all sketches
# first two lines of sketch.js
#
# // https://editor.p5js.org/p5name/sketches/XXXXXXX
# // My sketch
#
crud watermark --all

# delete a sketch with id XXXXXX
#
crud delete --sketch XXXXXX

# --
# respect the right to be forgotten
#
# !!@ danger !!@ danger !!@ danger
# !!@ delete all yhour sketches !!@
#
crud delete --all
```

- implementation notes [notes/a-crud-test.txt](./notes/a-crud-test.txt)
