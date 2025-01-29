"use strict";

// import settings from "./_settings.js";
const proxy = '';

import { dist, production } from "../gulpfile.js";
import scripts from "./scripts.js";
import styles from "./styles.js";
import images from "./images.js";
import sprites from "./sprites.js";
import favicons from "./favicons.js";
import html from "./html.js";
import copyAssets from "./assets.js";
import cms from "./cms.js";

const {src, dest, parallel, series, watch} = pkg;
import pkg from 'gulp';
import browserSync from "browser-sync";

function serve() {
    browserSync.init({
        server: proxy ? undefined : dist,
        proxy:  proxy || undefined,
        ghostMode: false,
        // ghostMode: { clicks: false },
        notify: false,
        online: true,
        // tunnel: 'yousutename', // Attempt to use the URL https://yousutename.loca.lt
    });

    watch(["./src/*.html", "./src/components/**/*.html", "./src/forms/*.html"], { usePolling: true }, !proxy ? html : series(html, cms));
    watch(["./src/css/**/*", "./src/forms/**/*", "./src/js/app/**/*", "./src/js/libs/**/*", "./src/fonts/**/*"], { usePolling: true }, !proxy ? copyAssets : series(copyAssets, cms));
    watch(['./src/img/**/*', './src/img_nocompress/**/*'], { usePolling: true }, !proxy ? images : series(images, cms));
    watch('./src/sprites/**/*.svg', { usePolling: true }, !proxy ? sprites : series(sprites, cms));
    watch('./src/favicon/favicon.*', { usePolling: true }, !proxy ? favicons : series(favicons, cms));
    watch(["./src/scss/**/*.scss", "./src/components/**/*.scss"], { usePolling: true }, !proxy ? styles : series(styles, cms));
    watch(["./src/js/**/*.js", "./src/components/**/*.js"], { usePolling: true }, !proxy ? scripts : series(scripts, cms));
}

export default serve;