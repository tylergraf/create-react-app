import React from 'react'
import { render } from '@fs/zion-testing-library'
import HomePage from './HomePage'

test('renders with Frontier Application on the page', () => {
  const { getByText } = render(<HomePage />)
  const frontierApplication = getByText(/Welcome to the start of your new Frontier application/i)
  expect(frontierApplication).toBeInTheDocument()
})
