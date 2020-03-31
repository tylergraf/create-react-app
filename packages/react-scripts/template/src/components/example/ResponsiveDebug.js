import React from 'react'
import { css } from '@emotion/core'
import { colors, useAtSize } from '@fs/zion-ui'

const containerCss = css`
  position: fixed;
  bottom: 0px;
  right: 0px;
  background: ${colors.help.background};
  color: ${colors.text.primary};
  padding: 5px;
`

const ResponsiveDebug = () => {
  const atSize = useAtSize()

  return <div css={containerCss}>{atSize({ default: 'XS', sm: 'SM', md: 'MD', lg: 'LG', xl: 'XL' })}</div>
}

export default ResponsiveDebug
