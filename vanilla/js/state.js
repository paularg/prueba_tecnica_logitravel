// ---------- STATE ----------
// Single source of truth: the UI is always rendered from this object
export const state = {
  items: [], // { id: number, text: string }[]
  selected: [], // ids of the selected items
  history: [], // previous snapshots of `items`, used by Undo
};

let nextId = 1;

// Function that returns a new unique id for an item
export const createId = () => nextId++;
