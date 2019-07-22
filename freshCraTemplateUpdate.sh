#! /bin/bash

cd ${HOME}/tmp/fresh-cra-template
# The order of these sed commands is kind of important. The last one of uncommenting all lines needs to occur after
# removing comments explaining in english steps for replacing the binding path
sed -i.bak 's/{{BINDING_PATH}}/fresh-cra-template.frontier/' blueprint.yml
# https://stackoverflow.com/questions/5410757/delete-lines-in-a-text-file-that-contain-a-specific-string
sed -i.bak '/Replace/d' blueprint.yml
sed -i.bak '/See/d' blueprint.yml
sed -i.bak 's/#//' blueprint.yml
rm blueprint.yml.bak
rm package-lock.json
git commit -a -m 'putting correct blueprint.yml file in place'
git remote add origin https://github.com/fs-webdev/fresh-cra-template.git
git push --force origin master
