// Types
import type { Action, State } from './types';

export const initialState: State = {
  items: [],
  selected: [],
  history: [],
};

const listReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD': {
      const text = action.text.trim();
      if (!text) return state;

      return {
        ...state,
        items: [...state.items, { id: crypto.randomUUID(), text }],
        history: [...state.history, state.items],
      };
    }

    case 'TOGGLE': {
      const isSelected = state.selected.includes(action.id);

      return {
        ...state,
        selected: isSelected
          ? state.selected.filter((id) => id !== action.id)
          : [...state.selected, action.id],
      };
    }

    case 'DELETE': {
      if (action.ids.length === 0) return state;

      return {
        items: state.items.filter((item) => !action.ids.includes(item.id)),
        selected: state.selected.filter((id) => !action.ids.includes(id)),
        history: [...state.history, state.items],
      };
    }

    case 'UNDO': {
      if (state.history.length === 0) return state;

      return {
        items: state.history[state.history.length - 1],
        selected: [],
        history: state.history.slice(0, -1),
      };
    }
  }
};

export default listReducer;
