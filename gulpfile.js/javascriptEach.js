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
const uglify = require('gulp-uglify-es').default;

/**
 * Task
 */
function javascriptEach() {
    return src(paths.src.scriptsEach)
        .pipe(plumber({
            errorHandler: function(err) {
                if (process.env.ENVIRONMENT == 'development') {
                    notify.onError({
                        title: "Error on: javascriptEach",
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
        .pipe(uglify())
        .pipe(gulpif(process.env.ENVIRONMENT == 'development', sourcemaps.write('./')))
        .pipe(dest(paths.dist.scripts))
        .pipe(gulpif(process.env.ENVIRONMENT == 'development', bs.stream()));
}

exports.javascriptEach = javascriptEach;
