// Types
import type { Item } from '../../types';

// Components
import ListItem from '../ListItem/ListItem';

type ItemListProps = {
  items: Item[];
  selected: string[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

const ItemList = ({ items, selected, onToggle, onDelete }: ItemListProps) => (
  <ul
    className="border-line bg-surface mb-8 h-[228px] list-none overflow-y-auto border p-2.5"
    role="listbox"
    aria-label="Items"
    aria-multiselectable="true"
  >
    {items.map((item) => (
      <ListItem
        key={item.id}
        text={item.text}
        isSelected={selected.includes(item.id)}
        onToggle={() => onToggle(item.id)}
        onDelete={() => onDelete(item.id)}
      />
    ))}
  </ul>
);

export default ItemList;
