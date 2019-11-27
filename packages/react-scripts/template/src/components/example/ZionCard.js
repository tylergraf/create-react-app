import React from 'react'
import { Button, Card, CardMedia, CardActions, CardContent, TypeBlock } from '@fs/zion-ui'
import ZionImage from './zion.jpg'

const ZionCard = () => (
  <Card>
    <CardMedia height="calc(var(--cell-width) / 1.906)" image={ZionImage} alt="Zion National Park" />
    <CardContent>
      <TypeBlock
        header="Zion"
        subHeader="Zion is the place to go to find reusable components for your FamilySearch application."
      />
    </CardContent>
    <CardActions>
      <Button href="https://beta.familysearch.org/frontier/zion">Components</Button>
      <Button href="https://github.com/fs-webdev/zion">Github</Button>
    </CardActions>
  </Card>
)

// Use React.memo() to keep our component from re-rendering if the props havent changed
// https://reactjs.org/docs/react-api.html#reactmemo
// https://egghead.io/lessons/react-prevent-unnecessary-component-rerenders-with-react-memo
export default React.memo(ZionCard)
