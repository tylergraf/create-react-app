import React from 'react'
import { Cell, colors, Grid, Radio, RadioGroup, useAtSize, Separator } from '@fs/zion-ui'
import { css } from '@emotion/core'
import WagonWheel from './WagonWheel'

export const WheelSpeedOptions = {
  stop: {
    label: 'Stopped',
    animationDuration: 0,
  },
  slow: {
    label: 'Slow',
    animationDuration: 20,
  },
  medium: {
    label: 'Medium',
    animationDuration: 7,
  },
  fast: {
    label: 'Fast',
    animationDuration: 1,
  },
}

const WagonWheelControl = ({ animationDuration, color, handleColorChange, handleAnimationDurationChange }) => {
  const atSize = useAtSize()

  // Custom CSS
  const colorCellCss = (a) => css`
    background-color: ${a};
    height: var(--cell-width);
    cursor: pointer;
  `

  return (
    <Grid>
      <Cell columns={atSize({ sm: 6 })}>
        <WagonWheel maxHeight="150px" color={color} animationDuration={parseInt(animationDuration, 10)} />
        <Separator />
      </Cell>
      <Cell columns={atSize({ sm: 6 })}>
        <RadioGroup label="Wheel Speed">
          {Object.keys(WheelSpeedOptions).map((k) => {
            return (
              <Radio
                checked={parseInt(animationDuration, 10) === WheelSpeedOptions[k].animationDuration}
                name="wheelSpeed"
                label={WheelSpeedOptions[k].label}
                value={`${WheelSpeedOptions[k].animationDuration}`}
                onChange={(e) => handleAnimationDurationChange(e.target.value)}
                key={`${WheelSpeedOptions[k].animationDuration}`}
              />
            )
          })}
        </RadioGroup>
      </Cell>
      <Cell>
        <Grid>
          {[
            colors.text.primary,
            colors.feedback.danger.accent,
            colors.feedback.warning.accent2,
            colors.feedback.warning.text,
            colors.feedback.warning.background,
            colors.help.text2,
            colors.help.accent2,
            colors.sex.male,
            colors.progress.complete,
            colors.progress.ready,
            colors.sex.female,
            colors.feedback.warning.accent,
          ].map((a) => {
            return (
              <Cell key={a} columns={atSize({ xs: 2, sm: 1 })}>
                <div
                  tabIndex={0}
                  role="button"
                  onKeyPress={() => handleColorChange(a)}
                  onClick={() => handleColorChange(a)}
                  css={colorCellCss(a)}
                />
              </Cell>
            )
          })}
        </Grid>
      </Cell>
    </Grid>
  )
}

export default WagonWheelControl
