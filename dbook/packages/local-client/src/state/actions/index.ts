import { ActionType } from '../action-types';
import { CellType } from '../cell';

export type Direction = 'up' | 'down';

export interface MoveCell {
  type: ActionType.MOVE_CELL;
  payload: {
    id: string;
    direction: Direction;
  };
}

export interface DeleteCell {
  type: ActionType.DELETE_CELL;
  payload: string;
}

export interface InsertCellAfter {
  type: ActionType.INSERT_CELL_AFTER;
  payload: {
    id: string | null;
    type: CellType;
  };
}

export interface UpdateCell {
  type: ActionType.UPDATE_CELL;
  payload: {
    id: string;
    content: string;
  };
}

export interface BundleStartAction {
  type: ActionType.BUNDLE_START;
  payload: {
    cellId: string;
  };
}

export interface BundleCompleteAction {
  type: ActionType.BUNDLE_COMPLETE;
  payload: {
    cellId: string;
    bundle: {
      code: string;
      err: string;
    };
  };
}

export type Action =
  | MoveCell
  | DeleteCell
  | InsertCellAfter
  | UpdateCell
  | BundleStartAction
  | BundleCompleteAction;
