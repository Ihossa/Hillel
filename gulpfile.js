let gulp = require('gulp');
let less = require('gulp-less');
let fs = require('fs');
const babel = require('gulp-babel');
let  babelPresent = require('@babel/preset-env');
const concat = require('gulp-concat');
let autoprefixer = require('gulp-autoprefixer')
let browserSync = require('browser-sync').create();

function lessToCss(done) {
	gulp.src('./less/**/*.less')
	.pipe(less({
		errorLogToConsole: true
	}))
	.on('error', console.error.bind(console))
	.pipe(autoprefixer({
		cascade:false
	}))
	.pipe( gulp.dest('./dist'))

	.pipe(browserSync.stream());

	done();
}
function browserReload(done){
	browserSync.reload();
	done();
}

function es6ToEs5(done){
    gulp.src('./es6/**/*.js')
    .pipe(babel({presets: ['@babel/env']}))
    .pipe(gulp.dest('./dist'))


    done();

}

function clean(done) {
	if(fs.existsSync('./dist')){
		const files = fs.readdirSync('./dist');

		files.forEach(el => {
			fs.unlinkSync(`./dist/${el}`);
		});

		fs.rmdirSync(`./dist`);
	}

	done();
}



function syncBrowser(done){
	browserSync.init({
		server:{
			baseDir: './'
		},
		port: 3000
	})
	done();
}

function watchFiles(){
	gulp.watch('./less/**/*', lessToCss);
	gulp.watch('./es6/**/*', es6ToEs5);
	gulp.watch('./**/*.html', browserReload);
	gulp.watch('./**/*.js', browserReload);
}

gulp.task('default', gulp.parallel(clean, watchFiles, syncBrowser));
gulp.task(syncBrowser);