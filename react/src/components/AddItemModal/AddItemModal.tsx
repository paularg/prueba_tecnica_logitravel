// React
import { useEffect, useRef, useState, type SubmitEvent } from 'react';

// Components
import Button from '../Button/Button';

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
    <dialog
      ref={dialogRef}
      className="m-auto w-[calc(100%-48px)] max-w-modal rounded-card p-6 text-ink shadow-card backdrop:bg-black/12 sm:p-12"
      onClose={handleClose}
    >
      <form onSubmit={handleSubmit}>
        <label
          className="mb-5 block text-base leading-[normal] font-medium"
          htmlFor="item-input"
        >
          Add item to list
        </label>
        <input
          className="mb-6 h-14.5 w-full border border-line bg-surface px-5 text-lg text-ink placeholder:text-muted focus:outline-2 focus:-outline-offset-1 focus:outline-primary"
          id="item-input"
          type="text"
          placeholder="Type the text here..."
          autoComplete="off"
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
        <div className="flex justify-end gap-4">
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
