module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['specs/server/**/*.js']
      }
    },

    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    uglify: {
      build: {
        src: '',
        dest: ''
      }
    },

    jshint: {
      files: [
        'server.js',
        'server/**/*.js',
        'specs/**/*.js'
      ],
      options: {
        force: 'true',
        jshintrc: '.jshintrc',
        ignores: [
          'lib/*.js',
          'server/public/**/*.js',
          'server/modules/faceRecognition/lib/**/*.js'
        ]
      }
    },

    cssmin: {
      build: {
        src: 'public/styles.css',
        dest: 'public/dist/style-min.css'
      }
    },

    watch: {
      scripts: {
        files: [
          'server.js',
          'server/**/*.js',
          'public/*.js'
        ],
        tasks: [
          'test'
        ]
      },
      css: {
        files: 'public/*.css',
        tasks: ['cssmin']
      }
    },
    concat: {   
      libs: {
        src: ['public/lib/underscore-min.js', 'public/lib/jquery.min.js', 'public/lib/bootstrap.min.css'],
        dest: 'public/dist/public-libs.js'
      }
    },

    shell: {
      options: {
        stderr: false
      },
      upToProdServer: {
        command: 'git push azure master'
      }
    },

    jsdoc : {
      dist : {
        src: ['server/**/*.js'],
        options: {
          destination: 'doc'
        }
      }
    }, 

    bowercopy: {
      libs: {
        options: {
          destPrefix: 'server/public/lib'
        },
        files: {
          'jquery.min.js': 'jquery/jquery.min.js',
          'jquery.min.map': 'jquery/jquery.min.map',
          'underscore-min.map': 'underscore/underscore-min.map',
          'underscore-min.js': 'underscore/underscore-min.js',
          'bootstrap.min.css': 'bootstrap/dist/css/bootstrap.min.css'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-jsdoc');
  grunt.loadNpmTasks('grunt-bowercopy');
  grunt.loadNpmTasks('grunt-npm-install');

  grunt.registerTask('server-dev', function (target) {
    // Running nodejs in a different process and displaying output on the main console
    var nodemon = grunt.util.spawn({
         cmd: 'grunt',
         grunt: true,
         args: 'nodemon'
    });
    nodemon.stdout.pipe(process.stdout);
    nodemon.stderr.pipe(process.stderr);

    grunt.task.run([ 'watch' ]);
  });

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('test', [
    'jshint',
    'mochaTest'
  ]);

  grunt.registerTask('build', [
    'npm-install',
    'bowercopy',
    'jshint',
    'mochaTest',
    'jsdoc'
  ]);

  grunt.registerTask('deploy', function(){
    grunt.task.requires('build');
    grunt.task.run(['shell:upToProdServer']);
    // add your deploy tasks here
  });
 
  grunt.registerTask('upload', function(n) {
    if(grunt.option('prod')) {
      // add your production server task here
      grunt.task.run(['deploy']);
    } else {
      grunt.task.run([ 'server-dev' ]);
    }
  });

  grunt.registerTask('default', ['build']);

  grunt.registerTask('all', ['build', 'upload']);

};
