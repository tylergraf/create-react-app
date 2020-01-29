/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react'
import { css } from '@emotion/core'
import LazyImage from './LazyImage'

export default {
  title: 'LazyImage',
}

const storyCss = css`
  position: absolute;
  bottom: -385px;
  padding-bottom: 20px;
  img {
    height: 360px;
    width: 640px;
    opacity: 0.3;
    &.loaded {
      transition: opacity 1s ease-in-out;
      opacity: 1;
    }
  }
`
export const LazyImageStory = () => {
  return (
    <div>
      <div>⬇️ Scroll down to see image lazy load ⬇️</div>
      <div css={storyCss}>
        <LazyImage src={`https://placekitten.com/640/360?ts=${Math.random()}`} />
      </div>
    </div>
  )
}
