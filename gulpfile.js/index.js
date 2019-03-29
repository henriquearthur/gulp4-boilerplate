const { src, series, parallel } = require('gulp');

const { clean } = require('./clean');
const { browserSync } = require('./browserSync');
const { images } = require('./images');
const { pluginsImages } = require('./pluginsImages');
const { pluginsJavascript } = require('./pluginsJavascript');
const { pluginsCss } = require('./pluginsCss');

exports.default = series(
    clean,
    //browserSync,
    parallel(images, pluginsImages, pluginsJavascript, pluginsCss)
);

/*
gulp.task('default', function(callback) {
    runSequence(
        'clean',
        'browserSync',
        ['build:sprites', 'build:images'],
        ['build:pluginsCSS', 'build:pluginsJS', 'build:pluginsIMG', 'build:scss', 'build:js', 'build:fonts'],
        'watch',
        callback
        );
});
*/
