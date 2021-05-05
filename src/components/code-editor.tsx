import MonacoEditor from '@monaco-editor/react';

export const CodeEditor = () => {
  return (
    <MonacoEditor
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
