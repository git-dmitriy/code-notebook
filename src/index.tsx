import ReactDOM from 'react-dom';
import { useState } from 'react';
import bundle from './bundler';

import { CodeEditor } from './components/code-editor';
import { Preview } from './components/preview';
import 'bulmaswatch/superhero/bulmaswatch.min.css';

const App = () => {
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');

  const onClick = async () => {
    const output = await bundle(input);
    setCode(output);
  };

  return (
    <>
      <CodeEditor initialValue='' onChange={(value) => setInput(value)} />
      <div>
        <button onClick={onClick}>submit</button>
      </div>
      <Preview code={code} />
    </>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
