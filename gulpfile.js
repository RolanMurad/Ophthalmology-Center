// !Global Vars
const { src, dest, watch, parallel, series } = require('gulp');
const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');  
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify-es').default;
const autoprefixer = require('gulp-autoprefixer'); 
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const del = require('del');
const imagewebp = require('gulp-webp');
const fileinclude = require('gulp-file-include'); 
const plumber = require('gulp-plumber'); 
const notify = require('gulp-notify');
const gcmq = require('gulp-group-css-media-queries'); 
const webpHTML = require('gulp-webp-html'); 
var webpCss = require('gulp-webp-css');

//!Html INCLUDE
function html() {
  return src('src/*.html', '!' + 'src/_*.html')
    .pipe(plumber({
      errorHandler: notify.onError(error => ({
        title: "HTML",
        message: error.message
      }))
    }))
    .pipe(fileinclude()) 
    .pipe(webpHTML())
    .pipe(dest('dist/')) 
    .pipe(browserSync.stream())
}

// !SCSS to CCS 
function styles() {
  return src('src/scss/**/*.scss') 
    .pipe(plumber({
      errorHandler: notify.onError(error => ({
        title: "SCSS",
        message: error.message
      }))
    }))
    .pipe(scss({
      outputStyle: 'compressed' 
    }))
    .pipe(concat('style.min.css')) 
    .pipe(webpCss())
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 10 version'],
      grid: true
    }))
    .pipe(gcmq())
    .pipe(dest('src/css')) 
    .pipe(browserSync.stream()) 
}

// !Browsersync
function browsersync() {
  browserSync.init({
    server: {
      baseDir: ['./dist/', 'src/'] 
    }
  })
}

//!Scripts
function scripts() {
  return src([
    'node_modules/jquery/dist/jquery.js',//!Jquery Library
    'node_modules/slick-carousel/slick/slick.js',//!Slick-slider
    'node_modules/@fancyapps/ui/dist/fancybox.umd.js',//!Fancybox-popup
    'src/js/main.js',
  ])
    .pipe(plumber({
      errorHandler: notify.onError(error => ({
        title: "JS",
        message: error.message
      }))
    }))
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(dest('src/js'))
    .pipe(browserSync.stream())
}

//!Images
function images() {
  return src('src/images/**/*')
    .pipe(plumber({
      errorHandler: notify.onError(error => ({
        title: "Images",
        message: error.message
      }))
    }))
    .pipe(newer('dist/images'))
    .pipe(imagewebp())
    .pipe(dest('dist/images'))
    .pipe(src('src/images/**/*'))
    .pipe(newer('dist/images'))
    .pipe(imagemin([
      imagemin.gifsicle({ interlaced: true }),
      imagemin.mozjpeg({ quality: 75, progressive: true }),
      imagemin.optipng({ optimizationLevel: 5 }),
      imagemin.svgo({
        plugins: [
          { removeViewBox: true },
          { cleanupIDs: false }
        ]
      })
    ]
    ))
    .pipe(dest('dist/images'))
    .pipe(browserSync.stream())
}

//!Clean Dist
function cleanDist() {
  return del('dist')
}

//!Build
function build() {
  return src([
    'src/css/style.min.css',
    'src/fonts/**/*',
    'src/js/main.min.js',
    'src/html/**/*.html', 
  ], { base: 'src' })
    .pipe(dest('dist'))
}

// !Watching
function watching() {
  watch(['src/scss/**/*.scss'], styles);
  watch(['src/js/**/*.js', '!src/js/main.min.js'], scripts);
  watch(['src/images/**/*'], images);
  watch(['src/**/*.html'], html)
}

//!Callback functions
exports.styles = styles;
exports.watching = watching;
exports.browsersync = browsersync;
exports.scripts = scripts;
exports.cleanDist = cleanDist;
exports.images = images;
exports.html = html

exports.build = series(cleanDist, html, build);
exports.default = parallel(html, styles, scripts, images, browsersync, watching);   