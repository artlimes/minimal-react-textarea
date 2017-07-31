var gulp = require('gulp');
var initGulpTasks = require('react-component-gulp-tasks');

var taskConfig = {

	component: {
		name: 'MinimalReactText',
		dependencies: [
			'classnames',
			'react',
			'react-dom',
			'create-react-class',
			'prop-types',
			'minimal-react-text'
		],
		less: {
			path: 'less',
			entry: 'default.less'
		}
	},

	example: {
		src: 'examples/src',
		dist: 'examples/dist',
		standalone: true,
		files: [
			'index.html',
			'standalone.html',
			'.gitignore'
		],
		scripts: [
			'app.js'
		],
		less: [
			'example.less'
		]
	}

};

initGulpTasks(gulp, taskConfig);
