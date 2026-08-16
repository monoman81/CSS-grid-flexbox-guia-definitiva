// const {src, dest, watch, series, parallel} = require('gulp');
// const sass = require('gulp-sass')(require('sass'));
// const postcss = require('gulp-postcss');
// const autoprefixer = require('autoprefixer');
// const imagemin = require('gulp-imagemin');

import {src, dest, watch, series, parallel} from 'gulp';
import gulpSass from 'gulp-sass';
import * as dartSass from 'sass';
import postcss from 'gulp-postcss';
import autoprefixer from "autoprefixer";
import imagemin from 'gulp-imagemin';
import webp from 'gulp-webp';
import avif from 'gulp-avif';
import sourcemaps from 'gulp-sourcemaps';
import cssnano from 'cssnano';

const sass = gulpSass(dartSass);

export function css() {

    return src('src/scss/app.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({style: 'compressed'}))
        .pipe(postcss([ autoprefixer(), cssnano() ]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/css'));
}

export function imagenes(done) {
    src('src/img/**/*', {encoding: false})
        .pipe(imagemin({optimizationLevel: 3}))
        .pipe(dest('build/img'));
    done();
}

export function versionWebp() {
    const opciones = {
        quality: 50
    }
    return src('src/img/**/*.{jpg,png}', {encoding: false})
        .pipe(webp(opciones))
        .pipe(dest('build/img'));
}

export function versionAvif() {
    const opciones = {
        quality: 50
    }
    return src('src/img/**/*.{jpg,png}', {encoding: false})
        .pipe(avif(opciones))
        .on('error', function (err) {
            console.error('Error in gulp-avif:', err.message);
            this.emit('end'); // Keeps Gulp running
        })
        .pipe(dest('build/img'));
}

export function dev() {
    watch('src/scss/**/*.scss', css);
    watch('src/img/**/*.{jpg,png,svg,gif}', imagenes);
}

export default series(imagenes, versionWebp, versionAvif, css, dev);

// exports.css = css;
// exports.dev = dev;
// exports.imagenes = imagenes;
// exports.default = series(imagenes, css, dev);

