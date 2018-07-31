const gulp = require('gulp');
const babel = require('babelify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const browserSync = require('browser-sync');
const reload = browserSync.reload;
const notify = require('gulp-notify');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');

gulp.task('js', () => {
    browserify('dev/scripts/main.js', {debug: true})
        .transform('babelify', {
            sourceMaps: true,
            presets: ['env','react']
        })
        .bundle()
        .on('error',notify.onError({
            message: "Error: <%= error.message %>",
            title: 'Error in JS 💀'
        }))
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe(gulp.dest('public/scripts'))
});

gulp.task('styles', () => {
    return gulp.src('./dev/styles/**/*.scss')
        .pipe(sass().on('error', sass.logError))
            .pipe(autoprefixer('last 2 versions', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
        .pipe(concat('style.css'))
        .pipe(gulp.dest('./public/styles'))
});

gulp.task('bs', () => {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
});

gulp.task('default', ['js','bs', 'styles'], () => {
  gulp.watch('./dev/styles/**/*.scss', ['styles']); // matches line 12
  gulp.watch('./dev/scripts/main.js', ['js']); // matches line 19
  gulp.watch('./*.html', reload);
  gulp.watch('./public/styles/style.css', reload)
});