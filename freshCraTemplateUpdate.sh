#! /bin/bash

npm i -g json
cd ${HOME}/tmp/fresh-cra-template

# The order of these sed commands is kind of important. The last one of uncommenting all lines needs to occur after
# removing comments explaining in english steps for replacing the binding path
sed -i.bak 's/{{BINDING_PATH}}/fresh-cra-template.frontier/' blueprint.yml
# https://stackoverflow.com/questions/5410757/delete-lines-in-a-text-file-that-contain-a-specific-string
sed -i.bak '/Replace/d' blueprint.yml
sed -i.bak '/See/d' blueprint.yml
sed -i.bak 's/#//' blueprint.yml

# @fs/react-scripts dep version points to the local file (cause of `npx create-react-app file:localReactScriptsPath`),
# so we need to replace that with the actual version
NEW_CRA_VERSION=$(json -f ${TRAVIS_BUILD_DIR}/packages/react-scripts/package.json version)
echo "NEW_CRA_VERSION: $NEW_CRA_VERSION"
json -I -f package.json -e "this.dependencies[\"@fs/react-scripts\"]=\"$NEW_CRA_VERSION\""

# Put the fresh-cra-template behind github auth
npm i cookie-session fs-webdev/express-github-org-auth#semver:^1
sed -i.bak '1 i\
  const cookieSession = require(\"cookie-session\")\
  ' server.js
sed -i.bak '1 i\
   const githubOrgAuth = require(\"express-github-org-auth\")\
  ' server.js
sed -i.bak '/const snowApp/a\
  snowApp.stack.preRoute(() => {\
        // Authenticate all the things. Must be member of github org(s) to view\
    snowApp.use(cookieSession({ keys: [process.env.SESSION_SECRET] }))\
    // require github org auth\
    githubOrgAuth(['fs-webdev', 'fs-eng'], snowApp)\
  })' server.js
sed -i.bak '/proxyUser/d' server.js
sed -i.bak '/cacheEncryption/d' server.js


rm blueprint.yml.bak
rm package-lock.json

git commit -a -m 'putting correct blueprint.yml file in place'
git remote add origin https://github.com/fs-webdev/fresh-cra-template.git
git push --force origin master
