# React Boilerplate Model

This is a base project, created to serve as a slingshot for all of our future endeavors. This repo is already set up with folder structure, eslint, editor config and testing, as defined by the Mongeral Aegon Development Team Standards.

## Get the files

Clone this repo.

```
$ git clone git@bitbucket.org:mongeralaegon/react-boilerplate-model.git
```

## Folder Structure

```
app
└───core
│   └───controllers
│   └───helpers
│   └───models
│   └───services
└───src
|   |   index.js
|   │   index.spec.js
|   └───components
|   └───container
|   └───layouts
|   └───routes
|   └───views
└───webpack
|   │   webpack.config.default.js
|   |   webpack.config.dev.js  
|   │   webpack.config.props.js
└───server
|   │   index.js
|   |   renderRouter.js
└───view
|   │   index.js


.babelrc
.editorconfig
.eslintrc
.gitignore
mocha.config.js
mocha.opts
package.json
README.md
```

## Installation

All of our base dependencies are managed by NPM and are already in this package.json. Simply run:

```
$ npm install
```

## Development

Builds the application in dev mode and starts a webserver with hot reload. By default the webserver starts at port 3333.
Just run:

```
$ npm run dev
```

## Build

To run the build process:

```
$ npm run build
```

All the files will be at the build folder, at the root of the project.

## Tests

We've decided that all the tests will be siblings to their respective files. For example, a Header.js component will have a header.spec.js defining it behaviour in the same folder. To run tests:

```
$ npm test
```

We use [Mocha](https://mochajs.org/) and [Chai](http://chaijs.com/) as our test frameworks. We also use [Enzyme](https://github.com/airbnb/enzyme) for React component testing.

We also use [Istanbul](https://istanbul.js.org/) for coverage testing - check if everything is indeed tested, or covered - just run them with:

```
$ npm run cover
```

We use [Flow](https://flowtype.org) for put in the types of parametres and returns

```
$ npm start
```

Run project with server Render

