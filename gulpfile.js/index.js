const { src, series, parallel } = require('gulp');

const { clean } = require('./clean');
const { browserSync } = require('./browserSync');
const { sprites } = require('./sprites');
const { images } = require('./images');
const { pluginsImages } = require('./pluginsImages');
const { pluginsJavascript } = require('./pluginsJavascript');
const { pluginsCss } = require('./pluginsCss');
const { javascriptConcat } = require('./javascriptConcat');
const { javascriptEach } = require('./javascriptEach');
const { scss } = require('./scss');
const { fonts } = require('./fonts');
const { watcher } = require('./watcher');

exports.default = series(
    clean,
    //browserSync,
    sprites,
    parallel(images, pluginsImages, pluginsJavascript, pluginsCss, javascriptConcat, javascriptEach, scss, fonts),
    watcher
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
