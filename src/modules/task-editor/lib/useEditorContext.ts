import { createContext, useContext } from 'react';

import { useEditor } from './useEditor';

export const EditorContext = createContext<ReturnType<typeof useEditor> | null>(
  null,
);

export const useEditorContext = () => {
  const context = useContext(EditorContext);

  if (!context) {
    throw new Error('useEditor must be used within a EditorProvider');
  }

  return context;
};
