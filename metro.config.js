const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

config.resolver = config.resolver || {};
config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  'react-hook-form': require.resolve('react-hook-form'),
};

module.exports = withNativeWind(config, { input: './global.css' });
