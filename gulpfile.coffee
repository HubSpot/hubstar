gulp = require('gulp')
coffee = require('gulp-coffee')
uglify = require('gulp-uglify')
rename = require('gulp-rename')
bower = require('gulp-bower')
gutil = require('gulp-util')

gulp.task 'bower', ->
  bower().pipe(gulp.dest('./bower_components'))

gulp.task 'coffee', ->
  try
    gulp.src('./coffee/*')
      .pipe(coffee().on('error', gutil.log))
      .pipe(gulp.dest('./js/'))
  catch e

gulp.task 'uglify', ->
  gulp.src('./js/stars.js')
    .pipe(uglify())
    .pipe(rename('stars.min.js'))
    .pipe(gulp.dest('./js/'))

gulp.task 'js', ->
  gulp.run 'coffee', ->
    gulp.run 'uglify', ->

gulp.task 'default', ->
  gulp.run 'bower', ->
    gulp.run 'js', ->

  gulp.watch './**/*.coffee', ->
    gulp.run 'js'

  gulp.watch './bower.json', ->
    gulp.run 'bower'

  gulp.watch './package.json', ->
    gulp.run 'js'
