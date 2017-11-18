'use strict';

const gulp 					= require('gulp'),
			sass 					= require('gulp-sass'),
			sourcemaps 		= require('gulp-sourcemaps'),
			browserSync 	= require('browser-sync'),
			autoprefixer 	= require('gulp-autoprefixer'),
			uglify 				= require('gulp-uglify'),
			pump 					= require('pump'),
			concat 				= require('gulp-concat'),//wiredep = require('wiredep').stream;
			wiredep 			= require('wiredep')()


/* this tasks starts befor default */
const tasks = [
  'watchers',
  'js-copy',
  'css-copy',
  'plugins-copy',
  'sass',
];




gulp.task('browser-sync', function() {
    browserSync.init(['*.html','assets/dist/css/**/*.css'],{
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('sass', function () {
  return gulp.src('assets/src/scss/**/*.scss')
      .pipe(sourcemaps.init())
      .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
      .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
      .pipe(sourcemaps.write())
    .pipe(gulp.dest('assets/dist/css'));
});


gulp.task('js-copy', function(cb){
		var options = {};
		pump([
	      gulp.src('assets/src/js/**/*.js'),
	      concat('script.js'),
	      uglify(options),
				gulp.dest('assets/dist/js'),
	    ],
	    cb
	  );

});

gulp.task('css-copy', function(){
  return gulp.src('assets/src/css/**')
    .pipe( gulp.dest('assets/dist/css') );
});

gulp.task('plugins-copy', function(){
	const base = "assets/src/plugins/";
  return gulp.src(base + '**')
    .pipe( gulp.dest('assets/dist/plugins') );
});

gulp.task('watchers', function(){
  gulp.watch('assets/src/scss/**/*.scss',['sass']);
  gulp.watch('assets/src/css/**',['css-copy']);
  gulp.watch('assets/src/js/**',['js-copy']);
  gulp.watch('assets/src/plugins/**/*.*',['plugins-copy']);
});

gulp.task('default',tasks);