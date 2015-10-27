var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

//restart the server if any js files change
gulp.task('dev:server', function () {
	nodemon({
		script: 'server.js',
		ext: 'js',
		ignore: ['gulp*']
	});
});
