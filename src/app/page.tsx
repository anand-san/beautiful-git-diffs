"use client";
import DockMenu from "@/components/dock-menu/dock-menu";
import DiffView from "@/components/diff-view/diff-view";
import styles from "./page.module.css";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import React, { useCallback, useContext, useEffect } from "react";
import BackgroundContainer from "@/components/background-container/background-container";
import { SegmentedControl } from "@mantine/core";
import ScreenshotView from "@/components/screenshot-view/screenshot-view";
import { RootAppContext } from "@/context/app-context";
import { DiffViewContext } from "@/context/diff-view-context";
import { ScreenshotViewContext } from "@/context/screenshot-context";

export default function Home() {
  const { activeElement, VIEW_TYPES, setActiveElement } =
    useContext(RootAppContext);
  const { diffViewPositionX, diffViewPositionY, handleDiffViewDragEnd } =
    useContext(DiffViewContext);

  const {
    screenshotViewPositionX,
    screenshotViewPositionY,
    handleScreenshotViewDragEnd,
  } = useContext(ScreenshotViewContext);

  const renderElement = () => {
    switch (activeElement.value) {
      case "screenshot":
        return (
          <ScreenshotView
            customStyles={{
              left: screenshotViewPositionX,
              top: screenshotViewPositionY,
            }}
          />
        );
      case "code-diff":
        return (
          <DiffView
            customStyles={{
              left: diffViewPositionX,
              top: diffViewPositionY,
            }}
          />
        );
      case "terminal":
        return "Terminal element";
      default:
        return (
          <DiffView
            customStyles={{
              left: diffViewPositionX,
              top: diffViewPositionY,
            }}
          />
        );
    }
  };

  const handleElementDragEnd = useCallback(() => {
    switch (activeElement.value) {
      case "code-diff":
        return handleDiffViewDragEnd;
      case "screenshot":
        return handleScreenshotViewDragEnd;
      default:
        return;
    }
  }, [activeElement.value, handleDiffViewDragEnd, handleScreenshotViewDragEnd]);

  return (
    <main className={styles.container}>
      <SegmentedControl
        data={VIEW_TYPES}
        value={activeElement.value}
        onChange={(value) =>
          setActiveElement({ value, label: value, disabled: false })
        }
      />
      <DndContext
        modifiers={[restrictToParentElement]}
        onDragEnd={handleElementDragEnd()}
      >
        <BackgroundContainer>{renderElement()}</BackgroundContainer>
      </DndContext>
      <DockMenu />
    </main>
  );
}
