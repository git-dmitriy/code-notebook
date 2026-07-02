import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface Bundle {
    loading: boolean;
    code: string;
    err: string;
}

interface BundlesState {
    [key: string]: Bundle | undefined;
}

interface CreateBundleRejectedAction {
    type: 'bundles/createBundle/rejected';
    meta: { arg: { cellId: string } };
    error: { message?: string };
}

const initialState: BundlesState = {};

const bundlesSlice = createSlice({
    name: 'bundles',
    initialState,
    reducers: {
        bundleStart: (state, action: PayloadAction<{ cellId: string }>) => {
            state[action.payload.cellId] = {
                loading: true,
                code: '',
                err: '',
            };
        },
        bundleComplete: (
            state,
            action: PayloadAction<{
                cellId: string;
                bundle: { code: string; err: string };
            }>
        ) => {
            state[action.payload.cellId] = {
                loading: false,
                code: action.payload.bundle.code,
                err: action.payload.bundle.err,
            };
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            (action): action is CreateBundleRejectedAction =>
                action.type === 'bundles/createBundle/rejected',
            (state, action) => {
                const cellId = action.meta.arg.cellId;
                state[cellId] = {
                    loading: false,
                    code: '',
                    err: action.error.message ?? 'Bundle failed',
                };
            }
        );
    },
});

export const {bundleStart, bundleComplete} = bundlesSlice.actions;

export default bundlesSlice.reducer;
