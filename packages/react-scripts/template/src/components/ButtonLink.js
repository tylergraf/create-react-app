import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '@fs/zion-ui'

export default function ButtonLink({ href, ...props }) {
  return <Button variant="text" size="small" color="primary" href={href} {...props} />
}

ButtonLink.propTypes = {
  href: PropTypes.string.isRequired,
}
