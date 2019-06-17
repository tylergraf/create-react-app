import React from 'react'
import { storiesOf } from '@storybook/react'
import ButtonLink from './ButtonLink'

storiesOf('ButtonLink', module)
  .add('Link to google', () => <ButtonLink href="https://www.google.com">Google</ButtonLink>)
  .add('Link to github', () => <ButtonLink href="https://www.github.com">Github</ButtonLink>)
