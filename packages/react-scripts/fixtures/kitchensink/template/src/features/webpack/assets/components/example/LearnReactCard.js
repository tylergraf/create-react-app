import React from 'react'
import { MenuPopout } from '@fs/zion-icon'
import { Button, Card, CardMedia, CardActions, CardHeader } from '@fs/zion-ui'
import ReactImage from './reactjs.jpg'

const LearnReactCard = () => (
  <Card>
    <CardMedia image={ReactImage} alt="React" height="calc(var(--cell-width) / 2.5)" />
    <CardHeader heading="Learn React" />
    <CardActions>
      <Button Icon={MenuPopout} href="https://reactjs.org/docs/getting-started.html">
        React Docs
      </Button>
      <Button
        Icon={MenuPopout}
        href="https://github.com/fs-webdev/skill-building-program/tree/master/badges-active/react"
      >
        Earn your Badge
      </Button>
    </CardActions>
  </Card>
)

// Use React.memo() to keep our component from re-rendering if the props haven't changed
// https://reactjs.org/docs/react-api.html#reactmemo
// https://egghead.io/lessons/react-prevent-unnecessary-component-rerenders-with-react-memo
export default React.memo(LearnReactCard)
