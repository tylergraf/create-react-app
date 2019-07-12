#! /bin/bash

cd ${HOME}/tmp/my-test-app
cp ${TRAVIS_BUILD_DIR}/freshCraTemplateBlueprint.yml ${HOME}/tmp/my-test-app/blueprint.yml
git commit -a -m 'putting correct blueprint.yml file in place'
git remote add origin https://github.com/fs-webdev/fresh-cra-template.git
git push --force origin master
