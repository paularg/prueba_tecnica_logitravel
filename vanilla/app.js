// ---------- STATE ----------
const state = {
  items: [],
  selected: [],
  history: [],
};

let nextId = 1;

// ---------- DOM ELEMENTS ----------
const list = document.getElementById('list');
const undoBtn = document.getElementById('undo-btn');
const deleteBtn = document.getElementById('delete-btn');
const openModalBtn = document.getElementById('open-modal-btn');
const modal = document.getElementById('modal');
const form = document.getElementById('item-form');
const input = document.getElementById('item-input');
const cancelBtn = document.getElementById('cancel-btn');
const submitBtn = form.querySelector('button[type="submit"]');

// ---------- ACTIONS ----------
// Function that saves the current state of the list to the history stack
const saveHistory = () => {
  state.history.push([...state.items]);
};

// Function that adds a new item to the list
const addItem = (text) => {
  const value = text.trim();
  if (!value) return;

  saveHistory();
  state.items.push({ id: nextId++, text: value });
  render();
};

// Function that deletes the selected items from the list
const deleteSelectedItems = (ids) => {
  if (ids.length === 0) return;

  saveHistory();
  state.items = state.items.filter((item) => !ids.includes(item.id));
  state.selected = state.selected.filter((id) => !ids.includes(id));
  render();
};

// Function that toggles the selection of an item in the list
const toggleItemSelection = (id) => {
  state.selected = state.selected.includes(id)
    ? state.selected.filter((selectedId) => selectedId !== id)
    : [...state.selected, id];

  renderSelection();
  renderButtons();
};

// Function that undoes the last action performed on the list
const undo = () => {
  if (state.history.length === 0) return;

  state.items = state.history.pop();
  state.selected = [];
  render();
};

// ---------- RENDERING ----------
// Function that renders the list of items
const renderList = () => {
  list.innerHTML = '';

  state.items.forEach((item) => {
    const li = document.createElement('li');
    li.className = 'listItem';
    li.dataset.id = item.id;
    li.tabIndex = 0;
    li.setAttribute('role', 'option');
    li.textContent = item.text; // textContent avoids HTML injection
    list.appendChild(li);
  });
};

// Function that renders the selection of items in the list
const renderSelection = () => {
  list.querySelectorAll('.listItem').forEach((li) => {
    const isSelected = state.selected.includes(Number(li.dataset.id));
    li.setAttribute('aria-selected', isSelected);
  });
};

// Function that renders the state of the action buttons
const renderButtons = () => {
  deleteBtn.disabled = state.selected.length === 0;
  undoBtn.disabled = state.history.length === 0;
};

// Function that renders the entire application
const render = () => {
  renderList();
  renderSelection();
  renderButtons();
};

// ---------- MODAL ----------
// Function that opens the modal for adding a new item
const openModal = () => {
  input.value = '';
  submitBtn.disabled = true;
  modal.showModal();
  input.focus();
};

// Function that closes the modal
const closeModal = () => {
  modal.close();
};

// ---------- EVENTS ----------

openModalBtn.addEventListener('click', openModal);
cancelBtn.addEventListener('click', closeModal);

// Function that enables or disables the submit button based on the input value
input.addEventListener('input', () => {
  submitBtn.disabled = input.value.trim() === '';
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (input.value.trim() === '') return;

  addItem(input.value);
  closeModal();
});

deleteBtn.addEventListener('click', () => deleteSelectedItems(state.selected));
undoBtn.addEventListener('click', undo);

// Function that gets the ID of the item closest to the event
const getItemId = (event) => {
  const li = event.target.closest('.listItem');
  return li ? Number(li.dataset.id) : null;
};

list.addEventListener('click', (event) => {
  const id = getItemId(event);
  if (id !== null) toggleItemSelection(id);
});

list.addEventListener('dblclick', (event) => {
  const id = getItemId(event);
  if (id !== null) deleteSelectedItems([id]);
});

// Function that handles the selection of items via the keyboard
list.addEventListener('keydown', (event) => {
  if (event.key !== 'Enter' && event.key !== ' ') return;

  const id = getItemId(event);
  if (id === null) return;

  event.preventDefault();
  toggleItemSelection(id);
});

render();
