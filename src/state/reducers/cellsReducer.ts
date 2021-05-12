import produce from 'immer';
import { ActionType } from '../action-types';
import { Action } from '../actions';
import { Cell } from '../cell';

interface CellsState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
}

const initialState: CellsState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

const reducer = produce((state: CellsState = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.DELETE_CELL:
      delete state.data[action.payload];
      state.order = state.order.filter((id) => id !== action.payload);
      return state;
    case ActionType.INSERT_CELL_BEFORE:
      const Cell: Cell = {
        content: '',
        type: action.payload.type,
        id: getRandomId(),
      };

      state.data[Cell.id] = Cell;
      const foundIndex = state.order.findIndex(
        (id) => id === action.payload.id
      );

      if (foundIndex < 0) {
        state.order.push(Cell.id);
      } else {
        state.order.splice(foundIndex, 0, Cell.id);
      }

      return state;
    case ActionType.MOVE_CELL:
      const { direction } = action.payload;
      const index = state.order.findIndex((id) => id === action.payload.id);
      const targetIndex = direction === 'up' ? index - 1 : index + 1;

      if (targetIndex < 0 || targetIndex > state.order.length - 1) return;

      state.order[index] = state.order[targetIndex];
      state.order[targetIndex] = action.payload.id;
      return state;
    case ActionType.UPDATE_CELL:
      const { id, content } = action.payload;
      state.data[id].content = content;
      return state;
    default:
      return state;
  }
});

const getRandomId = () => {
  return Math.random().toString(36).substr(2, 5);
};

export default reducer;
