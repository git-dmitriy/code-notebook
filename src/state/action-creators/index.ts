import { ActionType } from '../action-types';
import {
  UpdateCell,
  DeleteCell,
  MoveCell,
  InsertCellAfter,
  Direction,
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

export const moveCell = (id: string, direction: Direction): MoveCell => {
  return {
    type: ActionType.MOVE_CELL,
    payload: {
      id,
      direction,
    },
  };
};

export const insertCellAfter = (
  id: string | null,
  cellType: CellType
): InsertCellAfter => {
  return {
    type: ActionType.INSERT_CELL_AFTER,
    payload: {
      id,
      type: cellType,
    },
  };
};
