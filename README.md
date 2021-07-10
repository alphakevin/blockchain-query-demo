# Blockchain Query Blocklet Demo

This project is an demo [blocklet](https://www.arcblock.io/en/blocklets) for viewing BTC blockchain information by block hash

![Screen Shot](./screenshots/query-result.png)

## Development

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Also a graphql server [http://localhost:3030/graphql](http://localhost:3030/graphql) for backend.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Tech Specs

* Server
  * [express.js](http://expressjs.com/) for api server
  * [graphql.js](https://graphql.org/graphql-js/) for graphql server
  * [@abtnode/nedb](https://www.npmjs.com/package/@abtnode/nedb) for blockchain data caching
* Client
  * [Apollo](https://www.apollographql.com/) graphql client for data fetching
  * [Material-UI](https://material-ui.com/) for UI components

## License

The code is licensed under the MIT license found in the
[LICENSE](LICENSE) file.
