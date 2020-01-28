/* eslint global-require: 0 */
import React, { Suspense } from 'react'
import { css } from '@emotion/core'
import { configure, addParameters, addDecorator } from '@storybook/react'
import { addReadme } from 'storybook-readme'
import '@storybook/addon-console'
import { withA11y } from '@storybook/addon-a11y'
import { withKnobs } from '@storybook/addon-knobs'
import { darkMode, lightMode } from './theme'
import { I18nProvider, i18n } from '@fs/zion-locale'
import { themes } from '@fs/zion-ui'
import { GridStart } from '@fs/zion-ui/dist/es/grid'
import { ResponsiveProvider } from '@fs/zion-ui/dist/es/responsive'
import { StatusOverlays, StatusOverlayProvider } from '@fs/zion-ui/dist/es/status-overlay'
import withThemeSwitcher from '@fs/storybook-addons/dist/theme-switcher/withThemeSwitcher'

addDecorator(withKnobs)
addDecorator(withA11y)
addDecorator(addReadme)
addDecorator((storyFn) => (
  <Suspense fallback={<div>Storybook Wrapper Loading...</div>}>
    <I18nProvider i18nInstance={i18n}>
      <ResponsiveProvider>
        <StatusOverlayProvider>
          <StatusOverlays />
          <GridStart>{storyFn()}</GridStart>
        </StatusOverlayProvider>
      </ResponsiveProvider>
    </I18nProvider>
  </Suspense>
))
addDecorator(withThemeSwitcher({ themes }))

// eslint-disable-next-line no-extend-native
String.prototype.injectInnerMarkdown = function injectInnerMarkdown(innerMarkdown) {
  return this.replace('<!-- INNER_MARKDOWN -->', innerMarkdown)
}

addParameters({
  readme: { sidebar: '<!-- PROPS -->' },
  options: {
    showPanel: true,
    theme: window.localStorage.getItem('themeId') === 'nightfall' ? darkMode : lightMode,
  },
})

configure(require.context('../src', true, /\.stories\.(js|mdx)$/), module)
