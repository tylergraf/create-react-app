// This is a magic file that CRA loads when running npm start.
// This file is only used in development mode.
// For more details see: https://bit.ly/2JfbgHX

// sets local proxies using http-proxy-middleware configs
// Docs here: https://www.familysearch.org/frontier/docs/develop/proxies
const setProxies = require('@fs/react-scripts/proxy/setupProxy')

// Make setProxies() available in other files
module.exports = (app) => {
  // Sets up local proxies for XHR calls.
  //      e.g. /service/tree/tf => https://beta.familysearch.org/service/service/tree/tf
  //      beta above comes from your .env file
  setProxies(app)
}
