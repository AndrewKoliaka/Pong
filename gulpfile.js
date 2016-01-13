var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    browserSync = require('browser-sync');

const baseDir = 'app/';
gulp.task('serve', function () {
    browserSync({
         server: {baseDir:baseDir}
    });

    gulp.watch([baseDir + 'js/*.js', baseDir + 'index.html'],browserSync.reload)
});

gulp.task('jshint', function(){
    gulp.src(baseDir + 'js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('watch', function () {
    gulp.watch(baseDir + 'js/*.js', ['jshint']);
});

gulp.task('default', ['watch', 'serve']);
