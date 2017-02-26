var gulp = require('gulp');

var concat = require('gulp-concat');
var csso = require('gulp-csso');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var path = require('path');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var uglify = require('gulp-uglify');

var SRC_DIR = 'source';
var DIST_DIR = 'mobile';

gulp.on('error', function (e) {
	throw (e);
});

gulp.task('css', function () {
	
	gulp.src(path.join(SRC_DIR, 'less', 'os-theme.less'))
		.pipe(less({paths : [
			path.resolve(__dirname, path.join(SRC_DIR, 'less')),
			path.resolve(__dirname, 'node_modules')]}))
		.pipe(gulp.dest(path.join(SRC_DIR, 'css')))
		.pipe(autoprefixer({
            cascade: false
        }))
		.pipe(csso())
		.pipe(rename({suffix : '.min'}))
		.pipe(gulp.dest(path.join(DIST_DIR, 'css')));
});

gulp.task('images', function() {
	
	gulp.src(path.join(SRC_DIR, 'images', '*'))
		.pipe(gulp.dest(path.join(DIST_DIR, 'images')));
});

gulp.task('fonts', function() {
	
	gulp.src(path.join('node_modules', 'mobile-angular-ui', 'dist', 'fonts', '*'))
		.pipe(gulp.dest(path.join(SRC_DIR, 'fonts')))
		.pipe(gulp.dest(path.join(DIST_DIR, 'fonts')));
});

gulp.task('js', function () {

	gulp.src(path.join(SRC_DIR, 'js', '*.js'))
        .pipe(concat('os-app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(DIST_DIR));
});

gulp.task('html', function () {

    gulp.src(path.join(SRC_DIR, 'index.html'))
		.pipe(replace('<base href="/' + SRC_DIR + '/" />', '<base href="/' + DIST_DIR + '/" />'))
		.pipe(replace('os-theme.css', 'os-theme.min.css'))
		.pipe(replace(/\.\.\/node_modules\/angular.*\/angular/g, 'https://ajax.googleapis.com/ajax/libs/angularjs/1.5.7/angular'))
		.pipe(replace('\.\.\/node_modules/mobile-angular-ui/dist/js/mobile-angular-ui', 'https://cdnjs.cloudflare.com/ajax/libs/mobile-angular-ui/1.3.4/js/mobile-angular-ui'))
		.pipe(replace('js/app.js', 'os-app.min.js'))
		.pipe(replace(/.*src="js\/.+\.js".*\r?\n|\r/g, ''))
		.pipe(gulp.dest(DIST_DIR));
      
	gulp.src(path.join(SRC_DIR, 'templates', '*.html'))
		.pipe(gulp.dest(path.join(DIST_DIR, 'templates')));
});

gulp.task('default', ['css', 'images','fonts','js','html']);
