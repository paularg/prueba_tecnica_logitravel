// React
import type { KeyboardEvent } from 'react';

type ListItemProps = {
  text: string;
  isSelected: boolean;
  onToggle: () => void;
  onDelete: () => void;
};

const ListItem = ({ text, isSelected, onToggle, onDelete }: ListItemProps) => {
  const handleKeyDown = (event: KeyboardEvent<HTMLLIElement>) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;

    event.preventDefault();
    onToggle();
  };

  return (
    <li
      className="cursor-pointer px-3.5 py-2.5 text-base leading-[normal] font-medium select-none aria-selected:bg-primary aria-selected:text-white"
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
