[![npm version](https://badge.fury.io/js/gulp-first.svg)](https://badge.fury.io/js/gulp-first)
[![Build Status](https://travis-ci.org/BurtHarris/gulp-first.svg?branch=master)](https://travis-ci.org/BurtHarris/gulp-first)
[![GitHub issues](https://img.shields.io/github/issues/BurtHarris/gulp-first.svg)](https://github.com/BurtHarris/gulp-first/issues)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)


# gulp-first 
A Gulp plugin for passing through only the first object (source file) selected.

Used combination with `gulp-newer`, this filter will emit only the first file object 
if *any* of the files from a `gulp.src(...)` glob are newer than the target.  This can be useful with `gulp-exec` for many:1 build tasks where some external tool needs to be invoked if the target is out-of-date. 

    npm install -D gulp-first

## use (in a gulpfile)

```javascript
var gulp = require('gulp')
var newer = require('gulp-newer')
var first = require('gulp-first')
var exec = require('gulp-exec')

var paths = {
  src: ["pom.xml", "src/**/*", "resources/**/*", "test/**/*"],
  target: "target/antlr4-typescript-4.6-SNAPSHOT-complete.jar"
}

gulp.task('maven', function () {
  return gulp.src(paths.src, { read: false })
    .pipe(newer(paths.target))
    .pipe(first())
    .pipe(exec('mvn install -Dmaven.test.skip=true'))
    .pipe(exec.reporter())
})
```

This usage pattern will ensure that the `mvn` command is executed only once, to generate the .jar file, no matter how many source files have changed. 