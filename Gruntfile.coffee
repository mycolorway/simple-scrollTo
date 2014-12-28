module.exports = (grunt) ->

  grunt.initConfig

    pkg: grunt.file.readJSON 'package.json'
    name: "scrollTo"

    coffee:
      src:
        options:
          bare: true
        files:
          'lib/scrollTo.js': 'src/scrollTo.coffee'
      spec:
        files:
          'spec/scrollTo-spec.js': 'spec/scrollTo-spec.coffee'

    umd:
      all:
        src: 'lib/scrollTo.js'
        template: 'umd.hbs'
        amdModuleId: 'simple-scrollTo'
        objectToExport: 'scrollTo'
        globalAlias: 'scrollTo'
        deps:
          'default': ['$']
          amd: ['jquery']
          cjs: ['jquery']
          global:
            items: ['jQuery']
            prefix: ''

    watch:
      spec:
        files: ['spec/**/*.coffee']
        tasks: ['coffee:spec']
      src:
        files: ['src/**/*.coffee']
        tasks: ['coffee:src', 'umd']
      jasmine:
        files: ['lib/**/*.js', 'spec/**/*.js']
        tasks: 'jasmine'

    jasmine:
      test:
        src: ['lib/**/*.js']
        options:
          specs: 'spec/scrollTo-spec.js'
          vendor: [
            'vendor/bower/jquery/dist/jquery.min.js'
            'vendor/bower/simple-module/lib/module.js'
          ]

  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-jasmine'
  grunt.loadNpmTasks 'grunt-umd'

  grunt.registerTask 'default', ['coffee', 'umd', 'jasmine', 'watch']
  grunt.registerTask 'test', ['coffee', 'umd', 'jasmine']
