module.exports = function(api) {
    api.cache(true);
    return {
      presets: ['babel-preset-react-app'],
      plugins: [
        [
          'react-native-svg-transformer',
          {
            svgr: {
              // Enable SVGR for React Native SVG files.
              native: true,
            },
          },
        ],
      ],
    };
  };