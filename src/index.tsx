import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './state';
import 'bulmaswatch/superhero/bulmaswatch.min.css';
import { TextEditor } from './components/text-editor';

const App = () => {
  return (
    <Provider store={store}>
      <TextEditor />
    </Provider>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
