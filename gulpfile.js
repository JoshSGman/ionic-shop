var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

var paths = {
  cart : [
    './src/scripts/services.js',
    './src/scripts/directives.js',
    './src/scripts/app.js'
  ],
  dist : './dist/'
};

gulp.task('concat', function(){
  return gulp.src(paths.cart)
    .pipe(concat('ion-cart.js'))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('minify', function(){
  return gulp.src(paths.cart)
    .pipe(concat('ion-cart.min.js'))
    .pipe(gulp.dest(paths.dist));
});


gulp.task('uglify',function(){
  return gulp.src('./dist/ion-cart.min.js')
   .pipe(uglify())
   .pipe(gulp.dest(paths.dist));
});

gulp.task('default', ['concat', 'minify', 'uglify']);
