import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './state';
import 'bulmaswatch/superhero/bulmaswatch.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { CellList } from './components/cell-list';

const App = () => {
  return (
    <Provider store={store}>
      <CellList />
    </Provider>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
