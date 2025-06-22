import { useEditorContext } from './useEditorContext';

export const useOpenEditor = () => {
  const { openForCreate, openForEdit } = useEditorContext();

  return { openForCreate, openForEdit };
};
