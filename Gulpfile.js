var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync');

gulp.task('sass', function(){
  gulp.src('./scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./css'));
});

gulp.task('copy-normalize', function(){
  gulp.src('./node_modules/normalize.css/normalize.css')
    .pipe(gulp.dest('./css'));
});

gulp.task('watches', function(){
  gulp.watch('./scss/*.scss', ['sass']);
});

gulp.task('browser-sync', function () {
   var files = [
      './*.html',
      './css/**/*.css'
   ];

   browserSync.init(files, {
      server: {
         baseDir: './'
      }
   });
});

gulp.task('default', ['copy-normalize','sass','watches','browser-sync']);