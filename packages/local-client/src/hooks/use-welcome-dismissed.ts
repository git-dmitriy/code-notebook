import {useCallback, useState} from 'react';
import {STORAGE_KEY_WELCOME} from '../content/notebook-guide';

const readDismissed = () => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(STORAGE_KEY_WELCOME) === 'true';
};

export const useWelcomeDismissed = () => {
    const [dismissed, setDismissed] = useState(readDismissed);

    const dismiss = useCallback(() => {
        localStorage.setItem(STORAGE_KEY_WELCOME, 'true');
        setDismissed(true);
    }, []);

    return {dismissed, dismiss};
};
