import React from 'react'
import { withKnobs, text, color } from '@storybook/addon-knobs'

import HomePageComponent from './HomePage'
import LearnReactCardComponent from './LearnReactCard'
import ZionDesignCardComponent from './ZionDesignCard'
import WagonWheelComponent from './WagonWheel'
import PurposeStatementGeneratorComponent from './PurposeStatementGenerator'

export default {
  title: 'Home Page',
}

export const HomePage = () => <HomePageComponent />

export const LearnReactCard = () => <LearnReactCardComponent />

export const ZionDesignCard = () => <ZionDesignCardComponent />

export const PurposeStatementGenerator = () => <PurposeStatementGeneratorComponent />

export const WagonWheel = () => (
  <WagonWheelComponent color={color('Color', '#000')} animationDuration={text('Animation Duration', '30s')} />
)

WagonWheel.story = {
  decorators: [withKnobs],
}
