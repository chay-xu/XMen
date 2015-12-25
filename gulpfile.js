var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var upload = require('gulp-upload');

var paths = {
    scss: 'src/scss/*.scss',
    js: 'src/js/*.js'
}

gulp.task('sass', function () {
    gulp.src(
        'src/scss/*.scss'
    ).pipe(sass(
        {
            // outputStyle: 'compressed',
            bundleExec: true
        }
    ))
    .pipe(concat('XMen.css'))
    .pipe(gulp.dest('build/css'));
});

gulp.task('js', function () {
    gulp.src(
        'src/js/*.js'
    ).pipe(gulp.dest('build/js'));
});

gulp.task('watch', function() {
  gulp.watch(paths.scss, ['sass']);
  gulp.watch(paths.js, ['js']);
});