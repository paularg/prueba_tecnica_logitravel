// Components
import Button from '../Button/Button';
import UndoIcon from '../UndoIcon/UndoIcon';

// Styles
import styles from './ListActions.module.css';

type ListActionsProps = {
  canUndo: boolean;
  canDelete: boolean;
  onUndo: () => void;
  onDelete: () => void;
  onAdd: () => void;
};

const ListActions = ({
  canUndo,
  canDelete,
  onUndo,
  onDelete,
  onAdd,
}: ListActionsProps) => (
  <div className={styles.actions}>
    <div className={styles.group}>
      <Button
        variant="outline"
        isIcon
        aria-label="Undo"
        disabled={!canUndo}
        onClick={onUndo}
      >
        <UndoIcon />
      </Button>
      <Button variant="outline" disabled={!canDelete} onClick={onDelete}>
        Delete
      </Button>
    </div>
    <Button onClick={onAdd}>Add</Button>
  </div>
);

export default ListActions;
