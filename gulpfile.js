const gulp = require('gulp');
const connect = require('gulp-connect');
const del = require('del');
const concat = require('gulp-concat');
const order = require('gulp-order');
const useref = require('gulp-useref');

const pathTo = {
    root: './',
    dist: 'dist',
    html: 'src/index.html',
    css: 'src/*.css',
    js: 'src/js/*.js'
}

gulp.task('serve', () => {
    connect.server({
        port: 3000,
        root: pathTo.root,
        livereload: true
    });
});

gulp.task('html', () => {
    gulp.src(pathTo.html)
        .pipe(useref())
        .pipe(gulp.dest(pathTo.root))
        .pipe(connect.reload());
});

gulp.task('css', () => {
    gulp.src(pathTo.css)
        .pipe(concat('styles.css'))
        .pipe(gulp.dest(pathTo.dist))
        .pipe(connect.reload());
});

gulp.task('js', () => {
    gulp.src(pathTo.js)
        .pipe(order([
            'src/js/game.js',
            'src/js/gameEntity.js',
            'src/js/engine.js',
            'src/js/ball.js',
            'src/js/player.js',
            'src/js/effect.js',
            'src/js/bonusBox.js',
            'src/js/view.js',
            'src/js/main.js',
        ]))
        .pipe(concat('app.js'))
        .pipe(gulp.dest(pathTo.dist))
        .pipe(connect.reload());
});

gulp.task('watch', () => {
    gulp.watch(pathTo.html, ['html'])
    gulp.watch(pathTo.js, ['build']);
    gulp.watch(pathTo.css, ['css']);
});

gulp.task('del', () => {
    del(['dist', 'index.html']);
});

gulp.task('default', ['serve', 'watch']);
gulp.task('build', ['html', 'css', 'js']);