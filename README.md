# React + Vite + Yarn 2.0

This is a simple React application using Vite as the build tool and Yarn 2.0 as the package manager.

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (Recommended: LTS version)
- [Yarn 2.0](https://yarnpkg.com/getting-started/install)

## Installation

1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd <project-folder>
   ```
2. Install dependencies:
   ```sh
   yarn install
   ```

## Environment Variables

Create a `.env` file in the root directory and add the following variables:

```sh
VITE_BASE_URL=https://api.themoviedb.org/3
VITE_TMDB_API_KEY=<your_tmdb_api_key>
VITE_TMDB_AUTH_KEY=<your_tmdb_auth_key>
```

## Development

To start the development server, run:

```sh
yarn dev
```

This will start the Vite development server, and you can access the application at `http://localhost:5173/` by default.

## Build

To build the project, use:

```sh
yarn build
```

To build the project for production, use:

```sh
yarn build-prod
```

The output will be in the `dist` folder.

## Preview

To preview the production build locally, run:

```sh
yarn preview
```

## Linting & Formatting

To lint the code:

```sh
yarn lint
```

To format the code:

```sh
yarn format
```

## Using @yarnpkg/sdks

To enable proper IDE support for TypeScript, ESLint, and Prettier when using Yarn 2, you can run:

```sh
yarn dlx @yarnpkg/sdks vscode
```

This will generate the necessary SDKs for better development experience in VSCode and other editors.
