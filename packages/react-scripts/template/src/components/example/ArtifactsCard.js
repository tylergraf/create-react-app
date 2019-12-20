import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardActions, CardContent, CardMedia, IconButton, HeaderBlock, TypeBlock, colors, Separator } from '@fs/zion-ui'
import { Body1, Caption } from '@fs/zion-ui/type'
import { css } from '@emotion/core'
import { SocialLike, ArrowChevron } from '@fs/zion-icon'
import axios from '@fs/zion-axios'
import { boolAttr } from '@fs/zion-frontend-friends'

// Custom hook for fetching artifacts from the the memory service
const useArtifacts = (cisId) => {
  // Handles dispatched actions
  // Take an action type, applies state changes and returns new state
  const reducer = (state, { type, ...data }) => {
    switch (type) {
      case 'LOADING':
        return { ...state, loading: true }
      case 'SUCCESS': {
        const { artifacts } = data
        return { ...state, loading: false, artifacts }
      }
      case 'ERROR':
        return { ...state, loading: false, error: data.error }
      default:
        throw new Error(`Unknown action type: ${type}`)
    }
  }

  const [state, dispatch] = React.useReducer(reducer, { loading: true })

  // Fetch artifacts from memory service
  React.useEffect(() => {
    // Dispatch action to update loading state
    dispatch({ type: 'LOADING' })

    // Initiate API call
    axios
      .get(
        `/service/memories/presentation/patrons/${cisId}/persons?numTaggedPersonArtifacts=3&includeTaggedPersons=true&includeEmptyPersons=false&includeHistory=false`
      )
      .then((response) => response.data.filter((a) => a.featuredImages && a.featuredImages.length > 0))
      .then((artifacts) => {
        // Success!  Dispatch action with results
        dispatch({ type: 'SUCCESS', artifacts })
      })
      .catch((error) => dispatch({ type: 'ERROR', error })) // Dispatch Error, update state
  }, [cisId])

  return [state]
}

const ArtifactsCard = ({ cisId, likeButtonPressed }) => {
  // Initiate state variables
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const [liked, setLiked] = React.useState([])

  // Use our custom hook
  const [{ loading, artifacts, error }] = useArtifacts(cisId)

  // Event handlers
  const handleNextClick = () => {
    setSelectedIndex((currentIndex) => currentIndex + 1)
  }

  const handlePreviousClick = () => {
    setSelectedIndex((currentIndex) => currentIndex - 1)
  }

  const handleToggleLiked = () => {
    // Notify parent that the like button was pressed
    likeButtonPressed()

    // Update internal state
    setLiked((current) => {
      current[selectedIndex] = !current[selectedIndex]
      return current
    })
  }

  // Helper functions for rendering
  function renderLoading() {
    return (
      <CardContent>
        <HeaderBlock size="sm" heading="Loading ... " />
      </CardContent>
    )
  }

  function renderError() {
    return (
      <CardContent>
        <TypeBlock size="sm" heading="An Error Occurred" />
      </CardContent>
    )
  }

  function renderNoArtifacts() {
    return (
      <CardContent>
        <Body1>There are no artifacts to display</Body1>
      </CardContent>
    )
  }

  function renderArtifacts() {
    if (!artifacts || !artifacts.length) return renderNoArtifacts()

    const selectedArtifact = artifacts ? artifacts[selectedIndex] : null
    const featuredImage = selectedArtifact ? selectedArtifact.featuredImages[0] : null
    return (
      <>
        <CardMedia
          height="calc(var(--cell-width) / 1.403)"
          image={featuredImage.thumbSquareUrl}
          title={featuredImage.title}
        />
        <CardContent>
          <Separator size="xs" />
          <HeaderBlock size="sm" heading={selectedArtifact.name} />
          <Caption>{featuredImage.title}</Caption>
        </CardContent>
        <CardActions>
          <ToggleIconButton
            aria-label="Click to like this photo"
            Icon={SocialLike}
            onClick={handleToggleLiked}
            pressed={liked[selectedIndex]}
          />
          <IconButton
            aria-label="Click to see the previous photo"
            Icon={ArrowChevron}
            onClick={handlePreviousClick}
            iconDirection="left"
            disabled={selectedIndex === 0}
          />
          <IconButton
            aria-label="Click to see the next photo"
            Icon={ArrowChevron}
            onClick={handleNextClick}
            disabled={selectedIndex + 1 === artifacts.length}
          />
        </CardActions>
      </>
    )
  }

  return (
    <Card stretch={false}>
      {error && renderError()}
      {loading ? renderLoading() : renderArtifacts()}
    </Card>
  )
}

const ToggleIconButton = ({ pressed = false, ...props }) => {
  const buttonStyle = css`
    &[pressed] {
      svg {
        fill: ${colors.link.visited};
      }
    }
  `
  return (
    <div css={buttonStyle} pressed={boolAttr(pressed)}>
      <IconButton {...props} />
    </div>
  )
}

ArtifactsCard.propTypes = {
  /** User is needed to obtain artifacts from their family history from memory service. */
  user: PropTypes.shape({
    cisId: PropTypes.string.isRequired,
  }).isRequired,
  /** This is a function that is used to notify the parent that the like button was pressed. */
  likeButtonPressed: PropTypes.func.isRequired,
}

// Because our component renders the same result given the same props, it makes sense not
// to render it again if the props haven't changed.   To do this we can use React.memo().  For
// more information see the links below:
// https://reactjs.org/docs/react-api.html#reactmemo
// https://egghead.io/lessons/react-prevent-unnecessary-component-rerenders-with-react-memo
export default React.memo(ArtifactsCard)
