// ---------- EVENTS ----------
import { state } from './state.js';
import {
  list,
  undoBtn,
  deleteBtn,
  openModalBtn,
  form,
  input,
  cancelBtn,
  submitBtn,
} from './dom.js';
import {
  addItem,
  deleteSelectedItems,
  toggleItemSelection,
  undo,
} from './actions.js';
import { openModal, closeModal } from './modal.js';

// Function that gets the ID of the item closest to the event
const getItemId = (event) => {
  const li = event.target.closest('.listItem');
  return li ? Number(li.dataset.id) : null;
};

// Function that registers all the event listeners of the app
export const bindEvents = () => {
  // Modal
  openModalBtn.addEventListener('click', openModal);
  cancelBtn.addEventListener('click', closeModal);

  // Enables or disables the submit button based on the input value
  input.addEventListener('input', () => {
    submitBtn.disabled = input.value.trim() === '';
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (input.value.trim() === '') return;

    addItem(input.value);
    closeModal();
  });

  // Actions
  deleteBtn.addEventListener('click', () =>
    deleteSelectedItems(state.selected),
  );
  undoBtn.addEventListener('click', undo);

  // List items (event delegation: one listener on the <ul> for every item)
  list.addEventListener('click', (event) => {
    const id = getItemId(event);
    if (id !== null) toggleItemSelection(id);
  });

  list.addEventListener('dblclick', (event) => {
    const id = getItemId(event);
    if (id !== null) deleteSelectedItems([id]);
  });

  // Keyboard support: Enter or Space toggles the focused item
  list.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;

    const id = getItemId(event);
    if (id === null) return;

    event.preventDefault();
    toggleItemSelection(id);
  });
};
