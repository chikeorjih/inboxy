module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt, {pattern: ['grunt-*', 'assemble']});
  var package = grunt.file.readJSON('package.json'); 

  grunt.initConfig({ 
    pkg : package,

    notify : {
      compiledSass : {
          options : {
            title : 'Sass Built',
            message : 'Sass has built successfully'
          }
      }
    }, 

    sass: {
      compile : {
        files: {
          'style.css': 'scss/style.scss'
        }
      }
    },

    watch: {
      sass: {
        files: ['scss/*.scss'],
        tasks: ['sass:compile','notify:compiledSass'],
        options: { livereload:35000 }
      }
    },

    connect: {
      server: {
        options: {
          port: grunt.option('port') || 7002,
          middleware: function(connect, options, middlewares) {
              middlewares.push(function(req, res, next) {
                var endpoint = {
                    "/api/payload": "api/inboxy.json"
                };
                var match = false;
                var fileToRead = "";

                Object.keys(endpoint).forEach(function(url) {
                    if (req.url.indexOf(url) == 0) {
                        match = true;
                        fileToRead = endpoint[url];
                    }
                });

                //no match with the url, move along
                if (match == false) {
                    return next();
                }

                res.end(grunt.file.read(fileToRead));

              });

              return middlewares;
          }
        }
      }
    }


  });

  grunt.registerTask('default', ['build']);
  grunt.registerTask('build', ['sass','notify:compiledSass']);
  grunt.registerTask('serve', ['connect', 'watch']);

}
