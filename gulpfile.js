var gulp = require('gulp');
var browserSync = require('browser-sync');

gulp.task('browser-sync', function() {
    browserSync.init(['app/*'], {
        /*
        I like to use a vhost, WAMP guide: https://www.kristengrote.com/blog/articles/how-to-set-up-virtual-hosts-using-wamp, XAMP guide: http://sawmac.com/xampp/virtualhosts/
        */
        proxy: 'localhost:3000'
        /* For a static server you would use this: */
        /*
        server: {
            baseDir: './'
        }
        */
    });
});

gulp.task('default', ['browser-sync']);