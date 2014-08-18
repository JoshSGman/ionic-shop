var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var karma = require('gulp-karma');
var templateCache = require('gulp-angular-templatecache');

var paths = {
  cart : [
    './src/scripts/services.js',
    './src/scripts/directives.js',
    './src/scripts/templates.js',
    './src/scripts/app.js'
  ],
  dist : './dist/',
  testFiles : [
    'bower_components/**/angular.js',
    'bower_components/angular-mocks/angular-mocks.js',
    'bower_components/ionic/release/js/ionic.bundle.js',
    'bower_components/ionic/release/js/ionic-angular.js',
    'dist/ion-cart.js',
    'tests/**/*.js'
  ]
};

var cssPaths = {
  styles : [
    './src/styles/style.css'
  ],
  dist: './dist/styles'
};

gulp.task('test', function(){
  return gulp.src(paths.testFiles)
    .pipe(karma({
      configFile: 'tests/karma.conf.js',
      action: 'watch'
    }));
});

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

gulp.task('concatAndMinify',function(){
  gulp.src(paths.cart)
    .pipe(concat('ion-cart.js'))
    .pipe(gulp.dest(paths.dist))
    .pipe(concat('ion-cart.min.js'))
    .pipe(gulp.dest(paths.dist))
    .pipe(uglify())
    .pipe(gulp.dest(paths.dist));
});

gulp.task('cacheTemplates', function () {
    gulp.src('src/views/**/*.html')
        .pipe(templateCache('templates.js', {module: 'ionicShop.templates', standalone: true}))
        .pipe(gulp.dest('src/scripts'));
});

gulp.task('concatCSS', function(){
  return gulp.src(cssPaths.styles)
    .pipe(concat('ion-shop-styles.css'))
    .pipe(gulp.dest(cssPaths.dist));
});

gulp.task('minifyCSS', function(){
  return gulp.src(cssPaths.styles)
    .pipe(concat('ion-shop-styles.min.css'))
    .pipe(gulp.dest(cssPaths.dist));
});

gulp.task('uglifyCSS', function(){
  return gulp.src('./dist/styles/ion-shop-styles.min.css')
    .pipe(minifyCss())
    .pipe(gulp.dest(cssPaths.dist));
});

gulp.task('concatAndMinifyCSS', function(){
  gulp.src(cssPaths.styles)
    .pipe(concat('ion-shop-styles.css'))
    .pipe(gulp.dest(cssPaths.dist))
    .pipe(concat('ion-shop-styles.min.css'))
    .pipe(gulp.dest(cssPaths.dist))
    .pipe(minifyCss())
    .pipe(gulp.dest(cssPaths.dist));
});

gulp.task('default', ['concatAndMinify', 'concatAndMinifyCSS', 'test']);
