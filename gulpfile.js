const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat')
const uglify = require('gulp-uglify')
const browserSync = require('browser-sync').create();
// uglify minify es5 with uglify-js library (which is
// automaticaly installed). To use es6 first must install
// uglify-es (to work with ws6) and then use 'composer'
// command of gulp-uglify
const UglifyJS = require("uglify-es");
const composer = require('gulp-uglify/composer');
const jsMinify = composer(UglifyJS, console);

const htmlMinify = require('gulp-htmlmin');

const cleanCSS = require('gulp-clean-css');

const responsive = require('gulp-responsive-images');

const webp = require('gulp-webp');


gulp.task('styles', function(){
  return gulp.src('css/styles.css')
      .pipe(autoprefixer({
          browsers: ['last 2 versions'],
          cascade: false
      }))
      .pipe(cleanCSS())
      .pipe(gulp.dest('dist/css'))
});

gulp.task('htmls', function(){
    return gulp.src('*.html')
        .pipe(htmlMinify({collapseWhitespace: true,
                          removeComments: true}))
        .pipe(gulp.dest('dist'))
  });

gulp.task('scripts', function(){
    return gulp.src('js/**/*.js')
        .pipe(concat('all.js')) // concat
        .pipe(gulp.dest('dist/js'));
})

gulp.task('scripts_dist', function(){
    return gulp.src('js/**/*.js')
        .pipe(concat('all.js')) // concat
        .pipe(jsMinify())
        .pipe(gulp.dest('dist/js'));
})

gulp.task('copyImages', function(){
    return gulp.src('img/*.{jpg,png,webp,svg}')
        .pipe(gulp.dest('dist/img'));
})

/**
 * Export images to responsive resolutions.
 * Take images from img/originals directory.
 * Use only when images has been changed.
 */
gulp.task('responsiveImages', function(){
    return gulp.src('img/originals/*.{jpg,png}') // WARNING: can't be spaces between 'jpg,' and 'png'
        .pipe(responsive({
            '*.{jpg,png}':[
                { width: 360, suffix: "_360" },
                { width: 640, suffix: "_640" },
                { width: 800, suffix: "_800" },
                { width: 1280, suffix: "_1280" }
            ]
        }))
        .pipe(gulp.dest('img/'))
})

/**
 * Convert images to webp format.
 * Take the images from dist/img directory
 * Use only when images has been changed.
 */
gulp.task('convertToWEBP', () =>
    gulp.src('dist/img/*.{jpg,png}')
        .pipe(webp())
        .pipe(gulp.dest('dist/img/'))
);

gulp.task('default', gulp.series('styles', 'scripts', 'htmls', function(){

    browserSync.init({
        server: "./dist",
        browser: 'chrome'
    });

    gulp.watch("dist/*.html").on('change', browserSync.reload);
    gulp.watch("dist/css/*.css").on('change', browserSync.reload);

}));

