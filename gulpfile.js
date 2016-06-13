var gulp = require('gulp'),
    gutil = require('gulp-util'),
    coffee = require('gulp-coffee');
    browserify = require('gulp-browserify');
    compass = require('gulp-compass');
    connect = require('gulp-connect');
    concat = require('gulp-concat');

var coffeeSources = ['components/coffee/tagline.coffee'];
var jsSources = [
    'components/scripts/rclick.js',
    'components/scripts/pixgrid.js',
    'components/scripts/tagline.js',
    'components/scripts/template.js'
];

var sassSources = ['components/sass/style.scss']
var htmlSources = ['builds/development/*.html']
var jsonSources = ['builds/development/js/*.json']

gulp.task('coffee', function() {
    gulp.src(coffeeSources) // Get source files with gulp.src variable above
        .pipe(coffee({ bare: true }) // Sends it through a gulp plugin
            .on('error', gutil.log)) // on error log the error
        .pipe(gulp.dest('components/scripts')) // Outputs the file in the destination folder
});

gulp.task('js', function() {
    gulp.src(jsSources) // Get source files with gulp.src variable above
        .pipe(concat('script.js')) // Sends it through a gulp plugin
        .pipe(browserify())
        .pipe(gulp.dest('builds/development/js')) // Outputs the file in the destination folder
        .pipe(connect.reload()) // Run connect task and reload page
});

gulp.task('compass', function() {
    gulp.src(sassSources) // Get source files with gulp.src variable above
        .pipe(compass({
            sass: 'components/sass',
            images: 'builds/development/images',
            style: 'expanded'
        }) // Sends it through a gulp plugin
        .on('error', gutil.log))
        .pipe(gulp.dest('builds/development/css')) // Outputs the file in the destination folder
        .pipe(connect.reload()) // Run connect task and reload page
});

gulp.task('watch', function() {
    gulp.watch(coffeeSources, ['coffee']) // Monitor these files
    gulp.watch(jsSources, ['js']) // Monitor these files
    gulp.watch('components/sass/*.scss', ['compass']) // Monitor these files
    gulp.watch(htmlSources, ['html']);
    gulp.watch(jsonSources, ['json']);
});

gulp.task('connect', function() {
    connect.server({
        root: 'builds/development/',
        livereload: true
    });
});

gulp.task('html', function() {
    gulp.src(htmlSources) // Get source files with gulp.src variable above
    .pipe(connect.reload()) // Run connect task and reload page
});

gulp.task('json', function() {
    gulp.src(jsonSources) // Get source files with gulp.src variable above
    .pipe(connect.reload()) // Run connect task and reload page
});

gulp.task('default', ['html', 'json', 'coffee', 'js', 'compass', 'connect', 'watch']);
