# prepare environment for dev

git version: 2.21.0.windows.1
node version: v10.15.3

# how to check version

open cmd
git --version
node --version

# install package for dev

npm i --s express@4.16.4 mongoose@5.3.4 express-handlebars@3.0.0 body-parser@1.18.3
npm i nodemon
npm i -D handlebars@4.5.0

//run
nodemon server.js
