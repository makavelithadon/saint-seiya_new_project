var gulp = require('gulp'),
    config = require('../config/config');

module.exports = function () {

    'use strict';

    return function () {
        gulp.watch(config.paths.scripts, gulp.series('scripts'));
        gulp.watch(config.paths.jade, gulp.series('markup'));
        gulp.watch(config.paths.scss + '**/*.+(scss|css)', gulp.series('styles'));
    };

};
