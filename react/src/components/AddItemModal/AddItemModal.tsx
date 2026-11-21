// React
import { useEffect, useRef, useState, type SubmitEvent } from 'react';

// Components
import Button from '../Button/Button';

// Styles
import styles from './AddItemModal.module.css';

type AddItemModalProps = {
  isOpen: boolean;
  onAdd: (text: string) => void;
  onClose: () => void;
};

const AddItemModal = ({ isOpen, onAdd, onClose }: AddItemModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [text, setText] = useState('');

  // Sync the native <dialog> with the `isOpen` prop
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  // Fired on every close: Cancel, Add, Esc key or programmatic close
  const handleClose = () => {
    setText('');
    onClose();
  };

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!text.trim()) return;

    onAdd(text);
    onClose();
  };

  return (
    <dialog ref={dialogRef} className={styles.modal} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <label className={styles.label} htmlFor="item-input">
          Add item to list
        </label>
        <input
          className={styles.input}
          id="item-input"
          type="text"
          placeholder="Type the text here..."
          autoComplete="off"
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
        <div className={styles.actions}>
          <Button type="submit" disabled={!text.trim()}>
            Add
          </Button>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </form>
    </dialog>
  );
};

export default AddItemModal;
