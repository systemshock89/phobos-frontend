"use strict";

import { dist, production } from "../gulpfile.js";

import pkg from 'gulp';
const {src, dest, parallel, series, watch} = pkg;
import version from "gulp-version-number";

function versionTask(){

    const versionConfig = {
        'value': '%MDS%',
        'append': {
            'key': 'v',
            'to': ['css', 'js', 'preload'],
            'cover' : 1,
        },
    };

    src('./netcat_template/template/main/Template.html')
        .pipe(version(versionConfig))
        .pipe(dest('./netcat_template/template/main/'));

    return src('./netcat_template/template/editing_objects/Template.html')
        .pipe(version(versionConfig))
        .pipe(dest('./netcat_template/template/editing_objects/'));
}

function versionNoneTask(){

    const versionConfig = {
        'value': '',
        'append': {
            'key': 'v',
            'to': ['css', 'js', 'preload'],
            'cover' : 1,
        },
    };

    src('./netcat_template/template/main/Template.html')
        .pipe(version(versionConfig))
        .pipe(dest('./netcat_template/template/main/'));

    return src('./netcat_template/template/editing_objects/Template.html')
        .pipe(version(versionConfig))
        .pipe(dest('./netcat_template/template/editing_objects/'));
}

export default versionTask;
export {versionNoneTask};