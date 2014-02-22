/**
 * Innernets Boilerplate Gulpfile v0.1.0
 * =====================================
 * By Mike Mitchell | @innernets
 */

'use strict';


/**
 * Dependencies
 * ============
 * Load our dependencies
 */

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');
var imagemin = require('gulp-imagemin');
var svgmin = require('gulp-svgmin');
var uglify = require('gulp-uglify');
var rev = require('gulp-rev');
var usemin = require('gulp-usemin');
var rimraf = require('gulp-rimraf');
var runSequence = require('run-sequence');


/**
 * Project Config
 * ==============
 */

// Set paths for files

var path = {

	// Build Paths

	build: {
		root: './build',
		css: './build/css',
		img: './build/images',
		js: './build/scripts'
	},

	// Development Paths

	dev: {
		root: './dev',
		css: './dev/css',
		sass: './dev/sass',
		img: './dev/images',
		js: './dev/scripts'
	}

};


/**
 * Gulp Task
 * =========
 * Clean up our build directory
 */

gulp.task( 'buildClean', function () {

	return gulp.src( path.build.root + '/*', { read: false } )
		.pipe( rimraf() )
	;

});


/**
 * Gulp Task
 * =========
 * Compile Sass to CSS, auto-prefix and minify for build
 */

gulp.task( 'buildStyles', function () {

	return gulp.src( path.dev.sass + '/*.scss' )
		.pipe( sass() )
		.pipe( autoprefixer( 'last 2 version' ))
		.pipe( minifycss() )
		.pipe( gulp.dest( path.dev.css ))
	;

});


/**
 * Gulp Task
 * =========
 * Help prevent caching issues, update paths, minify JS
 */

gulp.task( 'buildUsemin', function () {

	return gulp.src( path.dev.root + '/*.html' )
		.pipe( usemin({
			html: [],
			js: [ uglify(), rev() ],
			css: [ rev() ]
		}))
		.pipe( gulp.dest( path.build.root ))
	;

});


/**
 * Gulp Task
 * =========
 * Optimize Images
 */

gulp.task( 'buildImages', function () {

	return gulp.src( path.dev.img + '/*' )
		.pipe( imagemin() )
		.pipe( gulp.dest( path.build.img ))
	;

});


/**
 * Gulp Task
 * =========
 * Optimize SVG Images
 */

gulp.task( 'optimizeSVG', function () {

	return gulp.src( path.dev.img + '/*.svg' )
		.pipe( svgmin() )
		.pipe( gulp.dest( path.build.img ))
	;

});


/**
 * Gulp Task
 * =========
 * File Watcher
 */

gulp.task( 'watch', function () {

	// Watch for changes to Sass files

	gulp.watch( path.dev.sass + '/*', function(){

		// Compile Sass to CSS

		gulp.src( path.dev.sass +'/*.scss' )
			.pipe( sass() )
			.pipe( gulp.dest( path.dev.css ) )
		;

	});

});


/**
 * Gulp Task
 * =========
 * Build Task
 */

gulp.task( 'build', function () {

	runSequence( 'buildClean', [ 'buildStyles', 'buildImages', 'optimizeSVG' ], 'buildUsemin' );

});


/**
 * Gulp Task
 * =========
 * Default Task
 */

gulp.task( 'default', [ 'watch' ] );