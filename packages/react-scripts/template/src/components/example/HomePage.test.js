import React from 'react'
import { render } from '@fs/zion-testing-library'
import HomePage from './HomePage'

jest.mock('@fs/zion-user', () => ({
  useUser: () => ({
    signedIn: false,
    userLoading: true,
  }),
}))

afterEach(() => {
  jest.resetAllMocks()
})

test('renders with Frontier Application on the page', async () => {
  const { getByText } = render(<HomePage />)
  const frontierApplication = getByText(/Welcome to the start of your new Frontier application/i)
  expect(frontierApplication).toBeInTheDocument()
})
