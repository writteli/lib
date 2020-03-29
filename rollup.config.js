import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import { uglify } from 'rollup-plugin-uglify'

export default {
  input: 'src/index.js',
  external: ['fs', 'path', 'fs-extra', 'http-server', 'node-watch'],
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    resolve(),
    commonjs(),
    uglify()
  ],
  output: {
    extend: true,
    compact: true,
    file: 'dist/index.min.js',
    format: 'iife',
    name: 'writteli_lib',
    sourcemap: 'dist/index.js.map'
  },
};
