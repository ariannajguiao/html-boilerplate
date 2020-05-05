const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

// compile scss into css
function style() {
  // 1. where is my scss file
  return gulp.src('./stylesheets/**/*.scss')
    // 2. pass that file through sass compiler
    .pipe(sass().on('error', sass.logError))
    // 3, where do I save the compiled css?
    .pipe(gulp.dest('./css'))
    // 4. stream changes to all browsers
    .pipe(browserSync.stream());
}

function watch() {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
  gulp.watch('./stylesheets/**/*.scss', style);
  gulp.watch('./*.html').on('change', browserSync.reload);
  gulp.watch('./javascripts/**/*.js').on('change', browserSync.reload);
}

exports.style = style;
exports.watch = watch;