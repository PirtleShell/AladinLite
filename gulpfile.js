const fs = require('fs');
const gulp = require('gulp');
const minifycss = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const insert = require('gulp-insert');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const runSequence = require('run-sequence');

gulp.task('minify-css', function() {
  return gulp.src('./src/css/*')
    .pipe(minifycss({
      compatibility: 'ie8'
    }))
    .pipe(rename('aladin.min.css'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('minify-js', function() {
  const copyright = [
    '/** AladinLite | (c) CDS - http://cds.u-strasbg.fr/ | license: GPLv3.0',
    '  * Written and maintained by Thomas Boch <cds-question@unistra.fr>',
    '  * SSL Fork by Robert Pirtle for https://laniakean.com',
    '  * Source code: https://github.com/PirtleShell/AladinLite */'
  ].join('\n') + '\n';
  return gulp.src('./dist/aladin.js')
    .pipe(uglify())
    .pipe(insert.prepend(copyright))
    .pipe(rename('aladin.min.js'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('concat-js', function() {

  const filenames = ['cds.js', 'json2.js', 'Logger.js', 'jquery.mousewheel.js',
    'RequestAnimationFrame.js', 'Stats.js', 'healpix.min.js', 'astroMath.js',
    'projection.js', 'coo.js', 'fits.js', 'CooConversion.js', 'Sesame.js',
    'HealpixCache.js', 'Utils.js', 'URLBuilder.js', 'MeasurementTable.js',
    'Color.js', 'AladinUtils.js', 'ProjectionEnum.js', 'CooFrameEnum.js',
    'Downloader.js', 'CooGrid.js', 'Footprint.js', 'Popup.js', 'Circle.js',
    'Polyline.js', 'Overlay.js', 'Source.js', 'ProgressiveCat.js', 'Catalog.js',
    'Tile.js', 'TileBuffer.js', 'ColorMap.js', 'HpxKey.js', 'HpxImageSurvey.js',
    'HealpixGrid.js', 'Location.js', 'View.js', 'Aladin.js'
  ];
  const files = filenames.map(name => './src/js/' + name);

  return gulp.src(files)
    .pipe(concat('aladin.js'))
    .pipe(gulp.dest('./dist/'));
});

// i have a deploy script that copies it to a testing environment
gulp.task('deploy', function() {
  if (fs.existsSync('./deploy.sh')) {
    require('child_process').exec('./deploy.sh');
  }
});

gulp.task('js', function(cb) {
  runSequence('concat-js', 'minify-js', cb);
});

gulp.task('deploy-css', function() {
  runSequence('minify-css', 'deploy');
});

gulp.task('deploy-js', function() {
  runSequence('js', 'deploy');
});

gulp.task('build', ['js', 'minify-css']);

gulp.task('watch', function() {
  gulp.watch('src/js/*.js', ['deploy-js']);
  gulp.watch('src/css/*.css', ['deploy-css'])
});

gulp.task('default', function(cb) {
  return runSequence(['deploy-css', 'deploy-js'], 'watch', cb);
});
