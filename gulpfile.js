"use strick"
let gulp = require('gulp');
let browserSync = require('browser-sync').create()

function watchFiles(done) {
	gulp.watch('./**/*')
	done();
}

function Synk(done){
	browserSync.init({
		server:{
			baseDir:'./'
		},
		port: 5000
	});

	done();
}

gulp.task('default', gulp.parallel(watchFiles, Synk));

