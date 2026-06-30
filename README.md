# Code Notebook

A browser-based notebook for JavaScript and React — somewhere between a scratchpad and a lightweight Jupyter. You mix Markdown notes with runnable code cells in one file, saved locally as `notebook.js`.

![Screenshot of the app](screenshot.jpg)

Originally built as a learning project (Stephen Grider's course) and later updated to a modern stack: React 19, Vite, Redux Toolkit, with esbuild running entirely in the browser.

## How it works

The notebook is made of **cells**:

- **Text** — Markdown documentation; click to edit
- **Code** — JavaScript/JSX with Monaco on the left and a live preview on the right

Code runs in a sandboxed iframe. To see output, call `show(<Component />)`. Variables from earlier code cells carry over to later ones, similar to Jupyter.

You can `import` npm packages (e.g. `axios`) — they're fetched from unpkg and bundled client-side with esbuild-wasm.

On first launch you get a short welcome guide; the full reference is under **Help** in the header.

## Features

- [esbuild-wasm](https://esbuild.github.io/) — transpile and bundle code in the browser
- Custom esbuild plugins for loading npm packages from [unpkg.com](https://unpkg.com)
- [Monaco Editor](https://www.npmjs.com/package/@monaco-editor/react) for code cells
- [Prettier](https://www.npmjs.com/package/prettier) formatting
- [Markdown editor](https://www.npmjs.com/package/@uiw/react-md-editor) for text cells
- [Bulmaswatch Superhero](https://jenil.github.io/bulmaswatch/superhero/) theme
- [Redux Toolkit](https://redux-toolkit.js.org/) for state management
- npm workspaces monorepo (`local-client`, `local-api`, `cli`)

## Tech stack

React 19 · Vite · Redux Toolkit · TypeScript 5 · Express

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
npm run build
npm run start:prod
```

Open http://localhost:4005 (or the port set via `PORT`).

## Deploy on Render

This project runs as a **Web Service** (Node.js), not a static site.

1. Connect the GitHub repo on [Render](https://render.com)
2. Render reads [`render.yaml`](render.yaml) automatically, or set manually:
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm run start:prod`
3. Set `NODE_ENV=production` (included in `render.yaml`)

Production deploy uses **read-only demo mode** (`READ_ONLY_DEMO` / `VITE_READ_ONLY_DEMO` in `render.yaml`): the server always serves the canonical demo notebook, visitor edits are stored in the browser's local storage only, and **Reset demo** restores the default content.

On the free plan the service sleeps after inactivity; demo content is served from the app bundle, not from disk.
