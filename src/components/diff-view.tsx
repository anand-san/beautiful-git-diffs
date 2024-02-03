import { CodeEditorContext } from "@/context/code-editor-context";
import { DiffViewContext } from "@/context/diff-view-context";
import { sampleSourceCode, sampleTargetCode } from "@/lib/const";
import { captureElement, cn, customHighlightSyntax } from "@/lib/utils";
import {
  CameraIcon,
  MessageCircle,
  MessageCircleOff,
  TreesIcon,
  SplitIcon,
  SunIcon,
  MoonIcon,
} from "lucide-react";
import React, { useContext } from "react";
import ReactDiffViewer, { DiffMethod } from "react-diff-viewer";

export default function DiffView() {
  const { targetCode, sourceCode } = useContext(CodeEditorContext);

  const {
    showEditorHeader,
    toggleEditorDarkMode,
    toggleEditorHeader,
    toggleSplitView,
    editorSplitView,
    editorDarkMode,
    leftHeadingBar,
    rightHeadingBar,
    diffViewStyles,
  } = useContext(DiffViewContext);

  const highlightSyntax = (str: string) => (
    <pre
      style={{ display: "inline" }}
      dangerouslySetInnerHTML={{
        __html: customHighlightSyntax(str),
      }}
    />
  );

  return (
    <div className={cn("mx-12 mt-12")}>
      <div className="flex justify-end space-x-4 p-2 items-center bg-[#2F323E]">
        <div className="camera">
          <CameraIcon
            className="w-6 h-6 text-slate-200 cursor-pointer"
            onClick={() => captureElement("diff-view")}
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
        className="flex items-center justify-center p-16 pl-24 pr-24 bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100 min-h-[400px]"
      >
        {sourceCode === targetCode ? (
          <div className="flex flex-col space-y-4">
            <p className="text-slate-900 text-2xl font-semibold">
              Feed me code, I will give you beautiful git diffs
            </p>
            <p>Understand the diff editor options:</p>
            <ul className="space-y-1">
              <li className="flex space-x-2 items-center">
                <CameraIcon className="w-4 h-4 text-slate-800 cursor-pointer" />
                <p className="font-light text-sm">
                  Lets you capture the diff as an image
                </p>
              </li>
              <li className="flex space-x-2 items-center">
                <MessageCircle className="w-4 h-4 text-slate-800 cursor-pointer" />{" "}
                <p className="font-light text-sm">/</p>
                <MessageCircleOff className="w-4 h-4 text-slate-800 cursor-pointer" />{" "}
                <p className="font-light text-sm">
                  Allows you to toggle the header of the diff editor
                </p>
              </li>
              <li className="flex space-x-2 items-center">
                <TreesIcon className="w-4 h-4 text-slate-800 cursor-pointer" />{" "}
                <p className="font-light text-sm">/</p>
                <SplitIcon className="w-4 h-4 text-slate-800 cursor-pointer" />{" "}
                <p className="font-light text-sm">
                  Lets you change the diff into tree or split view
                </p>
              </li>
              <li className="flex space-x-2 items-center">
                <SunIcon className="w-4 h-4 text-slate-800 cursor-pointer" />{" "}
                <p className="font-light text-sm">/</p>
                <MoonIcon className="w-4 h-4 text-slate-800 cursor-pointer" />{" "}
                <p className="font-light text-sm">
                  Lets you change the theme of the diff editor
                </p>
              </li>
            </ul>
            <p className="font-light text-xs">
              Press CMD + H to bring back this help text anytime, Have fun
            </p>
          </div>
        ) : (
          <ReactDiffViewer
            styles={diffViewStyles}
            oldValue={sourceCode || sampleSourceCode}
            newValue={targetCode || sampleTargetCode}
            splitView={editorSplitView}
            useDarkTheme={editorDarkMode}
            leftTitle={showEditorHeader ? undefined : leftHeadingBar}
            rightTitle={showEditorHeader ? undefined : rightHeadingBar}
            renderContent={highlightSyntax}
            disableWordDiff={false}
            compareMethod={DiffMethod.WORDS}
          />
        )}
      </div>
    </div>
  );
}
