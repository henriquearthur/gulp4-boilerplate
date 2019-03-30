/**
 * Dependencies
 */
const dotenv = require('dotenv').config();

/**
 * Paths
 */
const paths = {
    src: {
        fonts: 'web/assets/fonts/**/*.{eot,ttf,woff,woff2}',
        images: 'web/assets/images/**/*.{png,jpg,jpeg,gif,bmp}',
        scripts: 'web/assets/js/**/*.js',
        scriptsEach: 'web/assets/js/**/[^_]*.js',
        scriptsConcat: 'web/assets/js/**/_*.js',
        pluginsCSS: ['web/assets/plugins-css/**/*.css'],
        pluginsJS: ['web/assets/plugins-js/**/*.js'],
        pluginsIMG: 'web/assets/plugins-images/**/*.{png,jpg,jpeg,gif,bmp}',
        scss: 'web/assets/scss/**/*.scss',
        sprites: 'web/assets/sprites/**/*.png'
    },
    srcFolder: {
        fonts: 'web/assets/fonts',
        images: 'web/assets/images',
        scripts: 'web/assets/js',
        pluginsCSS: 'web/assets/plugins-css',
        pluginsJS: 'web/assets/plugins-js',
        pluginsIMG: 'web/assets/plugins-images',
        scss: 'web/assets/scss',
        sprites: 'web/assets/sprites'
    },
    dist: {
        fonts: 'public/assets/fonts',
        images: 'public/assets/images',
        scripts: 'public/assets/js',
        css: 'public/assets/css'
    },
    appView: ['web/templates/**/*.{php,html,phtml,twig,blade}']
};

exports.paths = paths;
