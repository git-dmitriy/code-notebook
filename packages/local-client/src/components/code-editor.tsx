import {useRef} from 'react';
import MonacoEditor, {OnMount} from '@monaco-editor/react';
import prettier from 'prettier/standalone';
import * as estreePlugin from 'prettier/plugins/estree';
import * as babelPlugin from 'prettier/plugins/babel';
import './code-editor.css';

interface CodeEditorProps {
    initialValue: string;

    onChange(value: string): void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
                                                          onChange,
                                                          initialValue,
                                                      }) => {
    const editorRef = useRef<Parameters<OnMount>[0] | null>(null);

    const onMount: OnMount = (editor) => {
        editorRef.current = editor;
        editor.onDidChangeModelContent(() => {
            onChange(editor.getValue());
        });

        editor.getModel()?.updateOptions({tabSize: 2});
    };

    const onFormatClick = async () => {
        const editor = editorRef.current;
        if (!editor) return;

        const unformattedCode = editor.getModel()?.getValue() ?? '';

        try {
            const formattedCode = (
                await prettier.format(unformattedCode, {
                    parser: 'babel',
                    plugins: [babelPlugin, estreePlugin],
                    useTabs: false,
                    semi: true,
                    singleQuote: true,
                })
            ).replace(/\n$/, '');

            editor.setValue(formattedCode);
        } catch (error) {
            console.error('Format failed:', error);
        }
    };

    return (
        <div className='editor-wrapper'>
            <button
                className='button button-format is-primary is-small'
                onClick={onFormatClick}>
                Format
            </button>
            <MonacoEditor
                onMount={onMount}
                value={initialValue}
                language='javascript'
                theme='vs-dark'
                options={{
                    wordWrap: 'on',
                    minimap: {enabled: false},
                    showUnused: false,
                    folding: false,
                    lineNumbersMinChars: 3,
                    fontSize: 16,
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                }}
                height='100%'
            />
        </div>
    );
};
