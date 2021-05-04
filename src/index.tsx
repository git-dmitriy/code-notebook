import ReactDOM from 'react-dom';
import { useState, useEffect, useRef } from 'react';
import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from './plugins/unpkge-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';

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

    // console.log(result.outputFiles[0].text);

    setCode(result.outputFiles[0].text);
  };

  const HTML = `
    <script>${code}</script>
  `;

  return (
    <>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}></textarea>

      <div>
        <button onClick={onClick}>submit</button>
      </div>
      <pre>{code}</pre>

      <iframe sandbox='allow-scripts' srcDoc={HTML} />
    </>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
