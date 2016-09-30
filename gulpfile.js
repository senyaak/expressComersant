var gulp = require('gulp');
var clean = require('gulp-clean');
var ts = require('gulp-typescript');
var tsConf = {
  moduleResolution: 'node',
  target: 'es5',
  noImplicitAny: false,
  rootDir: 'src/'
};

var tsProject = ts.createProject('tsconfig.json', tsConf);

gulp.task('default', ['clean'], function () {
  return tsProject.src()
    .pipe(ts(tsProject))
    .js.pipe(gulp.dest('built'));
});

gulp.task('clean', function () {
  return gulp.src('build/', {read: false})
    .pipe(clean());
});
