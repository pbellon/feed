# Getting Started with [Fastify-CLI](https://www.npmjs.com/package/fastify-cli)

This project was bootstrapped with Fastify-CLI.
More info on fastify + typescript: [documentation](https://fastify.dev/docs/latest/Reference/TypeScript/)

## Available Scripts

In the project directory, you can run:

### `npm build`

Transpile typescript into runable JS code, required for `dev` and `start`

### `npm init-db`

Create SQLite database and load initial fixtures located in `scripts/data/fixtures.json`

### `npm run dev`

To start the app in dev mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm start`

For production mode, alias of `npm run dev` to ease `pnpm start` at the root of the mono-repo.
