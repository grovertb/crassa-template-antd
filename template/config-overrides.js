const { override, fixBabelImports, addLessLoader, addWebpackAlias } = require('customize-cra')
const { _moduleAliases } = require('./package.json')

const aliases = {}

Object.keys(_moduleAliases).forEach(key => {
  aliases[key] = _moduleAliases[key].replace('.', __dirname)
})

module.exports = override(
  addWebpackAlias({ ...aliases }),
  fixBabelImports('import', {
    libraryDirectory: 'es',
    libraryName     : 'antd',
    style           : true
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars       : { '@primary-color': '#1DA57A' }
  }),
)
