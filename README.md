# Places API

Search places around you.

## Endpoints:

### Search Places

```
GET /places/search?q={queryTerm}&near={city}
```

Parameters:

```
queryTerm: what to search for, i.e: "burgers"
city: where to search, i.e: "San Francisco, CA"
```

### Get Place

```
GET /places/{id}
```

Parameters:

```
id: the Place ID
```

## Frameworks and libs used

- serverless: Serverless framework used to package and deploy the service
- serverless-offline: Plugin used to run the API locally
- lambda-api: For serverless projects I prefer to use this package instead of expressjs because it's optimized for AWS Lambda, there are no external dependencies so the final package is smaller. Due to Cold Starts, this is an important feature.
- node-fetch: minimal HTTP client for NodeJS. It's used to interact with Foursquare API.
- jest: for unit testing/mocking

## System requirements

- serverless framework (`npm install -g serverless`)
- yarn or npm

## How to run

1. Install packages (just the first time):

```
yarn
```

2. Update Foursquare credentials on package.json:

This project requires environment variables containing the Foursquare API credentials. Replace the line below on `package.json` with the one provided by email:

```
FOURSQUARE_CLIENT_ID={CLIENT_ID} FOURSQUARE_CLIENT_SECRET={CLIENT_SECRET} sls offline
```

3. Run on localhost:

```
yarn start
```

This will start the server on http://localhost:3000/dev . You can start making requests such as:

```
http://localhost:3000/dev/places/search?q=boba&near=San Francisco, CA
```

```
http://localhost:3000/dev/places/58d451f495383907dba37158
```

4. Unit tests

```
yarn test
```

### TODO (improvements)

[] Retrieve credentials from .env or credentials file

[] Improve unit test coverage

[] Add eslint and prettier
