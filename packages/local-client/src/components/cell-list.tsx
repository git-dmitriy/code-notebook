import {Fragment, useEffect} from 'react';
import {useTypedSelector} from '../hooks/use-typed-selector';
import {useWelcomeDismissed} from '../hooks/use-welcome-dismissed';
import {selectOrderedCells} from '../state/selectors';
import {CellListItem} from './cell-list-item';
import {WelcomeGuide} from './welcome-guide';
import AddCell from './add-cell';
import './cell-list.css';
import {useActions} from '../hooks/use-actions';

interface CellListProps {
    onOpenHelp?: () => void;
}

export const CellList: React.FC<CellListProps> = ({onOpenHelp}) => {
    const cells = useTypedSelector(selectOrderedCells);
    const loading = useTypedSelector((state) => state.cells.loading);
    const error = useTypedSelector((state) => state.cells.error);
    const {dismissed, dismiss} = useWelcomeDismissed();

    const {fetchCells, clearCellsError} = useActions();

    useEffect(() => {
        fetchCells();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const renderedCells = cells.map((cell) => (
        <Fragment key={cell.id}>
            <CellListItem cell={cell}/>
            <AddCell previousCellId={cell.id}/>
        </Fragment>
    ));

    const showWelcome =
        cells.length === 0 && !loading && !error && !dismissed && onOpenHelp;

    return (
        <div className="cell-list">
            {loading && cells.length === 0 && (
                <div className="notification is-info is-light cells-status">
                    Loading notebook…
                </div>
            )}

            {error && (
                <div className="notification is-danger cells-status">
                    <button
                        type="button"
                        className="delete"
                        aria-label="Dismiss"
                        onClick={clearCellsError}
                    />
                    <p className="cells-status__message">{error}</p>
                    <button
                        type="button"
                        className="button is-small is-danger is-light"
                        onClick={fetchCells}>
                        Retry
                    </button>
                </div>
            )}

            {showWelcome && (
                <WelcomeGuide onDismiss={dismiss} onOpenHelp={onOpenHelp}/>
            )}
            <AddCell forceVisible={renderedCells.length === 0} previousCellId={null}/>
            {renderedCells}
        </div>
    );
};
