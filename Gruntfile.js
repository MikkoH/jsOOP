module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		browserify: {
			dist: {
				files: {
					'dist/jsOOP.js': ['src/export-globals.js']
				}
			},

			umd: {
				files: {
					'dist/jsOOP.umd.js': ['src/main.js']
				},
				options: {
					standalone: 'jsOOP'
				}
			}
		},

		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
			},
			dist: {
				files: {
					'dist/jsOOP.min.js': ['dist/jsOOP.js'],
					'dist/jsOOP.umd.min.js': ['dist/jsOOP.umd.js']
				}
			}
		},

		yuidoc: {
			compile: {
				name: '<%= pkg.name %>',
				description: '<%= pkg.description %>',
				version: '<%= pkg.version %>',
				url: '<%= pkg.homepage %>',
				options: {
					paths: 'src/',
					// themedir: 'path/to/custom/theme/',
					outdir: 'doc/'
				}
			}
		},

		qunit: {
			//PhantomJS doesn't support Function.prototype.bind
			//So we can't run the grunt-qunit enum tasks until this is fixed...
			all: ['test/test-class.html' /*, 'test/test-enum.html'*/]
		},

		jshint: {
			files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
			options: {
				// options here to override JSHint defaults
				globals: {
					console: true,
					module: true,
					exports: true,
					require: true
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-yuidoc');
	grunt.loadNpmTasks('grunt-browserify');

	grunt.registerTask('build', ['browserify', 'test', 'uglify', 'yuidoc']);
	grunt.registerTask('test', ['qunit']);

	grunt.registerTask('default', ['build']);

};