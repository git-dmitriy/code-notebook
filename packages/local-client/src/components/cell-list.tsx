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
    const {dismissed, dismiss} = useWelcomeDismissed();

    const {fetchCells} = useActions();

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

    return (
        <div className="cell-list">
            {cells.length === 0 && !dismissed && onOpenHelp && (
                <WelcomeGuide onDismiss={dismiss} onOpenHelp={onOpenHelp}/>
            )}
            <AddCell forceVisible={renderedCells.length === 0} previousCellId={null}/>
            {renderedCells}
        </div>
    );
};
