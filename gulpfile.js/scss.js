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
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

/**
 * Task
 */
function scss() {
    return src(paths.src.scss)
        .pipe(plumber({
            errorHandler: function(err) {
                if (process.env.ENVIRONMENT == 'development') {
                    notify.onError({
                        title: "Error on: scss",
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
        .pipe(gulpif(process.env.ENVIRONMENT == 'production', sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError), sass({
            outputStyle: 'expanded'
        }).on('error', sass.logError)))
        .pipe(gulpif(process.env.ENVIRONMENT == 'production', postcss([
            autoprefixer({
                browsers: ['last 1 version']
            })
        ])))
        .pipe(gulpif(process.env.ENVIRONMENT == 'development', sourcemaps.write('./')))
        .pipe(dest(paths.dist.css))
        .pipe(gulpif(process.env.ENVIRONMENT == 'development', bs.stream()));
}

exports.scss = scss;
