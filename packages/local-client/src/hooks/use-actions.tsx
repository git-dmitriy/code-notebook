import {useMemo} from 'react';
import {
    createBundle,
    deleteCell,
    fetchCells,
    insertCellAfter,
    moveCell,
    updateCell,
} from '../state';
import {useAppDispatch} from './use-app-store';

export const useActions = () => {
    const dispatch = useAppDispatch();

    return useMemo(
        () => ({
            updateCell: (id: string, content: string) =>
                dispatch(updateCell({id, content})),
            deleteCell: (id: string) => dispatch(deleteCell(id)),
            moveCell: (id: string, direction: 'up' | 'down') =>
                dispatch(moveCell({id, direction})),
            insertCellAfter: (id: string | null, type: 'code' | 'text') =>
                dispatch(insertCellAfter({id, type})),
            createBundle: (cellId: string, input: string) =>
                dispatch(createBundle({cellId, input})),
            fetchCells: () => dispatch(fetchCells()),
        }),
        [dispatch]
    );
};
