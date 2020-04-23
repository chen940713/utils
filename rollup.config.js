const path = require('path')
const fs = require('fs-extra')
const babel = require('rollup-plugin-babel')
const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const { uglify } = require('rollup-plugin-uglify')

// src下需要打包的js文件名
const fileList = [
  'index',
  'url',
  'utils'
]

const pluginConfig = () => {
  return [ // 有顺序的执行插件
    commonjs(),
    resolve(),
    babel({
      exclude: 'node_modules/**'
    }),
    // uglify()
  ]
}

const configList = fileList.map(name => {
  return {
    input: `./src/${name}.js`,
    output: {
      file: `./lib/${name}.js`,
      format: 'cjs',
    },
    plugins: pluginConfig()
  }
})

export default configList
