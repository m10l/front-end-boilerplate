# Front End Boilerplate

A good starting point

## Installation dependencies

* [Node.js](http://nodejs.org/)
* [Bower](http://bower.io/)
* [Gulp](http://gulpjs.com/)

## Setting up

1. Grab this repo `git clone https://github.com/m10l/front-end-boilerplate.git`
2. Install Node.js modules `npm install`
3. Install Bower dependencies `bower install`

##  Working

1. Run Gulp.js file watcher task `gulp`
2. Work on files in the development directory. Sass changes will be automatically compiled to CSS

If you want to add in any additional JavaScript files to the project, add them into the `<!-- build:js scripts/scripts.js -->` block in `index.html`

## Creating a Build

1. Create a build with Gulp.js: `gulp build`