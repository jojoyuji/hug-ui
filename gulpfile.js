'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var concatCss = require('gulp-concat-css');
var browserSync = require('browser-sync');

gulp.task('concat-js', function() {
  gulp.src(['./assets/js/*.js', './src/**/*.js'])
  .pipe(concat('hug-ui.js'))
  .pipe(gulp.dest('./dist/'));
});

gulp.task('concat-css', function() {
  gulp.src(['./assets/icons/style.css', './src/**/*.css'])
  .pipe(concatCss('hug-ui.css'))
  .pipe(gulp.dest('./dist/'));
});

// Static server
gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: './'
    }
  });
});

gulp.task('concat', ['concat-js', 'concat-css']);
gulp.task('default', ['browser-sync']);
