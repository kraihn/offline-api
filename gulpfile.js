var gulp = require('gulp'),
  nodemon = require('gulp-nodemon');

// The `default` task gets called when no task name is provided to Gulp
gulp.task('default', function () {
  nodemon({ script: './bin/www', ext: 'js', ignore: [] })
    .on('restart', function () {
      console.log('Server has been restarted.')
    })
});