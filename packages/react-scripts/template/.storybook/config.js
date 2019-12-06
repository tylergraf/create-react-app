/* eslint global-require: 0 */
import React from 'react'
import { css } from '@emotion/core'
import { configure, addParameters, addDecorator } from '@storybook/react'
import { addReadme } from 'storybook-readme'
import '@storybook/addon-console'
import { withA11y } from '@storybook/addon-a11y'
import { withKnobs } from '@storybook/addon-knobs'
import theme from './theme'
import StyleNormalize from '@fs/zion-style-normalize'
import { themes } from '@fs/zion-ui'
import { I18nProvider, i18n } from '@fs/zion-locale'
import withThemeSwitcher from '@fs/storybook-addons/dist/theme-switcher/withThemeSwitcher'

addDecorator(withKnobs)
addDecorator(withA11y)
addDecorator(addReadme)
addDecorator(storyFn => <I18nProvider i18nInstance={i18n}>{storyFn()}</I18nProvider>)
addDecorator(withThemeSwitcher({ themes }))

// eslint-disable-next-line no-extend-native
String.prototype.injectInnerMarkdown = function injectInnerMarkdown(innerMarkdown) {
  return this.replace('<!-- INNER_MARKDOWN -->', innerMarkdown)
}

addParameters({
  readme: { sidebar: '<!-- PROPS -->' },
  options: {
    showPanel: true,
    theme,
  },
})

configure(require.context('../src', true, /\.stories\.(js|mdx)$/), module)
