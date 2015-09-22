var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
//var inject = require('gulp-inject');
var args = require('yargs').argv;
var $ = require('gulp-load-plugins')({lazy: true});

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

gulp.task('inject', function () {
    var target = gulp.src('./todoList.html');
    // It's not necessary to read the files (will speed up things), we're only after their paths:
    var sources =
        gulp.src([
            './todoList/todoList.js',
            './todoList/**/*.js'
        ],
        {read: false});

    return target.pipe($.inject(sources))
        .pipe(gulp.dest('./'));
});

gulp.task('vet', function() {
    log('Analyzing source with JSHint and JSCS');
    var source = ['*/**/*.js',
                    '!node_modules/**/*.*',
                    '!3rdParty/**/*.*'
    ];
    return gulp
        .src(source)
        .pipe($.if(args.verbose, $.print()))
        .pipe($.jscs())
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish', {verbose: true}))
        .pipe($.jshint.reporter('fail'));
});
gulp.task('help', $.taskListing);

////////////

function log(msg) {
    if (typeof(msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.blue(msg));
    }
}