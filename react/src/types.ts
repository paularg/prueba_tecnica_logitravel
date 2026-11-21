export type Item = {
  id: string;
  text: string;
};

export type State = {
  items: Item[];
  selected: string[];
  history: Item[][];
};

export type Action =
  | { type: 'ADD'; text: string }
  | { type: 'TOGGLE'; id: string }
  | { type: 'DELETE'; ids: string[] }
  | { type: 'UNDO' };
