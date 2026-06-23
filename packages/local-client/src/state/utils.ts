export type CellType = 'code' | 'text';

export interface Cell {
    id: string;
    type: CellType;
    content: string;
}

export const getRandomId = () => Math.random().toString(36).slice(2, 7);
