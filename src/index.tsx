import ReactDOM from 'react-dom';
import { useState } from 'react';

const App = () => {
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');

  const onClick = () => {
    console.log(input);
  };

  return (
    <>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}></textarea>

      <div>
        <button onClick={onClick}>submit</button>
      </div>
      <pre>{code}</pre>
    </>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
