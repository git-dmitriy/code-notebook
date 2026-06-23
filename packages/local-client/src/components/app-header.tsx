import './app-header.css';

interface AppHeaderProps {
    onHelpClick: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({onHelpClick}) => {
    return (
        <nav className="navbar is-dark app-header" role="navigation">
            <div className="navbar-brand">
                <span className="navbar-item app-header__title">Code Notebook</span>
            </div>
            <div className="navbar-menu is-active">
                <div className="navbar-end">
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
