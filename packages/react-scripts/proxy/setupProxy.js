const proxy = require('http-proxy-middleware')

/* eslint-disable-next-line import/no-extraneous-dependencies */
require('dotenv').config()

const setProxies = (app, customProxies = []) => {
  // detect env
  const env = process.env.TARGET_ENV || 'local'

  // bring in auth middleware once required keys are set
  const cookieParser = require('cookie-parser')
  const base = require('connect-base')
  const metric = require('connect-metric')
  const auth = require('auth-middleware')
  const resolver = require('./resolver')
  const proxyList = require('./proxies')

  // middleware required for auth middleware
  app.use(metric())
  app.use(base())
  app.use(resolver())
  app.use(cookieParser())

  // auth middleware
  auth('/auth', app)
  console.log('\n/auth local proxy set up!')

  // set default env target
  // prod auth keys don't exist in fs-config for security reasons, so only other alt-envs for now
  const target = process.env.BASE_URL

  const setProxy = proxyConfig => {
    app.use(
      proxy(proxyConfig.route, {
        target,
        changeOrigin: true,
        logLevel: 'debug',
        timeout: 5000,
        ...proxyConfig.options,
      })
    )
  }

  // set up all custom proxies first so they can override the defaults if needed
  customProxies.forEach(config => setProxy(config))
  // set up all default proxies
  proxyList.forEach(proxyConfig => setProxy(proxyConfig))
}

module.exports = setProxies
