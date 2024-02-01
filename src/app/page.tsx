"use client";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import ReactDiffViewer, {
  ReactDiffViewerStylesOverride,
} from "react-diff-viewer";
import Prism from "prismjs";
import "../styles/prism.css";
import {
  CameraIcon,
  MessageCircle,
  MessageCircleOff,
  MoonIcon,
  SplitIcon,
  SunIcon,
  TreesIcon,
} from "lucide-react";
import { toPng } from "html-to-image";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export default function Home() {
  const [sourceCode, setSourceCode] = useState<string>("");
  const [targetCode, setTargetCode] = useState<string>("");
  const [editorDarkMode, setEditorDarkMode] = useState<boolean>(true);
  const [editorSplitView, setEditorSplitView] = useState<boolean>(true);
  const [showEditorHeader, setShowEditorHeader] = useState<boolean>(true);

  const updateSourceCode = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSourceCode(e.target.value);
  };

  const updateTargetCode = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTargetCode(e.target.value);
  };

  const toggleEditorDarkMode = () => {
    setEditorDarkMode(!editorDarkMode);
  };

  const toggleSplitView = () => {
    setEditorSplitView(!editorSplitView);
  };

  const toggleEditorHeader = () => {
    setShowEditorHeader(!showEditorHeader);
  };

  const captureDiffImage = async () => {
    const node = document.getElementById("diff-view") as HTMLElement;
    const dataUrl = await toPng(node);
    const link = document.createElement("a");
    link.download = "diff.png";
    link.href = dataUrl;
    link.click();
  };

  const prismTest = (str: string) => {
    if (!str) str = "";
    return Prism.highlight(str, Prism.languages.javascript, "javascript");
  };

  const highlightSyntax = (str: string) => (
    <pre
      style={{ display: "inline" }}
      dangerouslySetInnerHTML={{
        __html: prismTest(str),
      }}
    />
  );

  const newStyles: ReactDiffViewerStylesOverride = {
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

  const sampleSourceCode = `export const OldCode = () => {
    // Not so amazing code
    // Change me
  };`;

  const sampleTargetCode = `export const NewCode = () => {
    // better code maybe?
    // Change me
  };`;

  return (
    <main className="h-full bg-slate-800">
      <div className="flex space-x-4 w-full justify-center my-12">
        <div className="flex flex-col">
          <Label htmlFor="before-code" className="text-white p-4">
            Before Code
          </Label>
          <Textarea
            rows={10}
            cols={50}
            placeholder={sampleSourceCode}
            value={sourceCode}
            onChange={updateSourceCode}
            id="before-code"
          />
        </div>
        <div className="flex flex-col">
          <Label htmlFor="after-code" className="text-white p-4">
            After Code
          </Label>
          <Textarea
            rows={10}
            cols={50}
            placeholder={sampleTargetCode}
            value={targetCode}
            onChange={updateTargetCode}
            id="after-code"
          />
        </div>
      </div>
      <div>
        <div
          className={cn(
            "mx-12",
            editorSplitView ? "min-w-[1024px]" : "min-w-[850px]"
          )}
        >
          <div className="flex justify-end space-x-4 p-2 items-center bg-[#2F323E]">
            {/* <h1>Editor</h1> */}
            <div className="camera">
              <CameraIcon
                className="w-6 h-6 text-slate-200 cursor-pointer"
                onClick={captureDiffImage}
              />
            </div>
            <div className="cursor-pointer">
              {showEditorHeader ? (
                <MessageCircle
                  className="w-6 h-6 text-slate-200"
                  onClick={toggleEditorHeader}
                />
              ) : (
                <MessageCircleOff
                  className="w-6 h-6 text-slate-200"
                  onClick={toggleEditorHeader}
                />
              )}
            </div>
            <div className="cursor-pointer">
              {editorSplitView ? (
                <TreesIcon
                  className="w-6 h-6 text-slate-200"
                  onClick={toggleSplitView}
                />
              ) : (
                <SplitIcon
                  className="w-6 h-6 text-slate-200"
                  onClick={toggleSplitView}
                />
              )}
            </div>
            <div className="cursor-pointer">
              {editorDarkMode ? (
                <SunIcon
                  className="w-6 h-6 text-slate-200"
                  onClick={toggleEditorDarkMode}
                />
              ) : (
                <MoonIcon
                  className="w-6 h-6 text-slate-200"
                  onClick={toggleEditorDarkMode}
                />
              )}
            </div>
            {/* <Button>Toggle Dark Mode</Button> */}
          </div>
          <div
            id="diff-view"
            className="p-16 pl-24 pr-24 bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100"
          >
            <ReactDiffViewer
              styles={newStyles}
              oldValue={sourceCode || sampleSourceCode}
              newValue={targetCode || sampleTargetCode}
              splitView={editorSplitView}
              useDarkTheme={editorDarkMode}
              leftTitle={showEditorHeader ? undefined : leftHeadingBar}
              rightTitle={showEditorHeader ? undefined : rightHeadingBar}
              renderContent={highlightSyntax}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
