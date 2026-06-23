import {
    createListenerMiddleware,
    isAnyOf,
} from '@reduxjs/toolkit';
import {
    deleteCell,
    insertCellAfter,
    moveCell,
    updateCell,
} from './slices/cellsSlice';
import {saveCells} from './thunks';

export const listenerMiddleware = createListenerMiddleware();

let saveTimer: ReturnType<typeof setTimeout> | undefined;

listenerMiddleware.startListening({
    matcher: isAnyOf(deleteCell, insertCellAfter, moveCell, updateCell),
    effect: async (_action, listenerApi) => {
        if (saveTimer) {
            clearTimeout(saveTimer);
        }
        saveTimer = setTimeout(() => {
            listenerApi.dispatch(saveCells());
        }, 500);
    },
});
