# Basic Java Executing Graph App


## Develop directly against the files

| Setting | Value |
|---------|-------|
| Entry Point | `file:///Users/me/work/neo4j-desktop-graph-app/examples/basic-java-executor/index.html` |
| Root Path | `/Users/me/work/neo4j-desktop-graph-app/examples/basic-java-executor` |


## Build into an npm package, and serve that

| Setting | Value |
|---------|-------|
| Entry Point | `http://localhost:5000` |
| Root Path | `/Users/me/work/neo4j-desktop-graph-app/examples/basic-java-executor` |

Build a distribution (you'll need `nodejs + npm`):

- `yarn install` - fetch the things needed to host the project as an npm package
- `yarn run build` - put things into a `dist` folder, ready to serve
- `yarn run serve-dist` - serve up the package
- Update Neo4j Desktop developer settings using the table above
