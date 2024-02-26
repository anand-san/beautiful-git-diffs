"use client";
import DockMenu from "@/components/dock-menu/dock-menu";
import DiffView from "@/components/diff-view/diff-view";
import styles from "./page.module.css";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import React, { useCallback, useEffect } from "react";
import BackgroundContainer from "@/components/background-container/background-container";
import { SegmentedControl } from "@mantine/core";

export default function Home() {
  const [positionX, setPositionX] = React.useState(0);
  const [positionY, setPositionY] = React.useState(0);
  const [activeElement, setActiveElement] = React.useState<
    (typeof ELEMENT_TYPES)[0]
  >({
    value: "Code Diff",
    label: "Code Diff",
    disabled: false,
  });
  function handleDragEnd(event: DragEndEvent) {
    setPositionX((currentPosition) => (currentPosition += event.delta.x));
    setPositionY((currentPosition) => (currentPosition += event.delta.y));
  }

  const ELEMENT_TYPES = [
    {
      value: "Screenshot",
      label: "Screenshot",
      disabled: true,
    },
    {
      value: "Code Diff",
      label: "Code Diff",
      disabled: false,
    },
    {
      value: "Terminal",
      label: "Terminal",
      disabled: true,
    },
  ];

  const renderElement = () => {
    switch (activeElement.value) {
      case "Screenshot":
        return "screenshot element";
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
        data={ELEMENT_TYPES}
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
