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
const notify = require("gulp-notify");
const newer = require('gulp-newer');
const gulpif = require('gulp-if');
const sourcemaps = require('gulp-sourcemaps');
const order = require("gulp-order");
const concat = require("gulp-concat");
const uglify = require('gulp-uglify-es').default;

/**
 * Task
 */
function pluginsJavascript() {
    return src(paths.src.pluginsJS)
        .pipe(plumber({
            errorHandler: function(err) {
                if (process.env.ENVIRONMENT == 'development') {
                    notify.onError({
                        title: "Error on: pluginsJavascript",
                        message: "<%= error %>"
                    })(err);
                } else if (process.env.ENVIRONMENT == 'production') {
                    console.error(err);
                }

                this.emit('end');
            }
        }))
        .pipe(newer(paths.dist.scripts))
        .pipe(gulpif(process.env.ENVIRONMENT == 'development', sourcemaps.init()))
        .pipe(order(['jquery-*.js', 'moment*.js', 'popper*.js', 'bootstrap*.js', '*']))
        .pipe(concat('vendor.js'))
        .pipe(uglify())
        .pipe(gulpif(process.env.ENVIRONMENT == 'development', sourcemaps.write('./')))
        .pipe(dest(paths.dist.scripts))
        .pipe(gulpif(process.env.ENVIRONMENT == 'development', bs.stream()));
}

exports.pluginsJavascript = pluginsJavascript;
