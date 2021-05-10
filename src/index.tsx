import ReactDOM from 'react-dom';
import 'bulmaswatch/superhero/bulmaswatch.min.css';
import { TextEditor } from './components/text-editor';

const App = () => {
  return (
    <>
      <TextEditor />
    </>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
