var gulp = require('gulp');
var sass = require('gulp-sass');

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

gulp.task('default', ['copy-normalize','sass','watches']);