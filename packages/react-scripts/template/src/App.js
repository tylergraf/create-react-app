import React, { Suspense } from 'react'
import { Tab, Tabs } from '@fs/zion-ui'
import { Switch, Route, AuthRoute, NotFound } from '@fs/zion-router'
import ErrorBoundary from '@fs/zion-error-boundary'
import NoticeLoading from '@fs/zion-icon'

// Dynamically load components to reduce bundle size
// https://reactjs.org/docs/react-api.html#reactlazy

const HomePage = React.lazy(() => import('./components/example/HomePage'))
const UserInfoPage = React.lazy(() => import('./components/example/UserInfoPage'))
const I18nPage = React.lazy(() => import('./components/example/I18nPage'))

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<NoticeLoading />}>
        <Tabs>
          <Tab title="Home" to="./" />
          <Tab title="User Info" to="/user" />
          <Tab title="I18n" to="/i18n" />
        </Tabs>

        <Switch>
          <Route exact path="/" component={HomePage} />
          <AuthRoute path="/user" component={UserInfoPage} />
          <Route path="/i18n" component={I18nPage} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </ErrorBoundary>
  )
}
export default App
