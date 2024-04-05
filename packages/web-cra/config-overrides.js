const { override, addBabelPlugins,babelInclude, removeModuleScopePlugin ,addExternalBabelPlugins} = require('customize-cra')
const path = require('path')

const packages = [
  path.join(__dirname, '../common/src'),
  path.join(__dirname, './src'),
];


module.exports = override(
  addBabelPlugins(
    ['react-native-web' /*, { commonjs: true } */],
  ),
  // babelInclude([
  //   path.resolve(__dirname, './src'),
  //   path.resolve(__dirname,'../common/src')
  // ]),

  removeModuleScopePlugin(), // Remove the ModuleScopePlugin
  // addWebpackAlias({
  //   '@monorepo/common': path.resolve(__dirname, '../common/src')
  // }),
  // addExternalBabelPlugins([
  //   [
  //     'babel-plugin-module-resolver',
  //     {
  //       alias: {
  //         // Define aliases for shared packages
  //         '@monorepo/common': '../common/src',
  //       },
  //     },
  //   ],
  // ]),
  (config) => {
     // Modify the include paths of the babel-loader to include shared packages
  config.module.rules.forEach(rule => {
    if (rule.oneOf) {
      rule.oneOf.forEach(loader => {
        if (loader.loader && loader.loader.includes('babel-loader')) {
          loader.include = [loader.include || []].concat(packages);
        }
      });
    }
  });

    // Log the config object
    console.log({config});
    return config;
  }
)