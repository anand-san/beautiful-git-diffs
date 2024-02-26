import React, { useContext } from "react";
import styles from "./background-container.module.css";
import { cn } from "@/lib/utils";
import { useDroppable } from "@dnd-kit/core";
import { BackgroundContext } from "@/context/background-context";
import { RootAppContext } from "@/context/app-context";

export default function BackgroundContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const { useSolidBackground, backgroundColor, backgroundGradiant } =
    useContext(BackgroundContext);
  const { activeElement } = useContext(RootAppContext);

  const { setNodeRef: droppableRef } = useDroppable({
    id: activeElement.value,
  });

  return (
    <div className={styles.container} ref={droppableRef}>
      <div
        id="diff-view"
        className={cn(styles.diffView)}
        style={
          useSolidBackground
            ? { backgroundColor }
            : {
                backgroundImage: `linear-gradient(${backgroundGradiant.direction}, ${backgroundGradiant.from} ${backgroundGradiant.fromPosition}%, ${backgroundGradiant.via} ${backgroundGradiant.viaPosition}%, ${backgroundGradiant.to} ${backgroundGradiant.toPosition}%)`,
              }
        }
      >
        {children}
      </div>
    </div>
  );
}
