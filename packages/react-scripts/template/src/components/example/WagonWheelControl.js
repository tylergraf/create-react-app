import React from 'react'
import { Cell, colors, Grid, Radio, RadioGroup, useAtSize, Separator } from '@fs/zion-ui'
import { css } from '@emotion/core'
import WagonWheel from './WagonWheel'

export const WheelSpeedOptions = {
  stop: {
    label: 'Stopped',
    animationDuration: '0s',
  },
  slow: {
    label: 'Slow',
    animationDuration: '20s',
  },
  medium: {
    label: 'Medium',
    animationDuration: '7s',
  },
  fast: {
    label: 'Fast',
    animationDuration: '1s',
  },
}

const colorCellCss = css`
  height: var(--cell-width);
  cursor: pointer;
`

const WagonWheelControl = ({ animationDuration, color, handleColorChange, handleAnimationDurationChange }) => {
  const atSize = useAtSize()

  return (
    <Grid>
      <Cell columns={atSize({ sm: 6 })}>
        <WagonWheel maxHeight={150} color={color} animationDuration={animationDuration} />
        <Separator />
      </Cell>
      <Cell columns={atSize({ sm: 6 })}>
        <RadioGroup label="Wheel Speed">
          {Object.keys(WheelSpeedOptions).map((k) => {
            return (
              <Radio
                checked={animationDuration === WheelSpeedOptions[k].animationDuration}
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
          ].map((c) => {
            return (
              <Cell key={c} columns={atSize({ xs: 2, sm: 1 })}>
                <div
                  tabIndex={0}
                  role="button"
                  onKeyPress={() => handleColorChange(c)}
                  onClick={() => handleColorChange(c)}
                  css={colorCellCss}
                  style={{ backgroundColor: c }}
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
