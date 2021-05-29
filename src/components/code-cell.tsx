import { useState, useEffect } from 'react';
import bundle from '../bundler';
import { Cell } from '../state';

import { CodeEditor } from './code-editor';
import { Preview } from './preview';
import { Resizable } from './resizable';
import { useActions } from '../hooks/use-actions';

interface CodeCellProps {
  cell: Cell;
}

export const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  // const [input, setInput] = useState('');
  const [code, setCode] = useState('');
  const [err, setErr] = useState('');

  const { updateCell } = useActions();

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundle(cell.content);
      setCode(output.code);
      setErr(output.err);
    }, 750);

    return () => {
      clearTimeout(timer);
    };
  }, [cell.content]);

  return (
    <Resizable direction='vertical'>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          height: 'calc(100% - 10px)',
        }}>
        <Resizable direction='horizontal'>
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => updateCell(cell.id, value)}
          />
        </Resizable>

        <Preview code={code} err={err} />
      </div>
    </Resizable>
  );
};
