var gulp = require('gulp'); // the streaming build system
var fs = require('fs'); // file system (file i/o)

// read the contents of a director
fs.readdirSync(__dirname + '/gulp').forEach(function (task) {
	require('./gulp/' + task);
});

gulp.task('dev', ['dev:server']);