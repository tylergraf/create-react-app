import React from 'react'
import { useUser } from '@fs/zion-user'

const RequireSignedInUser = ({ Component, NotSignedInComponent, ...props }) => {
  const user = useUser()
  return user.signedIn ? <Component user={user} {...props} /> : <NotSignedInComponent />
}

export default RequireSignedInUser
