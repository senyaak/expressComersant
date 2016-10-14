var gulp = require('gulp');
var clean = require('gulp-clean');
var ts = require('gulp-typescript');
var server = require('gulp-develop-server');
var tsConf = {
  moduleResolution: 'node',
  target: 'es5',
  noImplicitAny: false,
  rootDir: 'src/'
};

var tsProject = ts.createProject('tsconfig.json', tsConf);

gulp.task('default', ['public'], function () {
  return tsProject.src()
    .pipe(ts(tsProject))
    .js.pipe(gulp.dest('built'));
});

gulp.task('watch', ['default'], function () {
  server.listen({path: './built/server/app.js'});
  gulp.watch(['./app.js'], server.restart);
  var watcher = gulp.watch(
    ['src/**/*.ts', 'public/**/*'],
    {debounceDelay: 1500},
    ['server:restart'],
    server.restart
  );
  watcher.on('change', function (event) {
    console.log(`detected change in ${event.path}`);
  });
});

gulp.task('server:restart', ['default'], function () {
  server.restart(function () {});
});

gulp.task('clean', function () {
  return gulp.src('build/', {read: false})
    .pipe(clean());
});

gulp.task('public', ['clean'], function () {
  return gulp.src('./public/**/*')
  .pipe(gulp.dest('./built'));
});
