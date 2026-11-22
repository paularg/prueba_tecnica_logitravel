# Technical Proof · React

React + TypeScript version of the front-end technical test, built with [Vite](https://vite.dev) and styled with [Tailwind CSS](https://tailwindcss.com).

## Getting started

```bash
npm install
npm run dev
```

Then open the URL shown in the terminal (usually `http://localhost:5173`).

## Scripts

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the development server         |
| `npm run build`   | Type-check and build for production  |
| `npm run preview` | Preview the production build         |
| `npm run lint`    | Lint the project with ESLint         |
| `npm run format`  | Format the source code with Prettier |

## Features

- Add items through a modal. Empty or whitespace-only text is not allowed.
- Select one or more items and delete them with the **Delete** button.
- Delete a single item with a double click.
- Undo changes with the **Undo** button (multiple steps supported).
- Keyboard support: items can be focused with `Tab` and toggled with `Enter` or `Space`. The modal closes with `Esc`.

## Project structure

```
src/
├── App.tsx              # Owns the state and connects the components
├── listReducer.ts       # State logic (add, toggle, delete, undo)
├── types.ts             # Domain types: Item, State, Action
├── index.css            # Tailwind import, design tokens (@theme) and base styles
└── components/
    ├── AddItemModal/    # Modal with the form to add an item
    ├── Button/          # Reusable button (primary / outline / icon)
    ├── Header/          # Title and description
    ├── ItemList/        # List container
    ├── ListActions/     # Undo, Delete and Add buttons
    ├── ListItem/        # Single selectable item
    └── UndoIcon/        # SVG icon
```

## Technical decisions

- **`useReducer` as the single source of truth.** All state changes go through a pure reducer, which keeps the logic in one place and makes it easy to test.
- **Undo with snapshots.** Before every change to the list, the current items are saved in `history`, so any number of changes can be undone.
- **Typed actions.** `Action` is a discriminated union, so TypeScript reports any action the reducer does not handle.
- **Native `<dialog>`.** Provides the backdrop, focus management and `Esc` to close without extra libraries.
- **Container / presentational components.** Only `App` knows about the reducer; the other components receive data and callbacks through props.
- **Tailwind CSS.** Styles live next to the markup as utility classes. The design tokens from the mockup (colors, font, radius, shadow) are defined once in `@theme`, which generates utilities such as `bg-primary` or `rounded-card`. States like the selected item or the modal backdrop use the `aria-selected:` and `backdrop:` variants, so no custom CSS is needed. Class order is kept consistent with `prettier-plugin-tailwindcss`.
- **Accessibility.** The list uses `role="listbox"` / `role="option"` with `aria-selected`, and the icon button has an `aria-label`.
