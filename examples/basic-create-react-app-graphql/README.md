# Basic Graph App with [create-react-app](https://github.com/facebookincubator/create-react-app)

| Setting | Value |
|---------|-------|
| Entry Point | `http://localhost:3001` |

## Development

Run application in development mode: `npm start`

But, first `yarn` to get All The Things

## Simulate Publishing

First, install some things:

- `yarn global add verdaccio`
  - http://www.verdaccio.org
  - a local npm registry, so you can publish and unpublish with impunity
- `yarn global add npmrc`
  - https://github.com/deoxxa/npmrc
  - a util for switching between npm registries
    - `npmrc -c local` to create a new registry
    - `npmrc local` to use that registry
    - `npm set registry http://localhost:4873`
    - `npmrc default` to switch back to the "normal" registry

Produce a build:     
- `npm run build`

Test the build, using Neo4j Desktop's development mode app:

- `yarn global add serve` - for convenient httpd
- `serve -s dist`
- Neo4j Desktop Settings
  - Enable development mode, yes!
  - Development Mode App Entry Point: http://localhost:5000
  - Development Mode App Root Path: `pwd` (then copy-and-past)

Publish to `verdaccio`, install with Neo4j Desktop:

- `npm publish`
- quit Neo4j Desktop
- edit the `graphApps.json` file to include an entry for your app
- restart Neo4j Desktop
- Enjoy!
