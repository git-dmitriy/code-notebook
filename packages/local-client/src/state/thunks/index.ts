import axios from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import bundle from '../../bundler';
import {isReadOnlyDemo} from '../../config/demo-mode';
import {loadDraft, saveDraft} from '../../storage/notebook-draft';
import {Cell} from '../cell';
import {RootState} from '../store';
import {
    bundleComplete,
    bundleStart,
} from '../slices/bundlesSlice';
import {
    fetchCellsComplete,
    fetchCellsError,
    fetchCellsStart,
    saveCellsError,
    clearCellsError,
} from '../slices/cellsSlice';

export const createBundle = createAsyncThunk(
    'bundles/createBundle',
    async (
        {cellId, input}: { cellId: string; input: string },
        {dispatch}
    ) => {
        dispatch(bundleStart({cellId}));
        const result = await bundle(input);
        dispatch(
            bundleComplete({
                cellId,
                bundle: result,
            })
        );
        return {cellId, ...result};
    }
);

export const fetchCells = createAsyncThunk(
    'cells/fetchCells',
    async (_, {dispatch}) => {
        dispatch(fetchCellsStart());
        try {
            const {data}: { data: Cell[] } = await axios.get('/cells');
            const cells = isReadOnlyDemo() ? loadDraft() ?? data : data;
            dispatch(fetchCellsComplete(cells));
            return cells;
        } catch (err: unknown) {
            const detail = err instanceof Error ? err.message : 'Unknown error';
            dispatch(fetchCellsError(`Could not load notebook: ${detail}`));
            throw err;
        }
    }
);

export const saveCells = createAsyncThunk(
    'cells/saveCells',
    async (_, {getState, dispatch}) => {
        const {
            cells: {data, order},
        } = getState() as RootState;
        const cells = order.map((id) => data[id]);

        if (isReadOnlyDemo()) {
            saveDraft(cells);
            dispatch(clearCellsError());
            return;
        }

        try {
            await axios.post('/cells', {cells});
            dispatch(clearCellsError());
        } catch (err: unknown) {
            const detail = err instanceof Error ? err.message : 'Unknown error';
            dispatch(saveCellsError(`Could not save notebook: ${detail}`));
            throw err;
        }
    }
);
