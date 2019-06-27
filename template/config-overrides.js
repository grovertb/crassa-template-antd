const { override, fixBabelImports, addLessLoader, addWebpackAlias } = require('customize-cra')

module.exports = override(
  addWebpackAlias({ 'react-dom': '@hot-loader/react-dom' }),
  fixBabelImports('import', {
    libraryDirectory: 'es',
    libraryName     : 'antd',
    style           : true
  }),
  // habilitar para cambiar colores del tema
  // process.env.NODE_ENV === 'production' &&
  //   addLessLoader({
  //     javascriptEnabled: true,
  //     modifyVars       : { '@primary-color': '#1DA57A' }
  //   })
)
