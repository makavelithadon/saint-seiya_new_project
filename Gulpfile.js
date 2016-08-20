var reload = require('./gulp/tasks/browser-sync')();

var gulp = require('./gulp/index')([
    'markup',
    'styles',
    'scripts',
    'watch'
], reload);

gulp.task('default', gulp.series('watch'));
