var gulp = require('gulp'),
    sass = require('gulp-sass'),
    plumber  = require('gulp-plumber'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    config = require('../config/config'),
    lec = require('gulp-line-ending-corrector');

module.exports = function (reload) {

    'use strict';

    return function () {

        return gulp.src(config.paths.scss + 'main.scss')
            .pipe(plumber())
            .pipe(sass(config.sass.options).on('error', sass.logError))
            .pipe(autoprefixer(config.autoprefixer))
            .pipe(rename(config.sass.rename))
            .pipe(lec({verbose:true, eolc: 'CRLF', encoding:'utf8'}))
            .pipe(gulp.dest(config.paths.css))
            .pipe(reload({stream:true}));

    };

};
