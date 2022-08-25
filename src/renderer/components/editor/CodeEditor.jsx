import { useRef, useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import useResizeObserver from 'use-resize-observer';
import { useCodeEditor } from './useCodeEditors';

export default function CodeEditor({ tabKey }) {
  const containerRef = useRef(null);
  const [editor, setEditor] = useState(null);
  const [value, setValue] = useState('');
  const { monacoOption, load, setDirty } = useCodeEditor({
    tabKey,
    ref: editor,
  });
  const { width, height } = useResizeObserver({
    ref: containerRef,
    round: Math.floor,
  });

  function handleEditorDidMount(editor, monaco) {
    setEditor(editor);
    load().then((value) => {
      if (value) {
        editor.setValue(value);
      }
    });
  }

  function handleChange(value) {
    setValue(value);
    setDirty(true);
  }

  return (
    <div
      style={{
        height: '100%',
        width: '100%',
      }}
      ref={containerRef}
    >
      <Editor
        width={width}
        height={height}
        defaultLanguage="javascript"
        options={monacoOption}
        value={value}
        onMount={handleEditorDidMount}
        onChange={handleChange}
      />
    </div>
  );
}
