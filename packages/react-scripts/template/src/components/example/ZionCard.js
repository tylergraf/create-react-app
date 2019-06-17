import React from 'react'
import { Card, CardMedia, CardActions, CardContent } from '@fs/zion-ui'
import ButtonLink from '../ButtonLink'
import ZionImage from './zion.jpg'

const ZionCard = () => (
  <Card>
    <CardMedia
      height="calc(var(--cell-width) / 1.906)"
      image={ZionImage}
      title="Zion National Park"
    />
    <CardContent>
      <h2>Zion</h2>
      <p>Zion is the place to go to find reusable components for your FamilySearch application.</p>
    </CardContent>
    <CardActions>
      <ButtonLink href="https://beta.familysearch.org/frontier/zion">Components</ButtonLink>
      <ButtonLink href="https://github.com/fs-webdev/zion">Github</ButtonLink>
    </CardActions>
  </Card>
)

// Use React.memo() to keep our component from re-rendering if the props havent changed
// https://reactjs.org/docs/react-api.html#reactmemo
// https://egghead.io/lessons/react-prevent-unnecessary-component-rerenders-with-react-memo
export default React.memo(ZionCard)
