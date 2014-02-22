# Front End Boilerplate

This is a nice way to start most simple front end projects. We're using some basic ideas from H5BP, adding in Modernizr for feature detection, Sass for preprocessing our CSS and Gulp for running tasks to compile Sass to CSS on the fly and create builds.

## Setting Up

Before getting started, make sure you have node.js installed. If you don't you can grab it from http://nodejs.org/

If you have node.js, then...

1. Clone this repo: `git clone https://github.com/m10l/front-end-boilerplate.git NAMEOFPROJECT`
2. Install Node.js modules: `npm install`
3. Install Bower dependencies: `bower install`

That's it.

## How to Use

1. Run Gulp.js file watcher task: `gulp`
2. Work on files in the `dev` directory. Any changes to your Sass should automatically compile to CSS.

If you want to add in any additional JavaScript files to the project, add them into the `<!-- build:js scripts/scripts.js -->` block in `index.html`.

Run `gulp build` to create a build of your project.

Enjoy! :heart_eyes_cat:
