var gulp = require('gulp');
var clean = require('gulp-clean');
var ts = require('gulp-typescript');
var server = require('gulp-develop-server');
var tsConfServer = {
  target: 'es5',
  noImplicitAny: false
};
var tsConfClient = {
  target: 'es5',
  noImplicitAny: false
};
var tsProjectServer = ts.createProject('tsconfig.json', tsConfServer);
// var tsProjectClient = ts.createProject('tsconfig.json', tsConfClient);

gulp.task('default', ['public', 'compile:client'], function () {
  return;
});

gulp.task('compile:server', ['clean'], function () {
  return gulp.src(['src/server/**/*.ts', 'typings/index.d.ts'])
    .pipe(ts(tsConfServer))
    .js.pipe(gulp.dest('built/server/'));
});
gulp.task('compile:client', ['compile:server'], function () {
  return gulp.src(['src/client/**/*.ts', 'typings/index.d.ts'])
  .pipe(ts(tsConfClient))
  .js.pipe(gulp.dest('built/client/'));
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
  return gulp.src('built/**/*', {read: false})
    .pipe(clean());
});

gulp.task('public', ['clean'], function () {
  return gulp.src('./public/**/*')
  .pipe(gulp.dest('./built'));
});
