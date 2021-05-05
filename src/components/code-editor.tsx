import MonacoEditor from '@monaco-editor/react';

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  onChange,
  initialValue,
}) => {
  const onEditorDidMount = (getValue: () => string, monacoEditor: any) => {
    monacoEditor.onDidChangeModelContent(() => {
      onChange(getValue());
    });
  };

  return (
    <MonacoEditor
      editorDidMount={onEditorDidMount}
      value={initialValue}
      language='javascript'
      theme='dark'
      options={{
        wordWrap: 'on',
        minimap: { enabled: false },
        showUnused: false,
        folding: false,
        lineNumbersMiniChars: 3,
        fontSize: 16,
        scrollBeyondLastLine: false,
        automaticLayout: true,
      }}
      height='500px'
    />
  );
};
