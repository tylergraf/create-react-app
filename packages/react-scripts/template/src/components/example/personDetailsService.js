import React from 'react'
import axios from '@fs/zion-axios'

// Hook for fetching a users details
export default function usePersonDetails(personId) {
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
