# Front-end Technical Test

A small list manager built twice from the same design: once with **vanilla JavaScript** and once with **React + TypeScript**. Both versions share the same behaviour and look identical.

| Version            | Folder                   | Stack                                            |
| ------------------ | ------------------------ | ------------------------------------------------ |
| Vanilla JS         | [`vanilla/`](./vanilla/) | HTML, CSS and JavaScript (no build step)         |
| React + TypeScript | [`react/`](./react/)     | React 19, TypeScript, Vite, Tailwind CSS, Vitest |

## Features

Required:

- Add items to the list through a modal.
- Empty or whitespace-only text cannot be added.
- Select an item and delete it with the **Delete** button.

Optional (all implemented):

- Select several items and delete them at once.
- Delete a single item with a double click (mouse only; on touch devices, select the item and use **Delete**).
- Undo changes with the **Undo** button, several steps in a row.

Also included:

- Keyboard support: items can be focused with `Tab` and toggled with `Enter` or `Space`, and the modal closes with `Esc`.
- Responsive layout for mobile and desktop.

## Getting started

### Vanilla JS

No installation needed. Open `vanilla/index.html` in the browser, or serve the folder with live reload:

```bash
npx live-server vanilla
```

### React

```bash
cd react
npm install
npm run dev
```

Then open the URL shown in the terminal (usually `http://localhost:5173`). See the [React README](./react/README.md) for all the scripts, the tests and the project structure.

## How it works

Both versions follow the same idea: **the state is the single source of truth and the UI is rendered from it**.

```js
state = {
  items: [], // { id, text }
  selected: [], // ids of the selected items
  history: [], // previous snapshots of items, used by Undo
};
```

Every change to the list saves a copy of the current items in `history` first, so Undo only has to restore the last snapshot.

| Concept     | Vanilla JS                                                      | React                                     |
| ----------- | --------------------------------------------------------------- | ----------------------------------------- |
| State       | A plain `state` object                                          | `useReducer` with typed actions           |
| Changes     | `addItem`, `toggleItemSelection`, `deleteSelectedItems`, `undo` | `ADD`, `TOGGLE`, `DELETE`, `UNDO` actions |
| Rendering   | `render()` rebuilds the list from the state                     | React re-renders the components           |
| Item events | One delegated listener on the `<ul>`                            | Handlers on each `ListItem`               |
| Styles      | Plain CSS with custom properties                                | Tailwind CSS with the tokens in `@theme`  |
| Tests       | —                                                               | Unit tests for the reducer with Vitest    |

Shared decisions:

- **Native `<dialog>`** for the modal: backdrop, focus management and `Esc` to close without extra code or libraries.
- **Accessibility**: the list uses `role="listbox"` / `role="option"` with `aria-selected`, and the icon button has an `aria-label`.
- **Safe rendering**: item text is always inserted as text, never as HTML.

## Repository structure

```
.
├── vanilla/
│   ├── index.html
│   ├── styles.css
│   ├── app.js
│   └── favicon.svg
└── react/
    ├── src/
    ├── package.json
    └── README.md
```

## Conventions

Commits follow [Conventional Commits](https://www.conventionalcommits.org/) with the version as scope, for example `feat(react): ...` or `fix(vanilla): ...`.
