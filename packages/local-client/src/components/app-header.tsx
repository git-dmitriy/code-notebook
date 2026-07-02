import './app-header.css';
import {isReadOnlyDemo} from '../config/demo-mode';
import {clearDraft} from '../storage/notebook-draft';
import {useActions} from '../hooks/use-actions';

interface AppHeaderProps {
    onHelpClick: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({onHelpClick}) => {
    const {fetchCells} = useActions();
    const showDemoActions = isReadOnlyDemo();

    const handleResetDemo = () => {
        const confirmed = window.confirm(
            'Discard your local changes and restore the default demo?'
        );
        if (!confirmed) return;

        clearDraft();
        fetchCells();
    };

    return (
        <nav className="navbar is-dark app-header" role="navigation">
            <div className="navbar-brand">
                <span className="navbar-item app-header__title">Code Notebook</span>
            </div>
            <div className="navbar-menu is-active">
                <div className="navbar-end">
                    {showDemoActions && (
                        <div className="navbar-item">
                            <button
                                type="button"
                                className="button is-warning is-small is-light"
                                onClick={handleResetDemo}>
                                <span className="icon is-small">
                                    <i className="fas fa-rotate-left"/>
                                </span>
                                <span>Reset demo</span>
                            </button>
                        </div>
                    )}
                    <div className="navbar-item">
                        <button
                            type="button"
                            className="button is-info is-small"
                            onClick={onHelpClick}>
                            <span className="icon is-small">
                                <i className="fas fa-question-circle"/>
                            </span>
                            <span>Help</span>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};
