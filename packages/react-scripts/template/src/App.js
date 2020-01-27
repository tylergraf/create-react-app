import React from 'react'
import { Tab, Tabs } from '@fs/zion-ui'
import { Switch, Route, AuthRoute, NotFound } from '@fs/zion-router'
import ErrorBoundary from '@fs/zion-error-boundary'

// Dynamically load components to reduce bundle size
// https://reactjs.org/docs/react-api.html#reactlazy
const HomePage = React.lazy(() => import('./components/example/HomePage'))
const UserInfo = React.lazy(() => import('./components/example/UserInfo'))
// const I18nPage = React.lazy(() => import('./components/example/I18nPage'))

function App() {
  return (
    <ErrorBoundary>
      <Tabs>
        <Tab title="Home" to="./" />
        <Tab title="User Info" to="/user" />
        {/* <Tab title="I18n" to="/i18n" /> */}
      </Tabs>

      <Switch>
        <Route exact path="/" component={HomePage} />
        <AuthRoute path="/user" component={UserInfo} />
        {/* <Route path="/i18n" component={I18nPage} /> */}
        <Route component={NotFound} />
      </Switch>
    </ErrorBoundary>
  )
}
export default App
