// ---------- ACTIONS ----------
// The only functions that modify the state. Each one re-renders what changed.
import { state, createId } from './state.js';
import { render, renderSelection, renderButtons } from './render.js';

// Function that saves the current state of the list to the history stack
const saveHistory = () => {
  state.history.push([...state.items]);
};

// Function that adds a new item to the list
export const addItem = (text) => {
  const value = text.trim();
  if (!value) return;

  saveHistory();
  state.items.push({ id: createId(), text: value });
  render();
};

// Function that deletes the selected items from the list
export const deleteSelectedItems = (ids) => {
  if (ids.length === 0) return;

  saveHistory();
  state.items = state.items.filter((item) => !ids.includes(item.id));
  state.selected = state.selected.filter((id) => !ids.includes(id));
  render();
};

// Function that toggles the selection of an item in the list
// Only the selection changed: the existing <li> are updated instead of rebuilt,
// so a double click still lands on the same element
export const toggleItemSelection = (id) => {
  state.selected = state.selected.includes(id)
    ? state.selected.filter((selectedId) => selectedId !== id)
    : [...state.selected, id];

  renderSelection();
  renderButtons();
};

// Function that undoes the last action performed on the list
export const undo = () => {
  if (state.history.length === 0) return;

  state.items = state.history.pop();
  state.selected = [];
  render();
};
