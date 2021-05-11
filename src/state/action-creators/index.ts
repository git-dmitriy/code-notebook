import { ActionType } from '../action-types';
import {
  Action,
  UpdateCell,
  DeleteCell,
  MoveCell,
  InsertCellBefore,
} from '../actions';
import { CellType } from '../cell';

export const updateCell = (id: string, content: string): UpdateCell => {
  return {
    type: ActionType.UPDATE_CELL,
    payload: {
      id,
      content,
    },
  };
};

export const deleteCell = (id: string): DeleteCell => {
  return {
    type: ActionType.DELETE_CELL,
    payload: id,
  };
};

export const moveCell = (id: string, direction: 'up' | 'down'): MoveCell => {
  return {
    type: ActionType.MOVE_CELL,
    payload: {
      id,
      direction,
    },
  };
};

export const insertCellBefore = (
  id: string,
  cellType: CellType
): InsertCellBefore => {
  return {
    type: ActionType.INSERT_CELL_BEFORE,
    payload: {
      id,
      type: cellType,
    },
  };
};
