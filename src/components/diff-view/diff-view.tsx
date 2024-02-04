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
import { useDraggable, useDroppable } from "@dnd-kit/core";

export default function DiffView({
  customStyles,
}: {
  customStyles?: React.CSSProperties | undefined;
}) {
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

  const { setNodeRef: droppableRef } = useDroppable({
    id: "diff-view-container",
  });

  const {
    attributes,
    listeners,
    setNodeRef: draggableRef,
    transform,
  } = useDraggable({
    id: "diff-viewer",
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  if (!isMounted) return <></>;

  return (
    <div className={styles.container} ref={droppableRef}>
      <div
        id="diff-view"
        className={cn(
          styles.diffView,
          currentTheme === "light"
            ? styles.diffViewBgLight
            : styles.diffViewBgDark
        )}
      >
        {/* {sourceCode === targetCode ? (
          <HelpNotes />
        ) : ( */}
        <div
          className={styles.diffViewerContainer}
          ref={draggableRef}
          {...attributes}
          {...listeners}
          style={{ ...style, ...customStyles }}
        >
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
        {/* )} */}
      </div>
    </div>
  );
}

const HelpNotes = () => (
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
        <IconRouteAltRight className={styles.diffHelpContainerListIcon} />
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
);
