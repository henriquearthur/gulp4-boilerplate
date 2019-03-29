/**
 * Dependencies
 */
const {
    paths
} = require('./config');

const bs = require('./browserSync').bs;

const {
    src,
    dest
} = require('gulp');

const plumber = require('gulp-plumber');
const newer = require('gulp-newer');
const gulpif = require('gulp-if');
const order = require("gulp-order");
const concat = require("gulp-concat");
const uglify = require('gulp-uglify');

/**
 * Task
 */
function pluginsJavascript() {
    return src(paths.src.pluginsJS)
        .pipe(plumber())
        .pipe(newer(paths.dist.scripts))
        .pipe(order(['jquery.js', '*']))
        .pipe(concat('vendor.js'))
        .pipe(gulpif(process.env.ENVIRONMENT == 'production', uglify()))
        .pipe(dest(paths.dist.scripts))
        .pipe(gulpif(process.env.ENVIRONMENT == 'development', bs.stream()));
}

exports.pluginsJavascript = pluginsJavascript;
