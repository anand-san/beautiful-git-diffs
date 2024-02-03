"use client";
import DockMenu from "@/components/dock-menu/dock-menu";
import DiffView from "@/components/diff-view/diff-view";
import styles from "./page.module.css";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import React from "react";

export default function Home() {
  const [positionX, setPositionX] = React.useState(0);
  const [positionY, setPositionY] = React.useState(0);

  function handleDragEnd(event: DragEndEvent) {
    setPositionX((currentPosition) => (currentPosition += event.delta.x));
    setPositionY((currentPosition) => (currentPosition += event.delta.y));
  }

  return (
    <main className={styles.container}>
      <DndContext
        modifiers={[restrictToParentElement]}
        onDragEnd={handleDragEnd}
      >
        <DiffView
          customStyles={{
            left: positionX,
            top: positionY,
          }}
        />
      </DndContext>
      <DockMenu />
    </main>
  );
}
