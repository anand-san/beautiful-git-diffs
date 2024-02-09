import { TextInput } from "@mantine/core";
import { createContext, useState } from "react";
import { DiffMethod, ReactDiffViewerStylesOverride } from "react-diff-viewer";

export type BackgroundGradiant = {
  direction: string;
  from: string;
  fromPosition: number;
  via: string;
  viaPosition: number;
  to: string;
  toPosition: number;
};
export const DiffViewContext = createContext({
  editorSplitView: true,
  toggleSplitView: () => {},

  showEditorHeader: true,
  toggleEditorHeader: () => {},

  dndEnabled: false,
  toggleDnd: () => {},

  diffViewStyles: {},

  leftHeadingBar: <>Before</>,
  rightHeadingBar: <>After</>,

  diffAlgorithm: DiffMethod.WORDS,
  setDiffAlgorithm: (method: DiffMethod) => {},

  backgroundGradiant: {
    direction: "225deg",
    from: "#ff3cac",
    fromPosition: 0,
    via: "#784ba0",
    viaPosition: 50,
    to: "#2b86c5",
    toPosition: 100,
  },

  setBackgroundGradiant: (newBackground: BackgroundGradiant) => {},

  useSolidBackground: false,
  toggleUseSolidBackground: () => {},

  backgroundColor: "#339af0",
  setBackgroundColor: (newBackground: string) => {},
});

export const DiffViewContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [editorSplitView, setEditorSplitView] = useState<boolean>(true);
  const [showEditorHeader, setShowEditorHeader] = useState<boolean>(true);
  const [dndEnabled, setDndEnabled] = useState(false);
  const [leftHeadingBarText, setLeftHeadingBarText] = useState("Before");
  const [rightHeadingBarText, setRightHeadingBarText] = useState("After");
  const [diffAlgorithm, setDiffAlgorithm] = useState<DiffMethod>(
    DiffMethod.WORDS
  );

  const [useSolidBackground, setUseSolidBackground] = useState<boolean>(false);
  const [backgroundColor, setBackgroundColor] = useState<string>("#339af0");

  const [backgroundGradiant, setBackgroundGradiant] =
    useState<BackgroundGradiant>({
      direction: "225deg",
      from: "#ff3cac",
      fromPosition: 0,
      via: "#784ba0",
      viaPosition: 50,
      to: "#2b86c5",
      toPosition: 100,
    });

  const toggleUseSolidBackground = () => {
    setUseSolidBackground(!useSolidBackground);
  };

  const toggleSplitView = () => {
    setEditorSplitView(!editorSplitView);
  };

  const toggleEditorHeader = () => {
    setShowEditorHeader(!showEditorHeader);
  };

  const toggleDnd = () => {
    setDndEnabled(!dndEnabled);
  };

  const changeRightHeadingBarText = (text: string) => {
    setRightHeadingBarText(text);
  };

  const changeLeftHeadingBarText = (text: string) => {
    setLeftHeadingBarText(text);
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

  const leftHeadingBar = (
    <TextInput
      variant="unstyled"
      value={leftHeadingBarText}
      onChange={(event) => changeLeftHeadingBarText(event.currentTarget.value)}
      style={{ fontStyle: "italic", fontWeight: 400 }}
      size="md"
    />
  );

  const rightHeadingBar = (
    <TextInput
      variant="unstyled"
      value={rightHeadingBarText}
      onChange={(event) => changeRightHeadingBarText(event.currentTarget.value)}
      style={{ fontStyle: "italic", fontWeight: 400 }}
      size="md"
    />
  );

  const value = {
    editorSplitView,
    toggleSplitView,
    showEditorHeader,
    toggleEditorHeader,
    diffViewStyles,
    leftHeadingBar,
    rightHeadingBar,
    dndEnabled,
    toggleDnd,
    diffAlgorithm,
    setDiffAlgorithm,
    backgroundGradiant,
    setBackgroundGradiant,
    backgroundColor,
    setBackgroundColor,
    useSolidBackground,
    toggleUseSolidBackground,
  };

  return (
    <DiffViewContext.Provider value={value}>
      {children}
    </DiffViewContext.Provider>
  );
};
