var gulp = require('gulp');
var bump = require('gulp-bump');
var cssnano = require('gulp-cssnano');
var rename = require("gulp-rename");
var sass = require('gulp-sass');
var minimist = require('minimist');

var argsv = minimist(process.argv.slice(2));
var pkg = require('./package.json');

gulp.task('styles', function() {
  gulp.src('src/core.scss')
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(rename('core-' + pkg.version + '.css'))
    .pipe(gulp.dest('./dist/css'))
    .pipe(cssnano())
    .pipe(rename('core-' + pkg.version + '.min.css'))
    .pipe(gulp.dest("./dist/css"));
});

gulp.task('default', function() {
  gulp.watch('src/**/*.scss',['styles']);
});

gulp.task('server', function () {
  var server = require('./server/basicFrameworkServer');
  server.start(argsv.port);
});

gulp.task('change-version', function () {
  var bumpConfig = {
    indent: 2
  };

  if (argsv.version) {
    bumpConfig.version = argsv.version;
  }

  if (argsv.type) {
    bumpConfig.type = argsv.type;
  }

  gulp.src('package.json')
    .pipe(bump(bumpConfig))
    .pipe(gulp.dest('./'));
});