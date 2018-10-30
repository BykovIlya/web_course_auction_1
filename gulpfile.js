const pack = "build";

const gulp = require("gulp");
const less = require("gulp-less");
const cleanCSS = require('gulp-clean-css');
const cleanJS = require('gulp-uglify');
const del = require("del");
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const clean = ()=>del([pack]);
const pug = require('gulp-pug')
//const uglify = require('gulp-uglify-es').default;
const uglify = require('gulp-uglify');

function bin() {
    return gulp.src("bin/*.js")
    //.pipe(concat('app.js'))
        .pipe(babel()).pipe(cleanJS())
        .pipe(gulp.dest(`${pack}/bin`));
}
function data() {
    return gulp.src('public/lib/*.json')
        .pipe(gulp.dest(`${pack}/public/lib`));
}
function pics() {
    return gulp.src("public/images/*.*")
        .pipe(gulp.dest(`${pack}/public/images`))
}
function script(){
    return gulp.src("public/javascripts/*.*")
        .pipe(babel())
        .pipe(cleanJS())
        .pipe(gulp.dest(`${pack}/public/javascripts`))
}
function styles() {
    return gulp.src("public/stylesheets/*.less")
        .pipe(less())
        .pipe(cleanCSS())
        .pipe(gulp.dest(`${pack}/public/stylesheets`));
}
function SSL() {
    return gulp.src("ssl/*.*")
        .pipe(gulp.dest(`${pack}/ssl`))
}
function views() {
    return gulp.src("views/*.pug")
        //.pipe(pug())
        .pipe(gulp.dest(`${pack}/views`))
}

gulp.task("copy", gulp.parallel(bin, data, pics,
    script, styles, SSL, views));

gulp.task("default", gulp.series(clean, "copy"));
gulp.task("clean", clean);

gulp.task("watch", ()=>gulp.watch("public/stylesheets/*.less", styles));