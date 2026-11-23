// ---------- RENDERING ----------
import { state } from './state.js';
import { list, deleteBtn, undoBtn } from './dom.js';

// Function that renders the list of items
export const renderList = () => {
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
export const renderSelection = () => {
  list.querySelectorAll('.listItem').forEach((li) => {
    const isSelected = state.selected.includes(Number(li.dataset.id));
    li.setAttribute('aria-selected', isSelected);
  });
};

// Function that renders the state of the action buttons
export const renderButtons = () => {
  deleteBtn.disabled = state.selected.length === 0;
  undoBtn.disabled = state.history.length === 0;
};

// Function that renders the entire application
export const render = () => {
  renderList();
  renderSelection();
  renderButtons();
};
