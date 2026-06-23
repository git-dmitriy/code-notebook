export type CellType = 'code' | 'text';

export interface Cell {
    id: string;
    type: CellType;
    content: string;
}

export {getRandomId} from './utils';
