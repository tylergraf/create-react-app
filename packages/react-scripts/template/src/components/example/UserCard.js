import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import { Button, Card, CardActions, CardContent, List, ListItem, TextField, TypeBlock, useOpener } from '@fs/zion-ui'
import { ViewerContrastMore, SocialLike, MediaFastForward } from '@fs/zion-icon'
import axios from '@fs/zion-axios'

// Hook for fetching a users portrait
const usePersonPortrait = (personId) => {
  const reducer = (state, { type, response }) => {
    switch (type) {
      case 'FETCHING':
        return { ...state, status: 'FETCHING' }
      case 'SUCCESS':
        return {
          ...state,
          status: 'SUCCESS',
          portraitUrl: response.data.portraitUrls.thumbSquareUrl,
        }
      case 'ERROR':
        return { ...state, status: 'ERROR', response }
      default:
        return state
    }
  }
  const [state, dispatch] = React.useReducer(reducer, { status: null, response: null })

  React.useEffect(() => {
    axios
      .get(`/service/memories/tps/persons/${personId}/portrait`)
      .then((response) => dispatch({ type: 'SUCCESS', response }))
      .catch((response) => dispatch({ type: 'ERROR', response }))
  }, [personId])

  return [state]
}

// Hook for fetchting a users details
const usePersonDetails = (personId) => {
  const reducer = (state, { type, response }) => {
    switch (type) {
      case 'FETCHING':
        return { ...state, status: 'FETCHING' }
      case 'SUCCESS':
        return { ...state, status: 'SUCCESS', details: response.data }
      case 'ERROR':
        return { ...state, status: 'ERROR', response }
      default:
        return state
    }
  }
  const [state, dispatch] = React.useReducer(reducer, { status: null, response: null })

  React.useEffect(() => {
    axios
      .get(`/service/tree/tf/person/CURRENT`)
      .then((response) => dispatch({ type: 'SUCCESS', response }))
      .catch((response) => dispatch({ type: 'ERROR', response }))
  }, [personId])

  return [state]
}

const UserCard = ({
  user,
  likeButtonPressedCount,
  logoColor,
  logoAnimationDuration,
  handleLogoAnimationDurationChange,
}) => {
  const dialogOpener = useOpener()
  const [{ portraitUrl }] = usePersonPortrait(user.personId)
  const [{ details }] = usePersonDetails(user.personId)
  // const { personId, cisId, gender, displayName, contactName } = user
  const { displayName, contactName } = user

  return details ? (
    <Card>
      <TypeBlock avatarProps={{ src: portraitUrl }} header={displayName} subHeader={contactName} />
      <CardContent>
        <List>
          <ListItem primaryText="Like Button Press Count" metaText={`${likeButtonPressedCount}`} Icon={SocialLike} />
          <ListItem
            primaryText="Logo Color"
            metaText={logoColor}
            Icon={() => (
              <ViewerContrastMore
                css={css`
                  color: ${logoColor};
                `}
              />
            )}
          />
          <ListItem
            Icon={MediaFastForward}
            primaryText={
              <TextField
                id="logo-animation-duration"
                label="Animation Duration"
                value={logoAnimationDuration}
                onChange={(e) => handleLogoAnimationDurationChange(e.target.value)}
              />
            }
          />
        </List>
      </CardContent>

      <CardActions>
        <Button onClick={dialogOpener.open}>User Info</Button>
        <Button emphasis="high" href="/auth/familysearch/logout">
          Sign Out
        </Button>
      </CardActions>
    </Card>
  ) : null
}

UserCard.propTypes = {
  /** Needed to display the various attributes of a user. */
  user: PropTypes.shape({
    cisId: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
    contactName: PropTypes.string.isRequired,
    personId: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
  }),
  /** Used to display how many times the like button was clicked. */
  likeButtonPressedCount: PropTypes.number.isRequired,
  /** Used to set the color of the logo. */
  logoColor: PropTypes.string.isRequired,
  /** The duration of animation of the logo. */
  logoAnimationDuration: PropTypes.number.isRequired,
  /** Set the duration of animation of the logo. */
  handleLogoAnimationDurationChange: PropTypes.func.isRequired,
}

// Use React.memo() to keep our component from re-rendering if the props havent changed
// https://reactjs.org/docs/react-api.html#reactmemo
// https://egghead.io/lessons/react-prevent-unnecessary-component-rerenders-with-react-memo
export default React.memo(UserCard)
