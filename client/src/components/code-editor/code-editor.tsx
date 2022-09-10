import React from 'react';
import Editor from '@monaco-editor/react';
import Button from '../button/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faExpand,
  faGear,
  faRotateRight,
} from '@fortawesome/free-solid-svg-icons';

const CodeEditor = () => {
  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex h-10 items-center justify-end space-x-3 bg-gray-50 px-4 text-gray-500">
        <FontAwesomeIcon icon={faRotateRight} />
        <FontAwesomeIcon icon={faGear} />
        <FontAwesomeIcon icon={faExpand} />
      </div>
      <div className="flex-1 border border-gray-200">
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
      </div>
      <div className="flex items-center justify-end">
        <Button variant="text" className="m-4">
          Run code
        </Button>
        <Button>Submit</Button>
      </div>
    </div>
  );
};

export default CodeEditor;
