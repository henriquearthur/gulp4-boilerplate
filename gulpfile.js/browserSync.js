/**
 * Dependencies
 */
const {
    paths
} = require('./config');

const bs = require('browser-sync').create();
const gulpif = require('gulp-if');

/**
 * Task
 */
function browserSync(done) {
    if (process.env.ENVIRONMENT == 'development') {
        bs.init({
            proxy: process.env.DOMAIN
        }, done);
    } else {
        done();
    }
}

exports.browserSync = browserSync;
exports.bs = bs;
