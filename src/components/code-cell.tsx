import { useState } from 'react';
import bundle from '../bundler';

import { CodeEditor } from './code-editor';
import { Preview } from './preview';

export const CodeCell = () => {
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');

  const onClick = async () => {
    const output = await bundle(input);
    setCode(output);
  };

  return (
    <div>
      <CodeEditor initialValue='' onChange={(value) => setInput(value)} />
      <div>
        <button onClick={onClick}>submit</button>
      </div>
      <Preview code={code} />
    </div>
  );
};
