import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import external from 'rollup-plugin-peer-deps-external';

const PLUGINS = [external(), resolve(), commonjs(), typescript({ tsconfig: './tsconfig.json' })];

const pkg = require('./package.json');

export default {
	input: 'src/index.ts',
	output: [
		{
			file: pkg.main,
			format: 'cjs',
			sourcemap: true,
			name: 'react-lib',
		},
		{
			file: pkg.module,
			format: 'esm',
			sourcemap: true,
		},
	],
	plugins: [...PLUGINS, terser()],
};
