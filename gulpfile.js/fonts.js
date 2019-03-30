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

/**
 * Task
 */
function fonts() {
    return src(paths.src.fonts)
        .pipe(plumber({
            errorHandler: function(err) {
                if (process.env.ENVIRONMENT == 'development') {
                    notify.onError({
                        title: "Error on: fonts",
                        message: "<%= error %>"
                    })(err);
                } else if (process.env.ENVIRONMENT == 'production') {
                    console.error(err);
                }

                this.emit('end');
            }
        }))
        .pipe(newer(paths.dist.fonts))
        .pipe(dest(paths.dist.fonts))
        .pipe(gulpif(process.env.ENVIRONMENT == 'development', bs.stream()));
}

exports.fonts = fonts;
