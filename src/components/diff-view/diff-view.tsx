"use client";
import { CodeEditorContext } from "@/context/code-editor-context";
import { DiffViewContext } from "@/context/diff-view-context";
import { sampleSourceCode, sampleTargetCode } from "@/lib/const";
import { captureElement, cn, customHighlightSyntax } from "@/lib/utils";
import {
  IconCamera,
  IconHeading,
  IconHeadingOff,
  IconArrowsSplit,
  IconRouteAltRight,
  IconSun,
  IconMoon,
} from "@tabler/icons-react";
import React, { useContext } from "react";
import ReactDiffViewer, { DiffMethod } from "react-diff-viewer";
import styles from "./diff-view.module.css";
import "../../styles/prism.css";
import { useComputedColorScheme } from "@mantine/core";

export default function DiffView() {
  const { targetCode, sourceCode } = useContext(CodeEditorContext);
  const [isMounted, setIsMounted] = React.useState(false);

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

  const currentTheme = useComputedColorScheme();

  // TODO: Fix hydration without using these additional hacks
  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <></>;

  console.log(currentTheme, "currentTheme");

  return (
    <div className={styles.container}>
      <div
        id="diff-view"
        className={cn(
          styles.diffView,
          currentTheme === "light"
            ? styles.diffViewBgLight
            : styles.diffViewBgDark
        )}
      >
        {sourceCode === targetCode ? (
          <div className={styles.diffHelpContainer}>
            <p className={styles.diffHelpContainerTitle}>
              Feed me code, I will create beautiful diffs for you
            </p>
            <p>Understand the diff editor options</p>
            <ul className="space-y-1">
              <li className={styles.diffHelpContainerList}>
                <IconCamera className={styles.diffHelpContainerListIcon} />
                <p className={styles.diffHelpContainerListText}>
                  Lets you capture the diff as an image
                </p>
              </li>
              <li className={styles.diffHelpContainerList}>
                <IconHeading className={styles.diffHelpContainerListIcon} />
                <p className={styles.diffHelpContainerListText}>/</p>
                <IconHeadingOff className={styles.diffHelpContainerListIcon} />
                <p className={styles.diffHelpContainerListText}>
                  Allows you to toggle the header of the diff editor
                </p>
              </li>
              <li className={styles.diffHelpContainerList}>
                <IconRouteAltRight
                  className={styles.diffHelpContainerListIcon}
                />
                <p className={styles.diffHelpContainerListText}>/</p>
                <IconArrowsSplit className={styles.diffHelpContainerListIcon} />
                <p className={styles.diffHelpContainerListText}>
                  Lets you change the diff into tree or split view
                </p>
              </li>
              <li className={styles.diffHelpContainerList}>
                <IconSun className={styles.diffHelpContainerListIcon} />
                <p className={styles.diffHelpContainerListText}>/</p>
                <IconMoon className={styles.diffHelpContainerListIcon} />
                <p className={styles.diffHelpContainerListText}>
                  Lets you change the theme of the diff editor
                </p>
              </li>
            </ul>
            <p className={styles.diffHelpContainerFooter}>
              Press CMD + H to bring back this help text anytime, Have fun
            </p>
          </div>
        ) : (
          <div className={styles.diffViewerContainer}>
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
          </div>
        )}
      </div>
    </div>
  );
}
