# Find a Friend API

This is the API for the Find a Friend application.

## About

Find a Friend is a social network for people who want to find friends with similar interests.

## API

The API is built using Fastify and TypeScript.

### Endpoints

#### GET /orgs

Returns a list of all organizations.

#### GET /orgs/:id

Returns the organization with the specified id.

#### POST /orgs

Creates a new organization.

#### GET /pets

Returns a list of all pets.

#### GET /pets/:id

Returns the pet with the specified id.

#### POST /pets

Creates a new pet.

#### GET /users

Returns a list of all users.

#### GET /users/:id

Returns the user with the specified id.

#### POST /users

Creates a new user.

#### POST /login

Logs in a user and returns a JWT token.

#### POST /logout

Logs out a user.

### Authentication

The API uses JWT tokens for authentication. To use the API, you need to log in and obtain a JWT token. The token can then be used to authenticate requests to the API.

### Environment Variables

The API requires the following environment variables to be set:

* `DATABASE_URL`: The URL of the PostgreSQL database.
* `JWT_SECRET`: The secret key used to sign JWT tokens.

### Building and Running

To build and run the API, you need to have Node.js installed. You can then run the following commands:

* `npm install`: Installs the dependencies.
* `npm run build`: Builds the API.
* `npm run start`: Starts the API.

The API will then be available at `http://localhost:3333`.

### Testing

The API has unit tests and integration tests. To run the tests, you can use the following commands:

* `npm run test:unit`: Runs the unit tests.
* `npm run test:integration`: Runs the integration tests.
