import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CODE_CELL_TEMPLATE} from '../../content/notebook-guide';
import {Cell, CellType, getRandomId} from '../cell';

export type Direction = 'up' | 'down';

interface CellsState {
    loading: boolean;
    error: string | null;
    order: string[];
    data: Record<string, Cell>;
}

const initialState: CellsState = {
    loading: false,
    error: null,
    order: [],
    data: {},
};

const cellsSlice = createSlice({
    name: 'cells',
    initialState,
    reducers: {
        deleteCell: (state, action: PayloadAction<string>) => {
            delete state.data[action.payload];
            state.order = state.order.filter((id) => id !== action.payload);
        },
        insertCellAfter: (
            state,
            action: PayloadAction<{ id: string | null; type: CellType }>
        ) => {
            const isFirstCodeCell =
                action.payload.type === 'code' &&
                !Object.values(state.data).some((c) => c.type === 'code');

            const cell: Cell = {
                content: isFirstCodeCell ? CODE_CELL_TEMPLATE : '',
                type: action.payload.type,
                id: getRandomId(),
            };
            state.data[cell.id] = cell;
            const foundIndex = state.order.findIndex(
                (id) => id === action.payload.id
            );
            if (foundIndex < 0) {
                state.order.unshift(cell.id);
            } else {
                state.order.splice(foundIndex + 1, 0, cell.id);
            }
        },
        moveCell: (
            state,
            action: PayloadAction<{ id: string; direction: Direction }>
        ) => {
            const {direction, id} = action.payload;
            const index = state.order.findIndex((cellId) => cellId === id);
            const targetIndex = direction === 'up' ? index - 1 : index + 1;
            if (targetIndex < 0 || targetIndex > state.order.length - 1) {
                return;
            }
            state.order[index] = state.order[targetIndex];
            state.order[targetIndex] = id;
        },
        updateCell: (
            state,
            action: PayloadAction<{ id: string; content: string }>
        ) => {
            const {id, content} = action.payload;
            state.data[id].content = content;
        },
        fetchCellsStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchCellsComplete: (state, action: PayloadAction<Cell[]>) => {
            state.loading = false;
            state.order = action.payload.map((cell) => cell.id);
            state.data = action.payload.reduce<Record<string, Cell>>((acc, cell) => {
                acc[cell.id] = cell;
                return acc;
            }, {});
        },
        fetchCellsError: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        saveCellsError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
    },
});

export const {
    deleteCell,
    insertCellAfter,
    moveCell,
    updateCell,
    fetchCellsStart,
    fetchCellsComplete,
    fetchCellsError,
    saveCellsError,
} = cellsSlice.actions;

export default cellsSlice.reducer;
