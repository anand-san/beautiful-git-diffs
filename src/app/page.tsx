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

export default function Home() {
  const [positionX, setPositionX] = React.useState(0);
  const [positionY, setPositionY] = React.useState(0);
  const { activeElement, VIEW_TYPES, setActiveElement } =
    useContext(RootAppContext);
  function handleDragEnd(event: DragEndEvent) {
    setPositionX((currentPosition) => (currentPosition += event.delta.x));
    setPositionY((currentPosition) => (currentPosition += event.delta.y));
  }

  const renderElement = () => {
    switch (activeElement.value) {
      case "Screenshot":
        return <ScreenshotView />;
      case "Code Diff":
        return (
          <DiffView
            customStyles={{
              left: positionX,
              top: positionY,
            }}
          />
        );
      case "Terminal":
        return "Terminal element";
      default:
        return (
          <DiffView
            customStyles={{
              left: positionX,
              top: positionY,
            }}
          />
        );
    }
  };

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
        onDragEnd={handleDragEnd}
      >
        <BackgroundContainer>{renderElement()}</BackgroundContainer>
      </DndContext>
      <DockMenu />
    </main>
  );
}
