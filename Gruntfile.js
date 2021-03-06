module.exports = function(grunt) {
  grunt.initConfig({


    rubyHaml: {
      dist: {
        files: grunt.file.expandMapping(['views/*.haml'], 'dist/', {
          rename: function(base, path) {
            return base + path.replace(/\.haml$/, '.html').replace('views/', '');
          }
        })
      }
    },

    sass: {
      dist: {
        files: {
          'dist/assets/stylesheets/main.css' : 'assets/stylesheets/main.scss'
        }
      }
    },

    watch: {
      haml: {
        files: ['views/**/*.haml'],
        tasks: ['rubyHaml']
      },
      sass: {
        files: ['assets/stylesheets/**/*.scss'],
        tasks: ['sass']
      },
      dist: {
        files: ['dist/assets/stylesheets/**/*.css', 'dist/**/*.html'],
        options: {
          livereload: true
        }
      }
    },

    connect: {
      server: {
        options: {
          port: 1337,
          base: 'dist'
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.task.loadNpmTasks('grunt-ruby-haml');
  grunt.task.loadNpmTasks('grunt-sass');

  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('default', ['rubyHaml', 'sass'])
  grunt.registerTask('server', ['connect', 'watch'])

}



