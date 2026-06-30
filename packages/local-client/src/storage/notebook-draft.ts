import type {Cell} from '../state/cell';

export const STORAGE_KEY_DRAFT = 'code-notebook-draft';

function isCellArray(data: unknown): data is Cell[] {
    return (
        Array.isArray(data) &&
        data.every(
            (item) =>
                item !== null &&
                typeof item === 'object' &&
                typeof item.id === 'string' &&
                typeof item.content === 'string' &&
                (item.type === 'text' || item.type === 'code')
        )
    );
}

export function loadDraft(): Cell[] | null {
    if (typeof window === 'undefined') return null;

    try {
        const raw = localStorage.getItem(STORAGE_KEY_DRAFT);
        if (!raw) return null;

        const parsed: unknown = JSON.parse(raw);
        return isCellArray(parsed) ? parsed : null;
    } catch {
        return null;
    }
}

export function saveDraft(cells: Cell[]): void {
    localStorage.setItem(STORAGE_KEY_DRAFT, JSON.stringify(cells));
}

export function clearDraft(): void {
    localStorage.removeItem(STORAGE_KEY_DRAFT);
}
