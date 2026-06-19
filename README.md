# Code notebook

**Code-notebook** is a development environment for writing and documenting JavaScript code inside the browser.
Markdown editor for creating documentation sections and code editor for writing and executing JavaScript code.

---

![Screenshot of the app](screenshot.jpg)

---

## Features

- [ESBuild](https://esbuild.github.io/) (esbuild-wasm) to transpile and bundle code directly in the browser
- Custom ESBuild plugins for loading npm packages from unpkg.com
- Monaco Text Editor ([@monaco-editor/react](https://www.npmjs.com/package/@monaco-editor/react))
- [Prettier](https://www.npmjs.com/package/prettier) to format user code
- [Markdown Editor](https://www.npmjs.com/package/@uiw/react-md-editor) for text cells
- [bulmaswatch/superhero](https://jenil.github.io/bulmaswatch/superhero/) theme
- State management: [Redux Toolkit](https://redux-toolkit.js.org/)
- Monorepo with npm workspaces

## Tech stack

- React 19
- Vite
- Redux Toolkit
- TypeScript 5
- Express (local API)

## Requirements

- Node.js 20+

## Getting started

1. Install dependencies

   ```bash
   npm install
   ```

2. Run the app

   ```bash
   npm run start
   ```

   This starts:
   - Vite dev server on [localhost:5173](http://localhost:5173)
   - Express API + proxy on [localhost:4005](http://localhost:4005)

3. Open [localhost:4005](http://localhost:4005/) to use the notebook

## Production build

```bash
npm run build -w local-client
NODE_ENV=production node packages/cli/dist/index.js serve
```
