var gulp = require('gulp');

module.exports = function (tasks, reload) {

    tasks.forEach(function (task) {
        gulp.task(task, require('./tasks/' + task)(reload));
    });

    return gulp;
};
