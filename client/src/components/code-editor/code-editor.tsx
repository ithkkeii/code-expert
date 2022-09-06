import React from 'react';
import Editor from '@monaco-editor/react';

const CodeEditor = () => {
  return (
    <Editor
      defaultLanguage="javascript"
      defaultValue={`console.log \n console.log \nconsole.log \n console.log \nconsole.log \n console.log \nconsole.log \n console.log \nconsole.log \n console.log \nconsole.log \n console.log \nconsole.log \n console.log \nconsole.log \n console.log \nconsole.log \n console.log \nconsole.log \n console.log \n`}
      options={{
        minimap: {
          enabled: false,
        },
        scrollbar: {
          verticalScrollbarSize: 4,
          horizontalScrollbarSize: 4,
        },
      }}
    />
  );
};

export default CodeEditor;
