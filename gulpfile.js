const gulp = require("gulp");
const sass = require("gulp-sass");
sass.compiler = require('node-sass');
const sourcemaps = require('gulp-sourcemaps');
const gulpif = require('gulp-if');
const del = require('del');
const newer = require('gulp-newer');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const notify = require('gulp-notify');
const cleanCSS = require('gulp-clean-css');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';


gulp.task("styles", function () {
    return gulp.src('src/sass/*.sass', '!src/sass/_*', {since: gulp.lastRun('styles')})
        .pipe(gulpif(isDevelopment, sourcemaps.init()))
        .pipe(sass())
        .on('error', notify.onError())
        .pipe(autoprefixer())
        .pipe(cleanCSS())
        .pipe(gulpif(isDevelopment, sourcemaps.write()))
        .pipe(gulp.dest('assets/css'))
		.pipe(browserSync.stream())
});
gulp.task('scripts',function () {
   return gulp.src('src/js/**/*.js',{since: gulp.lastRun('scripts')})
       .pipe(babel({
           presets: ['@babel/env']
        }))
       .pipe(uglify())
       .pipe(gulp.dest('assets/js'))
	   .pipe(browserSync.stream())
});
gulp.task('clean', function () {
   return del('assets');
});

gulp.task('copy',function () {
   return gulp.src('src/assets/**/*.*' ,{since:gulp.lastRun('copy')})
       .pipe(newer('assets'))
       .pipe(gulp.dest('assets'));
});

gulp.task('build', gulp.series('clean', 'styles' , 'copy' , 'scripts'));
gulp.task('watch', function () {
    gulp.watch('src/assets/**/*.*' , gulp.series('copy'));
    gulp.watch('src/sass/*.*' , gulp.series('styles'));
    gulp.watch('src/js/*.*' , gulp.series('scripts'));
});
gulp.task('serve', function () {
    browserSync.init({
        server: {
            basedir: 'assets',
            directory: true
        }
    });
    browserSync.watch('src/assets/**/*.*').on('change', browserSync.reload);
})
gulp.task('dev',
    gulp.series('build', gulp.parallel('watch', 'serve'))
);