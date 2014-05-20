/**
 * ======================================
 * Front End Boilerplate Gulp File v0.3.0
 * ======================================
 */

'use strict';


/**
 * Dependencies
 * =====================
 * Load our dependencies
 */

var gulp         = require('gulp');
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifycss    = require('gulp-minify-css');
var imagemin     = require('gulp-imagemin');
var svgmin       = require('gulp-svgmin');
var uglify       = require('gulp-uglify');
var rev          = require('gulp-rev');
var usemin       = require('gulp-usemin');
var rimraf       = require('gulp-rimraf');
var notify       = require('gulp-notify');
var runSequence  = require('run-sequence');
var liveReload   = require('gulp-livereload');


/**
* Project Configuration
* =====================
*/

var config = {

	path : {

		build : {
			root : 'build',
			css  : 'build/css',
			img  : 'build/images',
			js   : 'build/scripts'
		},

		dev : {
			root : 'development',
			css  : 'development/css',
			sass : 'development/sass',
			img  : 'development/images',
			js   : 'development/scripts'
		}

	},

	message : {
		sassCompilationComplete : '😻 Compiled Sass to CSS',
		sassCompilationError    : '🙀 Sass Error: ',
		cssMinificationComplete : '😻 Minified CSS',
		cssPrefixComplete       : '😻 Added CSS Prefixes',
		imgOptimComplete        : '😻 Optimized Raster Images',
		svgOptimComplete        : '😻 Optimized SVG Images'
	}

};


gulp.task( 'buildClean', function () {

	/**
	 * Gulp Task
	 * =========
	 * Clean up our build directory
	 */

	return gulp.src( config.path.build.root + '/*', { read: false } )
		.pipe( rimraf() )
	;

});


gulp.task( 'buildCopy', function () {

	/**
	 * Gulp Task
	 * =========
	 * Copy Files
	 */

	return gulp.src( config.path.dev.root + '/*.*' )
		.pipe( gulp.dest( config.path.build.root ))
	;

});


gulp.task( 'compileSass', function () {

	/**
	 * Gulp Task
	 * =========
	 * Compiles Sass to CSS in development directory
	 */

	return gulp.src( './' + config.path.dev.sass + '/*.scss' )
		.pipe( sass({
			onError: function( error ) {
				return notify().write(  config.message.sassCompilationError + error );
			}
		}))
		.pipe( gulp.dest( './' + config.path.dev.css ))
		.pipe( notify( config.message.sassCompilationComplete ))
	;

});


gulp.task( 'optimizeImages', function () {

	/**
	 * Gulp Task
	 * =========
	 * Optimize images in development directory, output to build directory
	 */

	return gulp.src( './' + config.path.dev.img  + '/*' )
		.pipe( imagemin() )
		.pipe( gulp.dest( './' + config.path.build.img ) )
		.pipe( notify( config.message.imgOptimComplete ) )
	;

});


gulp.task( 'optimizeSvg', function () {

	/**
	 * Gulp Task
	 * =========
	 * Optimize SVG in development directory, output to build directory
	 */

	return gulp.src( './' + config.path.dev.img  + '/*.svg' )
		.pipe( svgmin() )
		.pipe( gulp.dest( './' + config.path.build.img ) )
		.pipe( notify( config.message.svgOptimComplete ) )
	;

});


gulp.task( 'buildUsemin', function () {

	/**
	 * Gulp Task
	 * =========
	 * Help prevent caching issues, update paths, minify JS
	 */

	return gulp.src( config.path.dev.root + '/*.html' )
		.pipe( usemin({
			html: [],
			js: [ uglify(), rev() ],
			css: [ autoprefixer( 'last 2 version', 'ie 7', 'ie 8', 'ie 9' ), minifycss(), rev() ]
		}))
		.pipe( gulp.dest( config.path.build.root ))
	;

});


gulp.task( 'refreshBrowser', function () {

	/**
	 * Gulp Task
	 * =========
	 * Refresh Browser
	 */

	var server = liveReload();

	gulp.watch( config.path.dev.css + '/**/*' ).on('change', function( file ) {

		server.changed( file.path );
		
	});

});


gulp.task( 'watch', function () {

	/**
	 * Gulp Task
	 * =========
	 * File Watcher
	 */

	gulp.watch( config.path.dev.sass + '/**/*', [ 'compileSass' ] );

});


/**
 * Gulp Task
 * =========
 * Default Task
 */

gulp.task( 'default', [ 'compileSass', 'watch', 'refreshBrowser' ] );


gulp.task( 'build', function () {

	/**
	 * Gulp Task
	 * =========
	 * Build All The Things
	 */

	runSequence( 'buildClean', 'buildCopy', 'compileSass', [ 'optimizeImages', 'optimizeSvg' ], 'buildUsemin' );

});
