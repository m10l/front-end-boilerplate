# Front End Boilerplate

A good starting point

## Installation dependencies

Things you need to already have set up

* [Node.js](http://nodejs.org/) (if you use homebrew, just `brew install node`)
* [Bower](http://bower.io/) `npm install -g bower`
* [Gulp](http://gulpjs.com/) `npm install -g gulp`
* [httpster](http://simbco.github.io/httpster/) `npm install -g httpster`

## Setting up

1. Clone / pull/ grab this repo `git init && git pull https://github.com/m10l/front-end-boilerplate.git`
2. Install Node.js modules `npm install`
3. Install Bower dependencies `bower install`

##  Working

1. Run Gulp.js file watcher task `gulp`, or run `npm start` to watch files and spin up a simple development server ([httpster](http://simbco.github.io/httpster/))
2. Work on files in the development directory. Sass changes will be automatically compiled to CSS

If you want to add in any additional JavaScript files to the project, add them into the `<!-- build:js scripts/scripts.js -->` block in `index.html`

## Creating a Build

1. Create a build with Gulp.js: `gulp build`
