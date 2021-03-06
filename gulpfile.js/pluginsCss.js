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
const concat = require("gulp-concat");
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

/**
 * Task
 */
function pluginsCss() {
    return src(paths.src.pluginsCSS)
        .pipe(plumber({
            errorHandler: function(err) {
                if (process.env.ENVIRONMENT == 'development') {
                    notify.onError({
                        title: "Error on: pluginsCss",
                        message: "<%= error %>"
                    })(err);
                } else if (process.env.ENVIRONMENT == 'production') {
                    console.error(err);
                }

                this.emit('end');
            }
        }))
        .pipe(newer(paths.dist.css))
        .pipe(gulpif(process.env.ENVIRONMENT == 'development', sourcemaps.init()))
        .pipe(concat('vendor.css'))
        .pipe(gulpif(process.env.ENVIRONMENT == 'production', postcss([
            autoprefixer({
                browsers: ['last 1 version']
            }),
            cssnano()
        ])))
        .pipe(gulpif(process.env.ENVIRONMENT == 'development', sourcemaps.write('./')))
        .pipe(dest(paths.dist.css))
        .pipe(gulpif(process.env.ENVIRONMENT == 'development', bs.stream()));
}

exports.pluginsCss = pluginsCss;
