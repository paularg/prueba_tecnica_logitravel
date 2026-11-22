// React
import { useReducer, useState } from 'react';

// Reducer
import listReducer, { initialState } from './listReducer';

// Components
import Header from './components/Header/Header';
import ItemList from './components/ItemList/ItemList';
import ListActions from './components/ListActions/ListActions';
import AddItemModal from './components/AddItemModal/AddItemModal';

const App = () => {
  const [state, dispatch] = useReducer(listReducer, initialState);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { items, selected, history } = state;

  return (
    <>
      <main className="w-full rounded-card bg-white p-6 shadow-card sm:p-12">
        <Header />

        <ItemList
          items={items}
          selected={selected}
          onToggle={(id) => dispatch({ type: 'TOGGLE', id })}
          onDelete={(id) => dispatch({ type: 'DELETE', ids: [id] })}
        />

        <ListActions
          canUndo={history.length > 0}
          canDelete={selected.length > 0}
          onUndo={() => dispatch({ type: 'UNDO' })}
          onDelete={() => dispatch({ type: 'DELETE', ids: selected })}
          onAdd={() => setIsModalOpen(true)}
        />
      </main>

      <AddItemModal
        isOpen={isModalOpen}
        onAdd={(text) => dispatch({ type: 'ADD', text })}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default App;
