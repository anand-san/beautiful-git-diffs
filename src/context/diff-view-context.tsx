import { createContext, useState } from "react";
import { ReactDiffViewerStylesOverride } from "react-diff-viewer";

export const DiffViewContext = createContext({
  editorDarkMode: true,
  toggleEditorDarkMode: () => {},

  editorSplitView: true,
  toggleSplitView: () => {},

  showEditorHeader: true,
  toggleEditorHeader: () => {},

  diffViewStyles: {},
  leftHeadingBar: <>Before</>,
  rightHeadingBar: <>After</>,
});

export const DiffViewContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [editorDarkMode, setEditorDarkMode] = useState<boolean>(true);
  const [editorSplitView, setEditorSplitView] = useState<boolean>(true);
  const [showEditorHeader, setShowEditorHeader] = useState<boolean>(true);

  const toggleEditorDarkMode = () => {
    setEditorDarkMode(!editorDarkMode);
  };

  const toggleSplitView = () => {
    setEditorSplitView(!editorSplitView);
  };

  const toggleEditorHeader = () => {
    setShowEditorHeader(!showEditorHeader);
  };

  const diffViewStyles: ReactDiffViewerStylesOverride = {
    variables: {
      dark: {
        wordAddedBackground: "#15803d",
        wordRemovedBackground: "#991b1b",
      },
      light: {
        // wordAddedBackground: "#15803d",
        // wordRemovedBackground: "#991b1b",

        //defaults
        diffViewerBackground: "#fff",
        addedBackground: "#e6ffed",
        addedColor: "#24292e",
        removedBackground: "#ffeef0",
        removedColor: "#24292e",
        wordAddedBackground: "#acf2bd",
        wordRemovedBackground: "#fdb8c0",
        addedGutterBackground: "#cdffd8",
        removedGutterBackground: "#ffdce0",
        gutterBackground: "#f7f7f7",
        gutterBackgroundDark: "#f3f1f1",
        highlightBackground: "#fffbdd",
        highlightGutterBackground: "#fff5b1",
        codeFoldGutterBackground: "#dbedff",
        codeFoldBackground: "#f1f8ff",
        emptyLineBackground: "#fafbfc",
      },
    },
    line: {
      padding: "10px 2px",
      "&:hover": {
        background: "#a26ea1",
      },
    },
  };

  const leftHeadingBar = <>Before</>;

  const rightHeadingBar = <>After</>;

  const value = {
    editorDarkMode,
    toggleEditorDarkMode,
    editorSplitView,
    toggleSplitView,
    showEditorHeader,
    toggleEditorHeader,
    diffViewStyles,
    leftHeadingBar,
    rightHeadingBar,
  };

  return (
    <DiffViewContext.Provider value={value}>
      {children}
    </DiffViewContext.Provider>
  );
};
