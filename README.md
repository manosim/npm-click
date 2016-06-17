Npm Click [![Build Status](https://travis-ci.org/ekonstantinidis/npm-click.svg?branch=master)](https://travis-ci.org/ekonstantinidis/npm-click)
=====================
Comparing NPM (dev)Dependencies.


<p align="center">
  <img src="https://raw.githubusercontent.com/ekonstantinidis/npm-click/master/src/images/logo-big.png" alt"NPM Click Logo" />
</p>


### Prerequisites

 - ReactJS
 - NPM
 - Grunt

### Installation
You will need `http-server` installed globally to serve the website. If you encounter any issues with `npm install`, then run `ulimit -n 512`.

    npm install -g http-server
    npm install

### Development

    npm run watch
    npm run serve


### Tests (JsxHint)

    npm test


### Deployment
Travis CI does the job. For every commit on the `master` branch, Travis runs the builds and push to the `gh-pages` branch.
