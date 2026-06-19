import {configureStore} from '@reduxjs/toolkit';
import cellsReducer from './slices/cellsSlice';
import bundlesReducer from './slices/bundlesSlice';
import {listenerMiddleware} from './listenerMiddleware';

export const store = configureStore({
    reducer: {
        cells: cellsReducer,
        bundles: bundlesReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
