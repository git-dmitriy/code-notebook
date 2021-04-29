import ReactDOM from 'react-dom';
import { useState, useEffect, useRef } from 'react';
import * as esbuild from 'esbuild-wasm';

const App = () => {
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');
  const ref = useRef<any>();

  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: '/esbuild.wasm',
    });
    // console.log(service);
  };

  useEffect(() => {
    startService();
  }, []);

  const onClick = async () => {
    if (!ref.current) {
      return;
    }

    const result = await ref.current.transform(input, {
      loader: 'jsx',
      target: 'es2015',
    });

    setCode(result.code);
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
