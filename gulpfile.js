var gulp          = require('gulp');
		less          = require('gulp-less'),
		path          = require('path'),
		minifyCss     = require('gulp-minify-css'),
		browserSync   = require('browser-sync'),
		gutil         = require('gulp-util'),
		autoprefixer  = require('gulp-autoprefixer'),
    sourcemaps    = require('gulp-sourcemaps'),
    spritesmith   = require('gulp.spritesmith');


/*==============================
=           Watcher            =
==============================*/
gulp.task('watch', ['less'], function() {
  browserSync.init({ server: "./" });
  gulp.watch("./less/**/*.less", ['less']);
  gulp.watch("./js/**/*.js", ['js']);
  gulp.watch("img/svg/**/*.svg", ['svgsprites']);
  gulp.watch("*.html").on('change', browserSync.reload);
});

/*=============================================
=            LESS and autoprefixer            =
=============================================*/
gulp.task('less', function () {
  return gulp.src('./less/**/style.less')
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream());
});

/*==================================
=            JavaScript            =
==================================*/
gulp.task('js', function() {
  return gulp.src('./js/**/*.js')
	  .pipe(gulp.dest('./js'))
    .pipe(browserSync.stream());
});
gulp.task('minify', ['less'], function() {
  return gulp.src('./css/*.css')
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('./css/min/'));
});
gulp.task('gulp-autoprefixer', ['less'], function () {
  return gulp.src('css/style.css')
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('dist'));
});

/*===========================
=            SVG            =
===========================*/
gulp.task('svgsprites', function() {
	gulp.src('./img/svg/**/*.svg')
		.pipe(svgsprites({
      shape: {
        dimension: {
          maxWidth: 32,
          maxHeight: 32,
          precision: 2
          //attributes: false
        }
      },
      mode: {
        symbol: {
          bust: false,
          sprite: 'inline-sprite.svg'
        }
      }
    }))
		.pipe(gulp.dest('./img/sprite'));
});

gulp.task('svgspriteless', function() {
  gulp.src('./img/svg/**/*.svg')
    .pipe(svgsprites({
      shape: {
        spacing: {
          padding: 1
        },
        dimension: {
          maxWidth: 32,
          maxHeight: 32,
          precision: 2
        }
      },
      mode: {
        css: {
          prefix: '.%s',
          dimensions: '%s',
          dest: './',
          sprite: 'sprite/sprite.svg',
          bust: false,
          render: {
            less: {
              dest: '../less/sprite.less'
            }
          }
        },
      }
    }))
    .pipe(gulp.dest('./img/'));
});

/*==================================
=            PNG SPRITE            =
==================================*/
gulp.task('sprite', function generateSpritesheets () {
  var spriteData = gulp.src('img/icons/**/*.png')
    .pipe(spritesmith({
      retinaSrcFilter: 'img/icons/**/*-2x.png',
      imgName: 'sprite.png',
      retinaImgName: 'sprite-retina.png',
      imgPath: '../img/sprite.png',
      retinaImgPath: '../img/sprite-retina.png',
      cssName: 'sprite.less'
    }));
  spriteData.img.pipe(gulp.dest('img/'));
  spriteData.css.pipe(gulp.dest('less/'));
});

gulp.task('default', ['watch']);