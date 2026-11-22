// Vitest
import { describe, expect, it } from 'vitest';

// Reducer
import listReducer, { initialState } from './listReducer';

// Types
import type { Action, State } from './types';

// Applies a sequence of actions starting from the initial state
const run = (...actions: Action[]): State =>
  actions.reduce(listReducer, initialState);

describe('listReducer', () => {
  describe('ADD', () => {
    it('adds a new item with trimmed text', () => {
      const state = run({ type: 'ADD', text: '  Buy milk  ' });

      expect(state.items).toHaveLength(1);
      expect(state.items[0].text).toBe('Buy milk');
      expect(state.items[0].id).toEqual(expect.any(String));
    });

    it('saves the previous items in history', () => {
      const state = run({ type: 'ADD', text: 'First' });

      expect(state.history).toEqual([[]]);
    });

    it.each(['', '   '])('ignores empty text (%j)', (text) => {
      const state = listReducer(initialState, { type: 'ADD', text });

      expect(state).toBe(initialState);
    });
  });

  describe('TOGGLE', () => {
    it('selects and deselects an item', () => {
      const withItem = run({ type: 'ADD', text: 'Item' });
      const id = withItem.items[0].id;

      const selected = listReducer(withItem, { type: 'TOGGLE', id });
      expect(selected.selected).toEqual([id]);

      const deselected = listReducer(selected, { type: 'TOGGLE', id });
      expect(deselected.selected).toEqual([]);
    });

    it('allows selecting several items', () => {
      const withItems = run(
        { type: 'ADD', text: 'A' },
        { type: 'ADD', text: 'B' },
      );
      const [a, b] = withItems.items;

      const state = [a, b].reduce(
        (current, item) =>
          listReducer(current, { type: 'TOGGLE', id: item.id }),
        withItems,
      );

      expect(state.selected).toEqual([a.id, b.id]);
    });

    it('does not change history', () => {
      const withItem = run({ type: 'ADD', text: 'Item' });

      const state = listReducer(withItem, {
        type: 'TOGGLE',
        id: withItem.items[0].id,
      });

      expect(state.history).toBe(withItem.history);
    });
  });

  describe('DELETE', () => {
    it('removes the given items and clears them from the selection', () => {
      const withItems = run(
        { type: 'ADD', text: 'A' },
        { type: 'ADD', text: 'B' },
        { type: 'ADD', text: 'C' },
      );
      const [a, b, c] = withItems.items;
      const selected = listReducer(
        listReducer(withItems, { type: 'TOGGLE', id: a.id }),
        { type: 'TOGGLE', id: c.id },
      );

      const state = listReducer(selected, {
        type: 'DELETE',
        ids: [a.id, c.id],
      });

      expect(state.items).toEqual([b]);
      expect(state.selected).toEqual([]);
    });

    it('saves the previous items in history', () => {
      const withItem = run({ type: 'ADD', text: 'Item' });

      const state = listReducer(withItem, {
        type: 'DELETE',
        ids: [withItem.items[0].id],
      });

      expect(state.history.at(-1)).toEqual(withItem.items);
    });

    it('does nothing when no ids are given', () => {
      const withItem = run({ type: 'ADD', text: 'Item' });

      const state = listReducer(withItem, { type: 'DELETE', ids: [] });

      expect(state).toBe(withItem);
    });
  });

  describe('UNDO', () => {
    it('restores the previous items and clears the selection', () => {
      const withItem = run({ type: 'ADD', text: 'Item' });
      const id = withItem.items[0].id;
      const deleted = listReducer(
        listReducer(withItem, { type: 'TOGGLE', id }),
        { type: 'DELETE', ids: [id] },
      );

      const state = listReducer(deleted, { type: 'UNDO' });

      expect(state.items).toEqual(withItem.items);
      expect(state.selected).toEqual([]);
    });

    it('can undo several changes in a row', () => {
      const state = run(
        { type: 'ADD', text: 'A' },
        { type: 'ADD', text: 'B' },
        { type: 'UNDO' },
        { type: 'UNDO' },
      );

      expect(state.items).toEqual([]);
      expect(state.history).toEqual([]);
    });

    it('does nothing when there is no history', () => {
      const state = listReducer(initialState, { type: 'UNDO' });

      expect(state).toBe(initialState);
    });
  });
});
