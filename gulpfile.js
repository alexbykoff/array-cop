var gulp = require('gulp'),
    child_exec = require('child_process').exec;

// Task for generationg JSDoc
gulp.task('docs', function(done) {

    var settings = {
      docGenerator: "./node_modules/jsdoc/jsdoc.js",
      srcFile: "./src/array-cop.js",
      jsDocConfPath: "./jsdoc.json",
      docsOutputPath: "./docs"
    }

    child_exec('node '
                + settings.docGenerator
                + ' ' + settings.srcFile
                + ' -c ' + settings.jsDocConfPath
                + ' -d ' + settings.docsOutputPath, undefined, done);
});
