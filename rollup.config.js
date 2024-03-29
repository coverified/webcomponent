import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import autoPreprocess from 'svelte-preprocess';

const production = !process.env.ROLLUP_WATCH;

export default ['widget', 'cases', 'articles', 'embed'].map((name, index) => ({
	input: `src/${name}.js`,
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: `public/build/${name}.js`,
	},
	plugins: [
		svelte({
			// compile as custom element
			customElement: true,
			// enable run-time checks when not in production
			dev: !production,
			// pre-process styles
			preprocess: autoPreprocess({
				scss: true,
				postcss: {
					plugins: [
						require('autoprefixer'),
					],
				},
			}),
		}),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration -
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			browser: true,
			dedupe: ['svelte'],
		}),
		commonjs(),

		// In dev mode, call `npm run start` once
		// the bundle has been generated
		!production && serve(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload({
			watch: `public/${name}.*`,
			port: 5100 + index,
		}),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser(),
	],
	watch: {
		clearScreen: false
	}
}));

function serve() {
	let started = false;

	return {
		writeBundle() {
			if (!started) {
				started = true;

				require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
					stdio: ['ignore', 'inherit', 'inherit'],
					shell: true,
				});
			}
		}
	};
}
