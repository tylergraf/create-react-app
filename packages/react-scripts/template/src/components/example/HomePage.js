import React, { Suspense } from 'react'
import {
  Body1,
  Button,
  colors,
  Cell,
  DialogOverlay,
  Grid,
  HeaderBlock,
  Separator,
  useAtSize,
  useOverlay,
  DialogOverlayContent,
} from '@fs/zion-ui'
import { css } from '@emotion/core'
import { NoticeLoading } from '@fs/zion-icon'
import ZionDesignCard from './ZionDesignCard'
import ArtifactsViewer from './ArtifactsViewer'
import LearnReactCard from './LearnReactCard'
import PurposeStatementGenerator from './PurposeStatementGenerator'
import WagonWheel from './WagonWheel'
import WagonWheelControl from './WagonWheelControl'
import ResponsiveDebug from './ResponsiveDebug'

// Custom CSS
const gettingStartedCss = css`
  color: ${colors.text.secondary};
  background-color: ${colors.background.secondary};
  padding: 20px 20px 8px 20px;
  margin: 0 -24px;
`

const HomePage = () => {
  // Initiate state variables and hooks
  const atSize = useAtSize()
  const overlay = useOverlay({})
  const [logoColor, setLogoColor] = React.useState(colors.text.primary)
  const [logoAnimationDuration, setLogoAnimationDuration] = React.useState('0s')

  // Event handlers
  function handleLogoColorChange(color) {
    setLogoColor(color)
  }

  function handleLogoChangeAnimationDuration(duration) {
    setLogoAnimationDuration(duration)
  }

  return (
    <>
      <Separator size="sm" />
      <Grid>
        <Cell columns={atSize({ sm: 8 })}>
          <HeaderBlock
            size={atSize({ xs: 'md', md: 'lg', lg: 'xl' })}
            heading="This is the beginning of something amazing"
            subHeading="Welcome to the start of your new Frontier application."
          />
        </Cell>

        <Cell columns={atSize({ sm: 4 })}>
          <WagonWheel
            alt="Wagon Wheel"
            color={logoColor}
            animationDuration={logoAnimationDuration}
            handleClick={overlay.handleOpen}
          />
        </Cell>

        <Cell>
          <div css={gettingStartedCss}>
            <Body1 as="aside">
              To get started, take a look at the code in <code>src/App.js</code>. Ready to learn more? Check out the
              resources below or visit the <a href="https://beta.familysearch.org/frontier/docs">Frontier Docs</a>.
            </Body1>
          </div>
          <Separator size="xxs" />
        </Cell>

        <Cell columns={atSize({ md: 6 })}>
          <ZionDesignCard />
        </Cell>

        <Cell columns={atSize({ md: 6 })}>
          <LearnReactCard />
        </Cell>

        <Cell>
          <Separator />
        </Cell>

        <Cell columns={atSize({ md: 12 })}>
          <PurposeStatementGenerator />
          <Separator size="xxs" />
        </Cell>

        <Cell>
          <ArtifactsViewer />
        </Cell>
      </Grid>

      {/* Overlay */}
      <Suspense fallback={<Button Icon={NoticeLoading}>Wagon Wheel Controls</Button>}>
        <DialogOverlay headingText="Wagon Wheel Controls" {...overlay}>
          <DialogOverlayContent>
            <WagonWheelControl
              color={logoColor}
              animationDuration={logoAnimationDuration}
              handleColorChange={handleLogoColorChange}
              handleAnimationDurationChange={handleLogoChangeAnimationDuration}
            />
          </DialogOverlayContent>
        </DialogOverlay>
      </Suspense>

      <ResponsiveDebug />
    </>
  )
}

export default HomePage
