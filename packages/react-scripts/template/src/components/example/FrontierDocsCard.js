import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardActions, CardContent, CardActionArea } from '@fs/zion-ui'
import { useTranslation } from 'react-i18next'
import ButtonLink from '../ButtonLink'
import Logo from './Logo'

const FrontierDocsCard = ({ logoColor, animationDuration, handleLogoClick }) => {
  const [t] = useTranslation()

  return (
    <Card>
      <CardContent>
        <h2>{t('getting.started.title', 'Getting Started')}</h2>
        <p>
          {t(
            'getting.started.description',
            'Try clicking the wheel to add a splash of color and then check out the code in the example directory to get started.'
          )}
        </p>
      </CardContent>
      <CardActionArea onClick={handleLogoClick} aria-label="Click here to change color">
        <Logo
          alt={t('getting.started.click.logo.text', 'Click me')}
          color={logoColor}
          animationDuration={animationDuration}
        />
      </CardActionArea>

      <CardContent>
        <p>{t('getting.started.learnmore', 'Ready to learn more? Visit the frontier docs.')}</p>
      </CardContent>

      <CardActions>
        <ButtonLink href="https://www.familysearch.org/frontier/docs">
          {t('getting.started.docs.link', 'Frontier Docs')}
        </ButtonLink>
      </CardActions>
    </Card>
  )
}

FrontierDocsCard.propTypes = {
  /** The logoColor is used to set the color of the Logo component. */
  logoColor: PropTypes.string,
  /** This prop is needed to set the length of time for how long the Logo should animate for. */
  animationDuration: PropTypes.number,
  /** This function changes the color of the logo on each click of the Card. */
  handleLogoClick: PropTypes.func,
}

// Use React.memo() to keep our component from re-rendering if the props havent changed
// https://reactjs.org/docs/react-api.html#reactmemo
// https://egghead.io/lessons/react-prevent-unnecessary-component-rerenders-with-react-memo
export default React.memo(FrontierDocsCard)
