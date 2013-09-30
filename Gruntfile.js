module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		browserify: {
			umd: {
				files: {
					'dist/jsOOP.js': ['./index.js']
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
					'dist/jsOOP.min.js': ['dist/jsOOP.js']
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
					paths: 'lib/',
					// themedir: 'path/to/custom/theme/',
					outdir: 'doc/'
				}
			}
		},

		nodeunit: {
			all: ['test/*.js']
		},

		jshint: {
			files: ['Gruntfile.js', 'lib/**/*.js', 'test/**/*.js'],
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
	grunt.loadNpmTasks('grunt-contrib-yuidoc');
	grunt.loadNpmTasks('grunt-contrib-nodeunit');
	grunt.loadNpmTasks('grunt-browserify');

	grunt.registerTask('build', ['browserify', 'nodeunit', 'uglify', 'yuidoc']);
	grunt.registerTask('default', ['build']);

};