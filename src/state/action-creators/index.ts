import { ActionType } from '../action-types';
import {
  Action,
  UpdateCell,
  DeleteCell,
  MoveCell,
  InsertCellBefore,
} from '../actions';

export const updateCell = (): UpdateCell => {};

export const deleteCell = (): DeleteCell => {};

export const moveCell = (): MoveCell => {};

export const insertCellBefore = (): InsertCellBefore => {};
