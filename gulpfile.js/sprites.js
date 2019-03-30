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
const spritesmith = require('gulp.spritesmith');
const buffer      = require('vinyl-buffer');
const merge       = require('merge-stream');
const imagemin = require('gulp-imagemin');

/**
 * Task
 */
function sprites() {
    var spriteData = src(paths.src.sprites).pipe(spritesmith({
        imgName: '../images/sprite.png',
        cssName: '_sprite.scss'
    }));

    var imgStream = spriteData.img
    .pipe(plumber({
        errorHandler: function(err) {
            if (process.env.ENVIRONMENT == 'development') {
                notify.onError({
                    title: "Error on: sprites",
                    message: "<%= error %>"
                })(err);
            } else if (process.env.ENVIRONMENT == 'production') {
                console.error(err);
            }

            this.emit('end');
        }
    }))
    .pipe(buffer())
    .pipe(imagemin())
    .pipe(dest(paths.dist.images));

    var cssStream = spriteData.css
    .pipe(plumber({
        errorHandler: function(err) {
            if (process.env.ENVIRONMENT == 'development') {
                notify.onError({
                    title: "Error on: sprites",
                    message: "<%= error %>"
                })(err);
            } else if (process.env.ENVIRONMENT == 'production') {
                console.error(err);
            }

            this.emit('end');
        }
    }))
    .pipe(dest(paths.srcFolder.scss))
    .pipe(gulpif(process.env.ENVIRONMENT == 'development', bs.stream()));

    return merge(imgStream, cssStream);
}

exports.sprites = sprites;
