var gulp = require('gulp'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    config = require('../config/config'),
    plumber = require('gulp-plumber'),
    uglify = require('gulp-uglify');

module.exports = function (reload) {

    'use strict';

    return function () {

        return browserify(config.paths.scripts)
            .transform("babelify", {presets: ["es2015"]})
            .bundle()
            .on('error', function (err) {
                console.log(err.toString());
                this.emit("end");
            })
            .pipe(source('main.min.js'))
            .pipe(buffer())
            .pipe(plumber())
            //.pipe(uglify())
            .pipe(gulp.dest('./app/assets/js/'))
            .pipe(reload(config.browsersync.options));
    };

};
