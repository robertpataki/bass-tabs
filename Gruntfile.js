'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// If you want to recursively match all subfolders, use:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  var pkg = require('./package.json');
  var config = require('./config.json').directories;

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    config: config,

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      js: {
        files: ['<%= config.app %>/scripts/{,*/}{,*/}{,*/}*.*'],
        tasks: ['requirejs:dev'],
        options: {
          livereload: true
        }
      },
      json: {
        files: ['<%= config.app %>/resources/{,*/}{,*/}{,*/}*.*'],
        tasks: ['requirejs:dev'],
        options: {
          livereload: true
        }
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      compass: {
        files: ['<%= config.app %>/styles/{,*/}{,*/}{,*/}*.{scss,sass}'],
        tasks: ['compass:server']
      },
      jekyll: {
        files: [
          '<%= config.app %>/**/*.{html,yml,md,mkd,markdown}',
          '!<%= config.app %>/bower_components/**/*'
        ],
        tasks: ['jekyll:server']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '.jekyll/**/*.html',
          '.tmp/styles/{,*/}*.css',
          '<%= config.app %>/images/{,*/}*'
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        open: true,
        livereload: 35729,
        // Change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          middleware: function(connect) {
            return [
              connect.static('.tmp'),
              connect.static('.jekyll'),
              connect().use('/bower_components', connect.static('./bower_components')),
              connect.static(config.app)
            ];
          }
        }
      },
      dist: {
        options: {
          base: '<%= config.dist %>',
          livereload: false
        }
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= config.dist %>/*',
            '!<%= config.dist %>/.git*'
          ]
        }]
      },
      server: [
        '.tmp',
        '.jekyll'
      ],
      videos: {
        files: [{
          src: [
            '<%= config.dist %>/videos/*'
          ]
        }]
      }
    },

    // Automatically inject Bower components into the HTML file
    wiredep: {
      app: {
        ignorePath: /^\/|\.\.\//,
        src: ['<%= config.app %>/index.html']
      }
    },

    // Renames files for browser caching purposes
    rev: {
      dist: {
        files: {
          src: [
            '<%= config.dist %>/scripts/{,*/}*.js',
            '<%= config.dist %>/styles/{,*/}*.css',
            '<%= config.dist %>/images/{,*/}*.*',
            '<%= config.dist %>/fonts/{,*/}*.*',
            '!<%= config.dist %>apple-touch-icon.png',
            '!<%= config.dist %>favicon.ico'
          ]
        }
      }
    },

    jekyll: {
      options: {
        bundleExec: true,
        config: '_config.yml,_config.build.yml',
        src: '<%= config.app %>'
      },
      dist: {
        options: {
          dest: '<%= config.dist %>',
        }
      },
      server: {
        options: {
          config: '_config.yml',
          dest: '.jekyll'
        }
      },
      check: {
        options: {
          doctor: true
        }
      }
    },

    // Compiles Sass to CSS and generates necessary files if requested
    compass: {
      options: {
        sassDir: '<%= config.app %>/styles',
        cssDir: '.tmp/styles',
        generatedImagesDir: '.tmp/images/generated',
        imagesDir: '<%= config.app %>/images',
        fontsDir: '<%= config.app %>/fonts',
        importPath: 'bower_components',
        httpImagesPath: '../images',
        httpGeneratedImagesPath: '../images/generated',
        httpFontsPath: '../fonts',
        relativeAssets: false,
        assetCacheBuster: false,
        raw: 'Sass::Script::Number.precision = 10\n',
        environment: 'development'
      },
      dist: {
        options: {
          generatedImagesDir: '<%= config.dist %>/images/generated',
          cssDir: '<%= config.dist %>/styles',
          environment: 'production'
        }
      },
      server: {
        options: {
          debugInfo: true
        }
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      options: {
        dest: '<%= config.dist %>'
      },
      html: [
        '<%= config.app %>/en/index.html',
        '<%= config.app %>/dk/index.html'
      ]
    },

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      options: {
        assetsDirs: [
          '<%= config.dist %>',
          '<%= config.dist %>/images',
          '<%= config.dist %>/styles'
        ],
        patterns: {
          js: [
            [/(images\/.*?\.(?:gif|jpeg|jpg|png|webp|svg))/gm, 'Update the JS to reference our revved images']
          ]
        }
      },
      html: ['<%= config.dist %>/{,*/}*.html'],
      css: ['<%= config.dist %>/styles/{,*/}*.css'],
      json: ['<%= config.dist %>/resources/{,*/}*.json'],
      js: ['<%= config.dist %>/scripts/{,*/}*.js']
    },

    // The following *-min tasks produce minified files in the dist folder
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/images',
          src: [
            '{,*/}*.{gif,jpeg,jpg,png}',
            '!inline/*'
          ],
          dest: '<%= config.dist %>/images',
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/images',
          src: '{,*/}*.svg',
          dest: '<%= config.dist %>/images'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          conservativeCollapse: true,
          removeAttributeQuotes: true,
          removeCommentsFromCDATA: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true,
          removeRedundantAttributes: true,
          useShortDoctype: true
        },
        files: [{
          expand: true,
          cwd: '<%= config.dist %>',
          src: '{,*/}*.html',
          dest: '<%= config.dist %>'
        }]
      }
    },

    requirejs: {
      dev: {
        options: {
          baseUrl: '<%= config.app %>/scripts',
          mainConfigFile: '<%= config.app %>/scripts/main.js',
          almond: true,
          include: ['main'],
          name: '../../bower_components/almond/almond',
          out: '.tmp/scripts/application.js',
          wrap: true,
          useStrict: true,
          removeCombined: true,
          generateSourceMaps: true,
          findNestedDependencies: true,
          preserveLicenseComments: false,
          optimize: 'none'
        }
      },
      dist: {
        options: {
          baseUrl: '<%= config.app %>/scripts',
          mainConfigFile: '<%= config.app %>/scripts/main.js',
          almond: true,
          include: ['main'],
          name: '../../bower_components/almond/almond',
          out: '<%= config.dist %>/scripts/application.js',
          wrap: true,
          useStrict: true,
          keepBuildDir: false,
          removeCombined: true,
          generateSourceMaps: false,
          findNestedDependencies: true,
          preserveLicenseComments: false
        }
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= config.app %>',
          dest: '<%= config.dist %>',
          src: [
            '*.{ico,png,txt}',
            'images/{,*/}*.webp',
            '!{,*/}*.html',
            'fonts/{,*/}*.*',
            'videos/{,*/}*.*',
            'resources/{,*/}*.*',
            '!images/svg',
            '!en/**',
            '!hu/**',
            '!_includes/**',
            '!_layouts/**'
          ]
        }, {
          src: '<%= config.app %>/.htaccess',
          dest: '<%= config.dist %>/htaccess'
        }]
      },
      styles: {
        expand: true,
        dot: true,
        cwd: '<%= config.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      }
    },

    // Run some tasks in parallel to speed up build process
    concurrent: {
        server: [
            'compass:server',
            'jekyll:server'
        ],
        dist: [
            'compass:dist',
            'imagemin',
            'svgmin'
        ]
    },

    replace: {
      baseurl: {
        overwrite: true, 
        src: ['<%= config.dist %>/{,*/}*.html'],             // source files array (supports minimatch)
        replacements: [{
          from: '/styles/',
          to: '/os-bass-tabs/styles/'
        }, {
          from: '/scripts/',
          to: '/os-bass-tabs/scripts/'
        }, {
          from: '/images/',
          to: '/os-bass-tabs/images/'
        }]
      }
    }
  });

  grunt.task.registerTask('post', 'Create new jekyll posts from templates.', function() {
    var name = grunt.option('name'),
        category = grunt.option('cat'),
        date = new Date(),
        today = grunt.template.date(date, 'yyyy-mm-dd'),
        template,
        formatedName,
        artist,
        song,
        data,
        content;

    if (name) {
      formatedName = name.replace(/[^a-z0-9]|\s+|\r?\n|\r/gmi, '-').toLowerCase();
      formatedName = formatedName.replace('---', '_');
      artist = name.split(' - ')[0];
      song = name.split(' - ')[1];
      category = category ? category : 'blog';
      
      data = {
        layout: "post",
        title: name,
        artist: artist,
        song: song
      };
      template = grunt.file.read('app/_templates/_post.md');
      content = grunt.template.process(template, {
        data: data
      });
      grunt.file.write('app/_posts/' + today + '-' + formatedName + '.md', content);
    }
    else {
      grunt.fail.warn('Name Required: `grunt post --name "My Post Name"`');
    }
  });

  grunt.registerTask('serve', 'start the server and preview your app, --allow-remote for remote access', function (target) {
    if (grunt.option('allow-remote')) {
      grunt.config.set('connect.options.hostname', '0.0.0.0');
    }
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'wiredep',
      'concurrent:server',
      'requirejs:dev',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('build', [
    'clean:dist',
    'wiredep',
    'useminPrepare',
    'jekyll:dist',
    'concurrent:dist',
    'requirejs:dist',
    'copy:dist',
    'rev',
    'usemin',
    'htmlmin',
    'replace'
  ]);

  grunt.registerTask('default', [
    'build'
  ]);
};