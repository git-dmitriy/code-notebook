import { useState } from 'react';
import bundle from '../bundler';

import { CodeEditor } from './code-editor';
import { Preview } from './preview';
import { Resizable } from './resizable';

export const CodeCell = () => {
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');

  const onClick = async () => {
    const output = await bundle(input);
    setCode(output);
  };

  return (
    <Resizable direction='vertical'>
      <div style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
        <Resizable direction='horizontal'>
          <CodeEditor initialValue='' onChange={(value) => setInput(value)} />
        </Resizable>

        <Preview code={code} />
      </div>
    </Resizable>
  );
};
