# [p5mirrorLib](https://github.com/molab-itp/p5mirrorLib.git)

## Generated files

- [p5projects-index](./p5projects-index.md)

### Listings

- [downloads/gen/sketches_recent.md](./downloads/gen/sketches_recent.md)
- [downloads/gen/sketches.md](./downloads/gen/sketches.md)
- [downloads/gen/collections.md](./downloads/gen/collections.md)

## Scripts

```

# download, unzip, and generate index
#
bin/mirror.sh --user p5name

# download projects newer than downloads/json/last_updatedAt.txt
bin/build.sh --user p5name

# limit to the n most recent projects
bin/build.sh --user p5name --limit 1

# gen scripts to download all projects
bin/build.sh --user p5name --full

# gen scripts to download current listing
# in downloads/json/sketches.json
bin/build.sh --user p5name --current

# download the projects
sh downloads/gen/download.sh

# unzip the projects
sh downloads/gen/unzip.sh

# generate markdown index of projects
bin/p5projects-index.sh --user p5name

# remove all derived files
bin/z-clean.sh

# display extra info for debugging
# --verbose

```
