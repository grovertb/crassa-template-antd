const { override, fixBabelImports, addLessLoader } = require('customize-cra')

module.exports = override(
  fixBabelImports('import', {
    libraryDirectory: 'es',
    libraryName     : 'antd',
    style           : true
  }),
  process.env.NODE_ENV === 'production' &&
    addLessLoader({
      javascriptEnabled: true,
      modifyVars       : { '@primary-color': '#1DA57A' }
    })
)
