var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    cached = require('gulp-cached'),
    jade = require('gulp-jade'),
    rename = require('gulp-rename'),
    config = require('../config/config');

module.exports = function (reload) {
    return function () {
        var YOUR_LOCALS = {};
        return gulp.src(config.paths.jade)
            .pipe(plumber())
            .pipe(cached('html'))
            .pipe(jade({
                locals: YOUR_LOCALS,
                pretty:'\t'
            }))
            .pipe(gulp.dest(config.paths.app))
            .pipe(reload(config.browsersync.options));
    };
};
