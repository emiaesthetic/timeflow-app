import { useEditor } from './lib/useEditor';
import { EditorContext } from './lib/useEditorContext';

export const EditorProvider = ({ children }: React.PropsWithChildren) => {
  const editor = useEditor();

  return (
    <EditorContext.Provider value={editor}>{children}</EditorContext.Provider>
  );
};
