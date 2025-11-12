# Feed

This project is a recruitement exercise. This is not designed to be used in the wild but feel free to play with it. It was bootstrapped using `pnpm dlx create-turbo@latest`.

## Get started

This guide covers how to get & start the project.

### TL;DR / Quickstart

The whole process can be summarized in the following commands. You can check the detailed process bellow for more information on each step.

```shell
git clone https://github.com/pbellon/feed
cd feed
# you need pnpm installed, check `2. Install pnpm` if you don't have it
pnpm install # install all deps
pnpm build # run an initial build, necessary for the apps/api nodejs app
pnpm init-db # initialize the DB with some data
pnpm dev # or `pnpm start` to start in "production" mode
```

### Detailed install process

No need to follow this process if you have already gone through the Quickstart.

#### 1. Clone the project

```shell
git clone https://github.com/pbellon/feed
cd feed
```

#### 2. Install `node` & `pnpm`

We won't cover how to install NodeJS but I suggest using the "lts/krypton" version via [nvm](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating):

```shell
nvm install lts/krypton
nvm use lts/krypton
```

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

#### 3. Build & init database

You should then run an initial build, this is required in order to run the API.

Run this at the root of the repository:

```shell
pnpm build # or `pnpm --filter @feed/api build`
# Once the API built you can then init the database with
pnpm init-db
```

#### 4. Run the app

Once the API built you can start the app and open [localhost:3000](http://localhost:3000) in your browser.

```shell
# starts the app in dev mode
pnpm dev

# or in "prod" mode
pnpm build && pnpm start

# At this point you can open http://localhost:3000 in your browser
```

## Available scripts

### `pnpm dev`

Start `@feed/api` and `@feed/web` in development mode

### `pnpm start`

Start `@feed/api` and `@feed/web` in production mode

### `pnpm lint`

Check linting rules accross the mono-repo. You can also run `pnpm lint:fix` to fix auto-resolvable linting issues.

### `pnpm build`

Build the whole mono-repo packages.

### `pnpm format`

Format the code of the mono-repo using prettier.

### `pnpm check-types`

Check all types accross the mono-repo.

### `pnpm init-db`

Initialize database of the API app in apps/api.

## Project structure

The whole project is divided into three main parts:

| Path             | Package name  | Description                                          |
| ---------------- | ------------- | ---------------------------------------------------- |
| `apps/web`       | `@feed/web`   | Next.js frontend app                                 |
| `apps/api`       | `@feed/api`   | Fastify API application + SQLite database            |
| `packages/types` | `@feed/types` | Shared types & schemas between the front and the API |

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

## Demo

Please note that a fake latency delay has been added to showcase various pending states (initial loading vs pending etc).

### Sorting

https://github.com/user-attachments/assets/ca75f9c0-9e4a-49e5-9c41-1e2e556404c2

### Filtering

> Here we can notice that deep linking works seemlessly with browser previous/next buttons

https://github.com/user-attachments/assets/8c116f59-1ecd-4ed1-95f4-3d411d7c8e14

### Pagination

> Here we can notice that that current page get reset when filter changes to avoid displaying an empty page

https://github.com/user-attachments/assets/f1c93a9d-81a2-4c6c-b92a-a337a29d077b

### Navigation / Routing

> Here we can notice the initial state of a table in "Skeleton mode", after that we have a more subtle way of handling pending state by keeping previously loaded data visible

https://github.com/user-attachments/assets/8c014ace-c61e-46b0-8391-c1edc790ae47

### Bonus: responsive filter bar

Wasn't asked but I wanted to showcase how we could handle a responsive filter bar display

https://github.com/user-attachments/assets/1d354a85-9921-464e-86c9-63f663fb0c7d
