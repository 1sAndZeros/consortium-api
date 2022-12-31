# Express API Starter

How to use this template:

```sh
npx create-express-api --directory my-api-name
```

Includes API Server utilities:

* [morgan](https://www.npmjs.com/package/morgan)
  * HTTP request logger middleware for node.js
* [helmet](https://www.npmjs.com/package/helmet)
  * Helmet helps you secure your Express apps by setting various HTTP headers. It's not a silver bullet, but it can help!
* [dotenv](https://www.npmjs.com/package/dotenv)
  * Dotenv is a zero-dependency module that loads environment variables from a `.env` file into `process.env`
* [cors](https://www.npmjs.com/package/cors)
  * CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.

Development utilities:

* [nodemon](https://www.npmjs.com/package/nodemon)
  * nodemon is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected.
* [eslint](https://www.npmjs.com/package/eslint)
  * ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.
* [jest](https://www.npmjs.com/package/jest)
  * Jest is a delightful JavaScript Testing Framework with a focus on simplicity.
* [supertest](https://www.npmjs.com/package/supertest)
  * HTTP assertions made easy via superagent.

## Setup

```
npm install
```

## Lint

```
npm run lint
```

## Test

```
npm test
```

## Development

```
npm run dev
```

### TODO

* [x] Setup Server
  * [x] Install Dependencies
  * [x] Install / Setup Linter
  * [x] Setup Express App
  * [x] Setup Not Found and Error Middlewares
* [x] Model DB
  * What data will we store?
* [x] Setup Mongoose Model(s)
* [ ] POST /bets
  * Create a new bet entry
* [ ] GET / bets
  * List all bet entries
* [ ] Setup Client
* [ ] Create Form to add a new entry
* [ ] Connect to Football API
* [ ] Setup Football API Widget
* [ ] Setup Table to show current bet
* [ ] Table to show leagues & stats
* [ ] Setup Auth
* [ ] DEPLOY!