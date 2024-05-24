const { override, addBabelPlugins,babelInclude, removeModuleScopePlugin ,addExternalBabelPlugins, addWebpackAlias, fixBabelImports} = require('customize-cra')
const path = require('path')
// const rewireSvgReactLoader = require('react-app-rewire-svg-react-loader');

const packages = [
  path.join(__dirname, '../common/src'),
  path.join(__dirname, './src'),
];


module.exports = override(
  fixBabelImports('module-resolver', {
    alias: {
      '^react-native$': 'react-native-web',
      // '^react-native-svg':'react-native-svg-web'
    },
  }),
  addWebpackAlias({
    'react-native': 'react-native-web',
    'react-native-svg': 'react-native-svg/lib/commonjs'
    }),
  addBabelPlugins(
    ['react-native-web'/*, { commonjs: true } */],
  ),
  babelInclude([
    path.resolve(__dirname, './src'),
    path.resolve(__dirname,'../common/src'),
    path.resolve(__dirname,'../../node_modules/react-native-chart-kit'),
    // path.resolve(__dirname,'./node_modules/react-native-svg')
  ]),
//react-native-svg-transformer
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
  (config,env) => {
     // Modify the include paths of the babel-loader to include shared packages
  // config.module.rules.forEach(rule => {
  //   if (rule.oneOf) {
  //     rule.oneOf.forEach(loader => {
  //       if (loader.loader && loader.loader.includes('babel-loader')) {
  //         loader.include = [loader.include || []].concat(packages);
  //       }
  //     });
  //   }
  // });

  // config.resolve.alias["react-native-svg"] = "react-native-svg-web";

    // Log the config object
    console.log({config});
    return config;
  }
)