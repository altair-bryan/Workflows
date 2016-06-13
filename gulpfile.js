var gulp = require('gulp'),
    gutil = require('gulp-util'),
    coffee = require('gulp-coffee');
    browserify = require('gulp-browserify');
    concat = require('gulp-concat');

var coffeeSources = ['components/coffee/tagline.coffee'];
var jsSources = [
    'components/scripts/rclick.js',
    'components/scripts/pixgrid.js',
    'components/scripts/tagline.js',
    'components/scripts/template.js'
];

gulp.task('coffee', function() {
    gulp.src(coffeeSources) // Get source files with gulp.src
        .pipe(coffee({ bare: true }) // Sends it through a gulp plugin
            .on('error', gutil.log)) // on error log the error
        .pipe(gulp.dest('components/scripts')) // Outputs the file in the destination folder
});

gulp.task('js', function() {
    gulp.src(jsSources) // Get source files with gulp.src
        .pipe(concat('script.js')) // Sends it through a gulp plugin
        .pipe(browserify())
        .pipe(gulp.dest('builds/development/js')) // Outputs the file in the destination folder
});
