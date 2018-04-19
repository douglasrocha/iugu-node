const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('build', () =>
  gulp
    .src('lib/**/*.js')
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(gulp.dest('dist')));
