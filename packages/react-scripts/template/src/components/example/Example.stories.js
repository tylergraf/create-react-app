import React from 'react'

import ExamplePageComponent from './ExamplePage'
import LearnReactCardComponent from './LearnReactCard'
import ZionCardComponent from './ZionCard'
import NotSignedInCardComponent from './NotSignedInCard'

export default {
  title: 'ExamplePage',
}

export const ExamplePage = () => <ExamplePageComponent />

export const LearnReactCard = () => <LearnReactCardComponent />

export const NotSignedInCard = () => <NotSignedInCardComponent user={{}} />

export const ZionCard = () => <ZionCardComponent />
