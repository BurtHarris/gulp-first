# gulp-first
Simple streaming object filter passes through only the first object received.

## install

    npm install -D gulp-first

## useage (in a gulpfile)

```javascript
var gulp = require('gulp');
var newer = require('gulp-newer');
var first = require('gulp-first');
var exec = require('gulp-exec');

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
        ;
})
```

This usage pattern will ensure that the `mvn` command is executed only once, to generate the .jar file, no matter how many source files have changed. 