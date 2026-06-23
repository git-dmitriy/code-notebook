import {useAppSelector} from './use-app-store';
import {selectCumulativeCode} from '../state/selectors';

export const useCumulativeCode = (cellId: string) => {
    return useAppSelector((state) => selectCumulativeCode(state, cellId));
};
