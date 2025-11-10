# Feed

This project is a recruitement exercise. This is not designed to be used in the wild but feel free to play with it.

## Get started

This guide covers how to get & start the project.

### 1. Clone the project

```shell
git clone https://github.com/pbellon/feed
cd feed
```

### 2. Install `pnpm`

This project relies on pnpm's workspace management, so you should [install pnpm](https://pnpm.io/fr/installation).

On linux:

```shell
curl -fsSL https://get.pnpm.io/install.sh | sh -
# or if you don't have curl installed
wget -qO- https://get.pnpm.io/install.sh | sh -
```

On Windows:

```powershell
Invoke-WebRequest https://get.pnpm.io/install.ps1 -UseBasicParsing | Invoke-Expression
# May require to disable Microsoft Defender's protections on pnpm
Add-MpPreference -ExclusionPath $(pnpm store path)
```

### 3. Build & init database

You should then run an initial build, this is required in order to run the API.

Run this at the root of the repository:

```shell
pnpm build
# or
pnpm --filter @feed/api build
```

Once the API built you can then init the database with

```shell
pnpm --filter @feed/api db:init
```

### 4. Run the app

Once the API built you can start the app and open [localhost:3000](http://localhost:3000) in your browser.

```shell
# starts the app in dev mode
pnpm dev

# or in "prod" mode
pnpm build && pnpm start
```

## Project structure

The main parts of the app are:

- `apps/web` next.js frontend app
- `apps/api` fastify API application
- `packages/types` shared types & schemas between the front and the API
