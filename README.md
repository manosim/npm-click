Npm Click [![Build Status](https://travis-ci.org/manosim/npm-click.svg?branch=master)](https://travis-ci.org/manosim/npm-click)
=====================
Comparing NPM (dev)Dependencies. [www.npm.click](http://www.npm.click/)


<p align="center">
  <img src="https://raw.githubusercontent.com/ekonstantinidis/npm-click/master/src/images/logo-big-red.png" alt"NPM Click Logo" />
</p>


### Prerequisites

 - NPM
 - Gulp
 - ReactJS
 - Redux
 - Immutable JS

### Installation
You will need `http-server` installed globally to serve the website.

    npm install -g http-server
    npm install

### Development

    npm start
    npm run watch


### Tests (ES Lint)

    npm test


### Deployment
Travis CI does the job. For every commit on the `master` branch, Travis runs the builds and push to the `gh-pages` branch.
