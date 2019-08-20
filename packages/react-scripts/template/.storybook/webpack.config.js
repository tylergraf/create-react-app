module.exports = async ({ config, mode }) => {

  config.module.rules.push({
    test: /locales/,
    loader: '@alienfast/i18next-loader',
    options: {
      debug: false,
      basenameAsNamespace: true,
    },
  })

  config.module.rules.push({
    test: /\.stories\.jsx?$/,
    loaders: [require.resolve('@storybook/addon-storysource/loader')],
    enforce: 'pre',
  })

  // https://github.com/storybooks/storybook/issues/457#issuecomment-459772340
  config.devtool = 'inline-source-map'

  return config
}
