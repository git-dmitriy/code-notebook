import {useState} from 'react';
import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';
import {store} from './state';
import 'bulmaswatch/superhero/bulmaswatch.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import {AppHeader} from './components/app-header';
import {CellList} from './components/cell-list';
import {HelpModal} from './components/help-modal';

const App = () => {
    const [helpOpen, setHelpOpen] = useState(false);

    return (
        <Provider store={store}>
            <AppHeader onHelpClick={() => setHelpOpen(true)}/>
            <CellList onOpenHelp={() => setHelpOpen(true)}/>
            <HelpModal isOpen={helpOpen} onClose={() => setHelpOpen(false)}/>
        </Provider>
    );
};

const rootEl = document.querySelector('#root');
if (rootEl) {
    createRoot(rootEl).render(<App/>);
}
