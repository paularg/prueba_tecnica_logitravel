// ---------- MODAL ----------
import { modal, input, submitBtn } from './dom.js';

// Function that opens the modal for adding a new item
export const openModal = () => {
  input.value = '';
  submitBtn.disabled = true;
  modal.showModal();
  input.focus();
};

// Function that closes the modal
export const closeModal = () => {
  modal.close();
};
