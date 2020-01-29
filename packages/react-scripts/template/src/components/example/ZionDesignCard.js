import React from 'react'
import { MenuPopout, LogoGithub } from '@fs/zion-icon'
import { Button, Card, CardMedia, CardActions, CardHeader } from '@fs/zion-ui'
import ZionImage from './zion.jpg'

const ZionDesignCard = () => {
  return (
    <Card>
      <CardMedia height="calc(var(--cell-width, 300px) / 2.5)" image={ZionImage} alt="Zion National Park" />
      <CardHeader heading="Zion Design System" />
      <CardActions>
        <Button Icon={MenuPopout} keyline="left" href="https://beta.familysearch.org/frontier/zion">
          Zion Docs + Components
        </Button>
        <Button Icon={LogoGithub} href="https://github.com/fs-webdev/zion">
          Github
        </Button>
      </CardActions>
    </Card>
  )
}

// Use React.memo() to keep our component from re-rendering if the props havent changed
// https://reactjs.org/docs/react-api.html#reactmemo
// https://egghead.io/lessons/react-prevent-unnecessary-component-rerenders-with-react-memo
export default React.memo(ZionDesignCard)
