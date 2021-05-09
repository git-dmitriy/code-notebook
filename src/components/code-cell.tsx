import { useState, useEffect } from 'react';
import bundle from '../bundler';

import { CodeEditor } from './code-editor';
import { Preview } from './preview';
import { Resizable } from './resizable';

export const CodeCell = () => {
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');
  const [err, setErr] = useState('');

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundle(input);
      setCode(output.code);
      setErr(output.err);
    }, 750);

    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  return (
    <Resizable direction='vertical'>
      <div style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
        <Resizable direction='horizontal'>
          <CodeEditor initialValue='' onChange={(value) => setInput(value)} />
        </Resizable>

        <Preview code={code} err={err} />
      </div>
    </Resizable>
  );
};
