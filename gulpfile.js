var gulp = require('gulp'),
    usemin = require('gulp-usemin'),
    wrap = require('gulp-wrap'),
    connect = require('gulp-connect'),
    watch = require('gulp-watch'),
    minifyCss = require('gulp-cssnano'),
    minifyJs = require('gulp-uglify'),
    concat = require('gulp-concat'),
    less = require('gulp-less'),
    rename = require('gulp-rename'),
    minifyHTML = require('gulp-htmlmin'),
    //ignore=require('gulp-ignore'),
    sass = require('gulp-sass');

var paths = {
    scripts: 'src/js/**/*.js',
    viewScripts: 'src/views/**/*.js',
    directiveTemplates: 'src/js/**/*.html',
    styles: 'src/less/**/*.*',
    images: 'src/img/**/*.*',
    templates: 'src/templates/**/*.html',
    index: 'src/index.html',
    viewsHtml: 'src/views/**/*.html',
    bower_fonts: 'src/components/**/*.{ttf,woff,eof,svg}',
    sass: 'src/sass/*.*',
    viewSass: 'src/views/**/*.scss',
    directiveHtml:'src/directives/**/*.html',
    directiveJS:'src/directives/**/*.js',
    directiveSCSS:'src/directives/**/*.scss'
};

/**
 * Handle bower components from index
 */


gulp.task('usemin', function() {
    return gulp.src(paths.index)
        .pipe(usemin({
            js: [minifyJs(), 'concat'],
            css: [minifyCss({keepSpecialComments: 0}), 'concat'],
        }))
        .pipe(gulp.dest('dist/'));
});


/*
gulp.task('usemin', function() {
    return gulp.src(paths.index)
        .pipe(usemin({
            js: ['concat'],
            css: [minifyCss({keepSpecialComments: 0}), 'concat'],
        }))
        .pipe(gulp.dest('dist/'));
});
*/

/**
 * Copy assets
 */
gulp.task('build-assets', ['copy-bower_fonts']);

gulp.task('copy-bower_fonts', function() {
    return gulp.src(paths.bower_fonts)
        .pipe(rename({
            dirname: '/fonts'
        }))
        .pipe(gulp.dest('dist/lib'));
});

/**
 * Handle custom files
 */
gulp.task('build-custom', ['custom-images', 'custom-js', 'custom-less', 'custom-templates','custom-templates-directives','view-templates','custom-sass']);

gulp.task('custom-images', function() {
    return gulp.src(paths.images)
        .pipe(gulp.dest('dist/img'));
});


gulp.task('custom-js', function() {
    return gulp.src([paths.scripts,paths.viewScripts,paths.directiveJS],{base:'src/'})
        .pipe(minifyJs())
        .pipe(concat('dashboard.min.js'))
        .pipe(gulp.dest('dist/js'));
});


/*
gulp.task('custom-js', function() {
    return gulp.src(paths.scripts)
        .pipe(concat('dashboard.min.js'))
        .pipe(gulp.dest('dist/js'));
});
*/

gulp.task('custom-less', function() {
    return gulp.src(paths.styles)
        .pipe(less())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('custom-sass', function() {
    return gulp.src([paths.sass,paths.viewSass,paths.directiveSCSS],{base:'src/'})
    //return gulp.src(paths.sass)
        .pipe(sass())
        .pipe(concat('main.css'))
        .pipe(gulp.dest('dist/sass'));
});

gulp.task('custom-templates', function() {
    return gulp.src(paths.templates)
        .pipe(minifyHTML())
        .pipe(gulp.dest('dist/templates'));
});

gulp.task('custom-templates-directives', function() {
    return gulp.src(paths.directiveTemplates)
        .pipe(minifyHTML())
        .pipe(gulp.dest('dist/templates'));
});

gulp.task('view-templates', function() {
    //return gulp.src(paths.viewsHtml)
    return gulp.src([paths.viewsHtml,paths.directiveHtml],{base:'src/'})
        .pipe(minifyHTML())
        .pipe(rename({dirname:''}))
        .pipe(gulp.dest('dist/templates'));
});

/**
 * Watch custom files
 */
gulp.task('watch', function() {
    gulp.watch([paths.images], ['custom-images']);
    gulp.watch([paths.styles], ['custom-less']);
    gulp.watch([paths.sass,paths.viewSass,paths.directiveSCSS], ['custom-sass']);
    gulp.watch([paths.scripts,paths.viewScripts,paths.directiveJS], ['custom-js']);
    gulp.watch([paths.templates], ['custom-templates']);
    gulp.watch([paths.index], ['usemin']);
    gulp.watch([paths.directiveTemplates], ['custom-templates-directives']);
    gulp.watch([paths.viewsHtml,paths.directiveHtml], ['view-templates']);
});

gulp.task('browser-sync',function(){
   browserSync.init({
       server:{
           baseDir:'dist'
       }
   }) ;
});

/**
 * Live reload server
 */
gulp.task('webserver', function() {
    connect.server({
        root: 'dist',
        livereload: true,
        port: 8888
    });
});

gulp.task('livereload', function() {
    gulp.src(['dist/**/*.*'])
        .pipe(watch(['dist/**/*.*']))
        .pipe(connect.reload());
});

/**
 * Gulp tasks
 */
gulp.task('build', ['usemin', 'build-assets', 'build-custom']);
gulp.task('default', ['build', 'webserver', 'livereload', 'watch'],function(done){
    browserSync.reload();
    done();
});