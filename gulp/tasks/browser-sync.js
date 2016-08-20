var browserSync = require('browser-sync').create(),
    reload = browserSync.reload,
    config = require('../config/config');

module.exports = function () {

    'use strict';

    browserSync.init(config.browsersync);

    return reload;

};
