const babel = require('rollup-plugin-babel')
const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const { uglify } = require('rollup-plugin-uglify')

export default {
  input: './src/index.js',
  output: {
    file: './lib/index.js',
    format: 'umd',
    name: 'utils'
  },
  plugins: [ // 有顺序的执行插件
    commonjs(),
    resolve(),
    babel({
      exclude: 'node_modules/**'
    }),
    // uglify()
  ]
}
