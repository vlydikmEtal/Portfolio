import gulp from 'gulp';
import plumber from 'gulp-plumber';
import sass from 'gulp-dart-sass';
import browser from 'browser-sync';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import csso from 'postcss-csso';
import rename from 'gulp-rename';
import svgo from 'gulp-svgmin';
import svgstore from 'gulp-svgstore';
import { deleteAsync } from 'del';
import optimizeImages from 'gulp-optimize-images';
import webp from 'gulp-webp';

// Styles
const styles = () => {
  return gulp.src('source/sass/style.scss', { sourcemaps: true })
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css', { sourcemaps: '.' }))
    .pipe(browser.stream());
};

// Copy CSS
const copyCss = () => {
  return gulp.src('source/css/*.css') // Assuming reset.css is located in source/css/
    .pipe(gulp.dest('build/css'));
};

// HTML
const html = () => {
  return gulp.src('source/*.html')
    .pipe(gulp.dest('build'));
};

// Scripts
const scripts = () => {
  return gulp.src('source/js/*.js') // Copy all JS files
    .pipe(gulp.dest('build/js'))
    .pipe(browser.stream());
};

// Optimize Images
const optimizeImagesAll = () => {
  return gulp.src('source/img/**/*')
    .pipe(optimizeImages({
      compressOptions: {
        jpeg: {
          quality: 80,
          progressive: true,
        },
        png: {
          quality: 90,
          progressive: true,
          compressionLevel: 6,
        },
        webp: {
          quality: 80,
        },
      }
    }))
    .pipe(gulp.dest('build/img'));
};

// Convert images to WebP
const imageWebp = () => {
  return gulp.src('source/img/**/*.{png,jpg}')
    .pipe(webp())
    .pipe(gulp.dest('build/img'));
};

// Copy Images
const copyImages = () => {
  return gulp.src('source/img/**/*.{png,jpg,webp,svg}')
    .pipe(gulp.dest('build/img'));
};

// SVG
const svg = () => {
  return gulp.src(['source/img/*.svg', '!source/img/icons/*.svg'])
    .pipe(svgo())
    .pipe(gulp.dest('build/img'));
};

// SVG Sprite
const sprite = () => {
  return gulp.src('source/img/icons/*.svg')
    .pipe(svgo())
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('build/img'));
};

// Copy other files
const copy = (done) => {
  gulp.src([
    'source/fonts/*.{woff2,woff}',
    'source/*.ico',
  ], {
    base: 'source'
  })
    .pipe(gulp.dest('build'));
  done();
};

// Clean build folder
const clean = async () => {
  return await deleteAsync(['build']);
};

// Watcher
const watcher = () => {
  gulp.watch('source/sass/**/*.scss', gulp.series(styles));
  gulp.watch('source/js/*.js', gulp.series(scripts)); // Watch for changes in all JS files
  gulp.watch('source/*.html', gulp.series(html, reload));
  gulp.watch('source/css/*.css', gulp.series(copyCss, reload));
  gulp.watch('source/img/**/*', gulp.series(copyImages, reload)); // Watch for changes in images
};

// Server
const server = (done) => {
  browser.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
};

// Reload browser
const reload = (done) => {
  browser.reload();
  done();
};

// Build task
export const build = gulp.series(
  clean,
  gulp.parallel(
    copy,
    copyCss,
    imageWebp,
    optimizeImagesAll
  ),
  gulp.parallel(
    styles,
    html,
    scripts,
    svg,
    sprite,
  ),
);

// Default task
export default gulp.series(
  clean,
  gulp.parallel(
    copy,
    copyCss,
    imageWebp,
    copyImages,
  ),
  gulp.parallel(
    styles,
    html,
    scripts,
    svg,
    sprite,
  ),
  gulp.series(
    server,
    watcher
  )
);