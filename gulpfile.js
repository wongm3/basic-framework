var gulp = require('gulp');
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var rename = require("gulp-rename");
var minimist = require('minimist');

var argsv = minimist(process.argv.slice(2));

gulp.task('styles', function() {
  gulp.src('src/core.scss')
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(gulp.dest('./css/'))
    .pipe(cssnano())
    .pipe(rename('core.min.css'))
    .pipe(gulp.dest("./css"));
});

gulp.task('default', function() {
  gulp.watch('src/**/*.scss',['styles']);
});

gulp.task('server', function () {
  var server = require('./server/basicFrameworkServer');
  server.start(argsv.root, argsv.port);
});