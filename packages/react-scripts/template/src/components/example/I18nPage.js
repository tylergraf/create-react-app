import React from 'react'
import { useTranslation } from 'react-i18next'
import { i18n } from '@fs/zion-locale'
import { css } from '@emotion/core'
import { Body1, Cell, Grid, HeaderBlock, Separator, useAtSize, colors } from '@fs/zion-ui'

const I18nPage = () => {
  const [t] = useTranslation()
  const atSize = useAtSize()

  return (
    <>
      <Separator size="lg" />
      <Grid>
        <Cell columns={atSize({ sm: 8 })}>
          <HeaderBlock
            size={atSize({ xs: 'md', md: 'lg', lg: 'xl' })}
            heading="To All People"
            subHeading={<div>{t('Internationalization in Frontier')}</div>}
          />
        </Cell>

        <Cell>
          <div
            css={css`
              color: ${colors.text.secondary};
              background-color: ${colors.background.secondary};
              display: flex;
              flex-direction: column;
              justify-content: space-around;
              padding: 20px;
            `}
          >
            <p>
              This page supports all ???? currently supported languages using <code>setAppLocales</code>. Other pages in
              this app only support the core 10 languages. You can use the Language menu in the footer to change the
              language.
              <Separator />
              The currently active locale code is <strong>{i18n.language}</strong>.
            </p>
          </div>
        </Cell>

        <Cell columns={atSize({ md: 3 })}>
          <Body1>Examples:</Body1>
        </Cell>

        <Cell columns={atSize({ md: 3 })} />

        <Cell columns={atSize({ md: 3 })} />
      </Grid>
    </>
  )
}
export default I18nPage
