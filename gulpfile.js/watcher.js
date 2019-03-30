/**
 * Dependencies
 */
const {
    paths
} = require('./config');

const bs = require('./browserSync').bs;

const {
    src,
    dest,
    watch
} = require('gulp');

const { sprites } = require('./sprites');
const { images } = require('./images');
const { pluginsImages } = require('./pluginsImages');
const { pluginsJavascript } = require('./pluginsJavascript');
const { pluginsCss } = require('./pluginsCss');
const { javascriptConcat } = require('./javascriptConcat');
const { javascriptEach } = require('./javascriptEach');
const { scss } = require('./scss');
const { fonts } = require('./fonts');

const notifier = require('node-notifier');
const path     = require('path');

/**
 * Task
 */
function watcher() {
    if (process.env.ENVIRONMENT == "development") {
        watch(paths.src.pluginsCSS, pluginsCss);
        watch(paths.src.pluginsIMG, pluginsImages);
        watch(paths.src.pluginsJS, pluginsJavascript);

        watch(paths.src.scriptsEach, javascriptEach);
        watch(paths.src.scriptsConcat, javascriptConcat);

        watch(paths.src.sprites, sprites);
        watch(paths.src.fonts, fonts);
        watch(paths.src.scss, scss);
        watch(paths.src.images, images);

        watch(paths.appView, bs.reload);

        notifier.notify({
            title: 'Gulp',
            message: 'In watch mode',
            icon: path.join(__dirname, "/../node_modules/gulp-notify/assets/gulp.png")
        });
    }
}

exports.watcher = watcher;
