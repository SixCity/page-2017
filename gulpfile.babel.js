import pkg from './package.json';
import conf from './config.json';

const day = conf.start;
const title = conf[day].title;
const keywords = conf[day].keywords;
const description = conf[day].description;
const ID = conf[day].id;
const BUILD = conf[day].build;

const LOAD = conf[day].load;

const mincss = BUILD.css,
  minjs = BUILD.js,
  BuildPath = './build/';
const HostPath = `http://img.panlidns.com/cms/en/special/css/${ID}/`;


import gulp from 'gulp';
import sass from 'gulp-sass';
import minifycss from 'gulp-minify-css';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import notify from 'gulp-notify';
import autoprefixer from 'gulp-autoprefixer';
import ejs from "gulp-ejs";
import header from 'gulp-header';
import replace from 'gulp-replace';
import imagemin from 'gulp-imagemin'



const browserSync = require('browser-sync').create();
const reload = browserSync.reload;

const time = (new Date()).toJSON()


const banner = [
  '/*! ',
  '<%= pkg.description %> ',
  'v<%= pkg.version %> | ',
  `(c) ${new Date()} <%= pkg.homepage %> |`,
  ' <%= pkg.author %>',
  ' */',
  '\n'
].join('');


gulp.task('ejs', () => gulp.src(`./${day}/templates/index.ejs`)
  .pipe(ejs({
    title: title,
    keywords: keywords,
    description: description,
    mincss: mincss,
    minjs: minjs,
    path: BuildPath,
    time: time
  }))
  .pipe(rename('index.html'))
  .pipe(gulp.dest(`./${day}/`))
  .pipe(reload({ stream: true }))
  .pipe(notify({ message: 'ejs task complete' })))


gulp.task('host', () => gulp.src(`./${day}/templates/html/html.html`)
  .pipe(replace('./build/css/', HostPath))
  .pipe(gulp.dest(`./${day}/.tmp`))
  .pipe(rename('host.html'))
  .pipe(gulp.dest(`./${day}/`))
  .pipe(reload({ stream: true }))
  .pipe(notify({ message: 'host html task complete' })))


gulp.task('sass', () => gulp.src(LOAD.css)
  .pipe(sass().on('error', sass.logError))
  .pipe(autoprefixer({
    browsers: ['> 1%', 'Firefox <= 20', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'],
    cascade: false
  }))
  .pipe(rename(mincss))
  .pipe(minifycss())
  .pipe(header(banner, { pkg }))
  .pipe(gulp.dest(`./${day}/build/css/`))
  .pipe(reload({ stream: true }))
  .pipe(notify({ message: 'Styles  task complete' })));


gulp.task('scripts', () => gulp.src(LOAD.js)
  .pipe(concat('main.js'))
  .pipe(rename(minjs))
  .pipe(uglify())
  .pipe(header(banner, { pkg }))
  .pipe(gulp.dest(`./${day}/build/js/`))
  .pipe(reload({ stream: true }))
  .pipe(notify({ message: 'Scripts task complete' })));

gulp.task('libs', () => gulp.src(LOAD.libs)
  .pipe(concat('libs.js'))
  .pipe(rename('libs.js'))
  .pipe(uglify())
  .pipe(header(banner, { pkg }))
  .pipe(gulp.dest(`./${day}/build/js/`))
  .pipe(reload({ stream: true }))
  .pipe(notify({ message: 'Scripts task complete' })));

gulp.task('html', () => {
  gulp.src(`./${day}/*.html`)
    .pipe(reload({ stream: true }))
});


gulp.task('home', () => gulp.src('./home/scss/main.scss')
  .pipe(sass({ style: 'expanded' }))
  .pipe(autoprefixer('last 10 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
  .pipe(gulp.dest('./home/css'))
  .pipe(rename({ suffix: '.min' }))
  .pipe(minifycss())
  .pipe(gulp.dest('./home/css/'))
  .pipe(reload({ stream: true }))
  .pipe(notify({ message: 'home style  task complete' })));


gulp.task('homeHtml', () => {
  gulp.src('./*.html')
    .pipe(reload({ stream: true }))
});


gulp.task('img', () => gulp.src(`./${day}/src/img/*`)
  //   .pipe(imagemin())
  .pipe(gulp.dest(`./${day}/build/img/`))
  .pipe(notify({ message: 'imgs task complete' })));


// 静态服务器 + 监听 scss/html 文件
gulp.task('dev', ['sass', 'libs', 'scripts'], () => {

  browserSync.init({
    server: `./${day}/`
  });

  // 看守.scss 档
  gulp.watch(`./${day}/src/scss/**/*.scss`, ['sass']);
  gulp.watch(`./${day}/src/scss/*.scss`, ['sass']);
  gulp.watch('./home/scss/*.scss', ['home']);
  // 看守所有.js档
  gulp.watch(`./${day}/*.js`, ['scripts']);
  gulp.watch(`./${day}/src/js/*.js`, ['html', 'scripts']);

  // 看守所有.html
  gulp.watch(`./${day}/*.html`).on('change', reload);
  gulp.watch('./*.html').on('change', reload);

  gulp.watch([`./${day}/templates/*.html`, `./${day}/templates/*.ejs`, `./${day}/templates/html/*.html`], ['ejs']);

});


gulp.task('default', ['dev', 'ejs']);