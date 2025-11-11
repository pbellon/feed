# Feed

This project is a recruitement exercise. This is not designed to be used in the wild but feel free to play with it.

## Get started

This guide covers how to get & start the project.

### TL;DR / Quickstart

```shell
git clone https://github.com/pbellon/feed
cd feed
# you need pnpm installed, check `2. Install pnpm` if you don't have it
pnpm install # install all deps
pnpm build # run an initial build, necessary for the apps/api nodejs app
pnpm init-db # initialize the DB with some data
pnpm dev # or `pnpm start` to start in "production" mode
```

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

On Windows (powershell):

```powershell
Invoke-WebRequest https://get.pnpm.io/install.ps1 -UseBasicParsing | Invoke-Expression
# May require to disable Microsoft Defender's protections on pnpm
Add-MpPreference -ExclusionPath $(pnpm store path)
```

### 3. Build & init database

You should then run an initial build, this is required in order to run the API.

Run this at the root of the repository:

```shell
pnpm build # or `pnpm --filter @feed/api build`
# Once the API built you can then init the database with
pnpm init-db
```

### 4. Run the app

Once the API built you can start the app and open [localhost:3000](http://localhost:3000) in your browser.

```shell
# starts the app in dev mode
pnpm dev

# or in "prod" mode
pnpm build && pnpm start

# At this point you can open http://localhost:3000 in your browser
```

## Project structure

The main parts of the app are:

- `apps/web` next.js frontend app
- `apps/api` fastify API application + SQLite database
- `packages/types` shared types & schemas between the front and the API
- `packages/eslint-config` shared configs for eslint

### Points of interest for the exercise

Since the goal of the project is to implement filtering on the "Activity feed" page, here are the
main parts that handle this feature:

| File                                                   | Description                                                                                        |
| ------------------------------------------------------ | -------------------------------------------------------------------------------------------------- |
| `apps/web/app/(console)/[websiteId]/layout.tsx`        | Shared layout containing the website selector and overall navigation between tabs                  |
| `apps/web/app/(console)/[websiteId]/activity/page.tsx` | Page entry point for next.js                                                                       |
| `apps/web/lib/FeedContext/`                            | Centralize the state management for filtering, pagination & sorting logic related to activity feed |
| `apps/web/lib/ui/FeedTable/`                           | Handle the feed table display + sort & pagination UI logic                                         |
| `apps/web/lib/ui/FeedFitlerBar/`                       | Handle all filtering UI logic related to `FeedContext`                                             |
