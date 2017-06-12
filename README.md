# planner

> A maintenance planner

## Notable modules

* vue (because I haven't used it previously, nice experience, I like it!)
* sequelize (loopback is another option which uses juggler, I'm indifferent though)
* sqlite3
* vue-material (easy to prototype nice interfaces - though I'm not an expert yet in it)
* axios (because axios is nice and the vue folks said they prefer it now over their vue-resource)
* jsonapi-server (for building json api compliant endpoints)
* express (considered koa and hapi, but express is easy and vue dev server uses it anyway)
* swagger-ui-express (serves the swagger API UI, though it does have to be done manually right now)
* vue-datepicker (needed something quick in a pinch)

## Funky things you might notice

1. Eslint and style: I'm generally a tabs/semicolon guy, but I went with the default for vue.js created for me in this case, (2-space/no semicolon eslint)
2. You do have to fire up the server to serve up the API separately from the server to do the dev work at the present time
3. Uses material design, just or ease of putting together

## Development

``` bash
# install dependencies
npm install

# run the server (the server that connects to sqlite is run separately from the server that runs the client)
node server/server

# serve the planner application with hot reload at localhost:9000 by default
npm run dev

# browse the swagger API at http://localhost:9001/api-docs
```

This comes with a sqlite database pre-loaded, however if you would like to build a new one, `rm planner.sqlite` and run `npm run syncdb` to create a new one

## Test

Note that tests are not yet complete, there's only 1 e2e and a few unit tests that don't get full coverage

```bash
# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```


## Build

```bash
# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## To rebuild swagger UI api docs

__this is a bit manual at the moment...__

1. Go to the swagger API location (by default http://localhost:9000/rest/swagger.json) in your browser
2. Copy the content and paste it into server/swagger/plans.json
3. Restart both servers (`node server/server` and `npm run dev`)

## To change the configuration of most things

1. from the root of the project directory `cd config`
2. You will find a number of config files here:
* `dev.env.js` is used in dev environment (NODE_ENV === 'dev')
* `prod.env.js` is used to build the production code (NODE_ENV === 'build')
* `test.env.js` is used in testing (NODE_ENV === 'test')
