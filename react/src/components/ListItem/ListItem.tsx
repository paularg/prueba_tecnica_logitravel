// React
import type { KeyboardEvent } from 'react';

// Styles
import styles from './ListItem.module.css';

type ListItemProps = {
  text: string;
  isSelected: boolean;
  onToggle: () => void;
  onDelete: () => void;
};

const ListItem = ({ text, isSelected, onToggle, onDelete }: ListItemProps) => {
  // Keyboard support: Enter or Space toggles the item
  const handleKeyDown = (event: KeyboardEvent<HTMLLIElement>) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;

    event.preventDefault();
    onToggle();
  };

  return (
    <li
      className={styles.item}
      role="option"
      tabIndex={0}
      aria-selected={isSelected}
      onClick={onToggle}
      onDoubleClick={onDelete}
      onKeyDown={handleKeyDown}
    >
      {text}
    </li>
  );
};

export default ListItem;
