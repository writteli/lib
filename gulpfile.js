const gulp = require('gulp')
const babelify = require('babelify')
const browserify = require('browserify')
const source = require('vinyl-source-stream')
const buffer = require('vinyl-buffer')
const gulpify = require('gulpify')
const streamify = require('gulp-streamify')
const uglify = require('gulp-uglify')

gulp.task('default', (done) => {
  browserify({
    entries: './src/index.js',
    insertGlobals: true,
    fullPaths: true
  })
    .transform(babelify, {
      presets: ['@babel/preset-env'],
      compact: false,
      global: true
    })
    .bundle()
    .pipe(source('index.min.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('dist'))
  done()
})
