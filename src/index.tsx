import ReactDOM from 'react-dom';
import { useState, useEffect, useRef } from 'react';
import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from './plugins/unpkge-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';
import { CodeEditor } from './components/code-editor';
import { Preview } from './components/preview';
import 'bulmaswatch/superhero/bulmaswatch.min.css';

const App = () => {
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');
  const ref = useRef<any>();

  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm',
    });
  };

  useEffect(() => {
    startService();
  }, []);

  const onClick = async () => {
    if (!ref.current) {
      return;
    }

    const result = await ref.current.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(input)],
      define: {
        'process.env.NODE_ENV': '"production"',
        global: 'window',
      },
    });
    setCode(result.outputFiles[0].text);
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
