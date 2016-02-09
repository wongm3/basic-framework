var gulp = require('gulp');
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var rename = require("gulp-rename");
var minimist = require('minimist');

var argsv = minimist(process.argv.slice(2));
var pkg = require('./package.json');

gulp.task

gulp.task('styles', function() {
  gulp.src('src/core.scss')
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(rename('core-' + pkg.version + '.css'))
    .pipe(gulp.dest('./css'))
    .pipe(cssnano())
    .pipe(rename('core-' + pkg.version + '.min.css'))
    .pipe(gulp.dest("./css"));
});

gulp.task('default', function() {
  gulp.watch('src/**/*.scss',['styles']);
});

gulp.task('server', function () {
  var server = require('./server/basicFrameworkServer');
  server.start(argsv.port);
});

gulp.task('change-version', function () {
  var changeVersion = require('./gulp/changeVersion');
  changeVersion.main(argsv.oldVersion, argsv.newVersion);
});