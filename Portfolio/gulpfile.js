
// Grab node packages
var gulp = require('gulp');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var htmlmin = require('gulp-htmlmin');

gulp.task('compress', function() {
  gulp.src('JS/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/JS'))
  gulp.src('CSS/*.css')
    .pipe(cleanCSS({compatibility: 'ie10'}))
    .pipe(gulp.dest('dist/CSS'));
  gulp.src('*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'))
});

// Default Task
gulp.task('default', ['compress']);
