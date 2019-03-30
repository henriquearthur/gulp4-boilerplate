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
const imagemin = require('gulp-imagemin');

/**
 * Task
 */
function pluginsImages() {
    return src(paths.src.pluginsIMG)
        .pipe(plumber({
            errorHandler: function(err) {
                if (process.env.ENVIRONMENT == 'development') {
                    notify.onError({
                        title: "Error on: pluginsImages",
                        message: "<%= error %>"
                    })(err);
                } else if (process.env.ENVIRONMENT == 'production') {
                    console.error(err);
                }

                this.emit('end');
            }
        }))
        .pipe(newer(paths.dist.images))
        .pipe(gulpif(process.env.ENVIRONMENT == 'production', imagemin()))
        .pipe(dest(paths.dist.images))
        .pipe(gulpif(process.env.ENVIRONMENT == 'development', bs.stream()));
}

exports.pluginsImages = pluginsImages;
