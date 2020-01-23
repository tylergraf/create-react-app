import React from 'react'
import { useUser } from '@fs/zion-user'
import { useTranslation } from 'react-i18next'
import { Cell, Grid, HeaderBlock, List, ListItem, PersonBlock, Separator, CollapsableListItem } from '@fs/zion-ui'
import axios from '@fs/zion-axios'
import usePersonPortrait from './portraitService'
import ResponsiveDebug from './ResponsiveDebug'

export default function UserInfo() {
  const { t } = useTranslation()
  const user = useUser()
  const [{ portraitUrl }] = usePersonPortrait(user.personId)
  const [{ details }] = usePersonDetails(user.personId)

  console.log('user', user, portraitUrl, details)
  if (!user.signedIn || !details) return 'Loading ...'
  const sex = user.gender ? user.gender.toLowerCase() : 'unknown'
  return (
    <>
      <Separator size="sm" />
      <Grid>
        <Cell>
          <HeaderBlock
            size="lg"
            heading={t('welcome.message.name', 'Welcome to FamilySearch, {name}', { name: user.displayName })}
          />
          <Separator size="sm" />
        </Cell>
        <Cell>
          <PersonBlock
            size="lg"
            avatarProps={{
              src: portraitUrl || '',
              sex,
            }}
            name={user.displayName}
            details={`${user.personId}`}
          />
        </Cell>
        <Cell>
          <List>
            <CollapsableListItem primaryText="Identification">
              <ListItem primaryText="CIS" metaText={user.cisId} />
              <ListItem primaryText="PID" metaText={user.personId} />
              <ListItem primaryText="Family Name" metaText={details.familyName} />
              <ListItem primaryText="Full Bame" metaText={details.fullName} />
              <ListItem primaryText="Display Name" metaText={user.displayName} />
              <ListItem primaryText="Contact Name" metaText={user.contactName} />
              <ListItem primaryText="Gender" metaText={user.gender} />
            </CollapsableListItem>
            <CollapsableListItem primaryText="Birth">
              <ListItem primaryText="Lifespan" metaText={details.summary.lifespan} />
              <ListItem primaryText="Date of Birth" metaText={details.summary.lifespanBegin.date.original} />
              <ListItem primaryText="Place of Birth" metaText={details.summary.lifespanBegin.place.original} />
            </CollapsableListItem>
            <CollapsableListItem primaryText="Stats">
              <ListItem primaryText="Contributor Count" metaText={details.personStats.contributorCount} />
              <ListItem primaryText="User Change Count" metaText={details.personStats.userChangeCount} />
            </CollapsableListItem>
          </List>
        </Cell>
      </Grid>
      <ResponsiveDebug />
    </>
  )
}

// Hook for fetching a users details
function usePersonDetails(personId) {
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
