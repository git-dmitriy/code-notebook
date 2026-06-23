import axios from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import bundle from '../../bundler';
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
            dispatch(fetchCellsComplete(data));
            return data;
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Unknown error';
            dispatch(fetchCellsError(message));
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

        try {
            await axios.post('/cells', {cells});
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Unknown error';
            dispatch(saveCellsError(message));
            throw err;
        }
    }
);
