import React from 'react'
import { withKnobs, text, number } from '@storybook/addon-knobs'

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
  <WagonWheelComponent color={text('Color', 'rgb(0,0,0)')} animationDuration={number('Animation Duration', 30)} />
)

WagonWheel.story = {
  decorators: [withKnobs],
}
