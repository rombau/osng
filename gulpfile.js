var gulp = require('gulp');

var concat = require('gulp-concat');
var csso = require('gulp-csso');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var path = require('path');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var uglify = require('gulp-uglify');
var templatecache = require('gulp-angular-templatecache');

var SRC_DIR = 'source';
var DIST_DIR = 'mobile';

gulp.on('error', function (e) {
	throw (e);
});

gulp.task('css', function () {

	gulp.src('source/less/os-theme.less').pipe(less({
		paths : [path.resolve(__dirname, 'source/less'),path.resolve(__dirname, 'node_modules')]
	})).pipe(gulp.dest('source/assets/css')).pipe(autoprefixer({
		cascade : false
	})).pipe(csso()).pipe(rename({
		suffix : '.min'
	})).pipe(gulp.dest('mobile/assets/css'));
});

gulp.task('images', function () {

	gulp.src('source/assets/images/*').pipe(gulp.dest('mobile/assets/images'));
});

gulp.task('fonts', function () {

	gulp.src('node_modules/mobile-angular-ui/dist/fonts/*').pipe(gulp.dest('source/assets/fonts')).pipe(gulp.dest('mobile/assets/fonts'));
});

gulp.task('js', function () {

	gulp.src(
		['source/app.js',
			'source/app.*.js',
			'source/common/model/player.js',
			'source/common/model/team.js',
			'source/common/model/move.js',
			'source/common/model/trainer.js',
			'source/common/model/training.js',
			'source/common/services/*.js',
			'source/common/util/*.js',
			'source/components/login/*.js',
			'source/components/menu/*.js',
			'source/components/embedded/*.js',
			'source/components/office/*.js',
			'source/components/player/player.transformation.js',
			'source/components/player/player.webclient.js',
			'source/components/player/*.js',
			'source/components/move/move.transformation.js',
			'source/components/move/move.webclient.js',
			'source/components/move/*.js',
			'source/components/training/training.transformation.js',
			'source/components/training/training.webclient.js',
			'source/components/training/*.js',
			'!source/**/*.spec.js']).pipe(concat('os-app.min.js')).pipe(uglify()).pipe(gulp.dest('mobile'));
});

gulp.task('html', function () {

	gulp.src('source/index.html').pipe(replace('<base href="/source/" />', '<base href="/mobile/" />')).pipe(replace('os-theme.css', 'os-theme.min.css')).pipe(
		replace('\.\.\/node_modules/angular-i18n/', 'https://cdnjs.cloudflare.com/ajax/libs/angular-i18n/1.6.4/')).pipe(
		replace(/\.\.\/node_modules\/angular.*\/angular/g, 'https://ajax.googleapis.com/ajax/libs/angularjs/1.5.7/angular')).pipe(
		replace('\.\.\/node_modules/mobile-angular-ui/dist/js/mobile-angular-ui', 'https://cdnjs.cloudflare.com/ajax/libs/mobile-angular-ui/1.3.4/js/mobile-angular-ui')).pipe(
		replace('app.js', 'os-app.min.js')).pipe(replace(/.*src="app\..+\.js".*\r?\n|\r/g, '')).pipe(replace('templates.js', 'os-app.templates.js')).pipe(
		replace(/.*src="(common|components)(\/.+)+\.js".*\r?\n|\r/g, '')).pipe(gulp.dest(DIST_DIR));

	gulp.src(['source/**/*.html','!source/index.html']).pipe(templatecache('os-app.templates.js', {
		'module' : 'OnlineSoccer'
	})).pipe(gulp.dest('mobile'));
});

gulp.task('default', ['css','images','fonts','js','html']);
