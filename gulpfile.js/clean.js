/**
 * Dependencies
 */
const {
    paths
} = require('./config');

const del = require('delete');

/**
 * Task
 */
function clean(done) {
    return del([
        paths.dist.fonts,
        paths.dist.images,
        paths.dist.scripts,
        paths.dist.css,
        paths.srcFolder.scss + '/_sprite.scss'
    ], done);
}

exports.clean = clean;
