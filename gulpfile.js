var gulp        = require('gulp');
var browserSync = require('browser-sync').create();

// Static server
gulp.task('default', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        port: 8080,
        files: ["*/**/*.*",
            "*.html"
        ]
    });
});

var inject = require('gulp-inject');
gulp.task('inject', function () {
    var target = gulp.src('./todoList.html');
    // It's not necessary to read the files (will speed up things), we're only after their paths:
    var sources =
        gulp.src([
            './todoList/todoList.js',
            './todoList/**/*.js'
        ],
        {read: false});

    return target.pipe(inject(sources))
        .pipe(gulp.dest('./'));
});