import { ScreenshotViewContext } from "@/context/screenshot-context";
import { useDraggable } from "@dnd-kit/core";
import { Button, FileButton, Group, Text } from "@mantine/core";
import Image from "next/image";
import React, { useContext, useState } from "react";
import styles from "./screenshot-view.module.css";

export default function ScreenshotView({
  customStyles,
}: {
  customStyles?: React.CSSProperties | undefined;
}) {
  const { file, setFile, imageStyles } = useContext(ScreenshotViewContext);

  const {
    attributes,
    listeners,
    setNodeRef: draggableRef,
    transform,
  } = useDraggable({
    id: "screenshot",
    disabled: !file,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return !file ? (
    <>
      <Group justify="center">
        <FileButton onChange={setFile} accept="image/png,image/jpeg">
          {(props) => <Button {...props}>Upload image</Button>}
        </FileButton>
      </Group>
    </>
  ) : (
    <div
      className={styles.container}
      ref={draggableRef}
      {...attributes}
      {...listeners}
      style={{ ...style, ...customStyles }}
    >
      <Image
        src={URL.createObjectURL(file)}
        width={0}
        height={0}
        style={{
          width: "auto",
          height: "auto",
          //   borderRadius: 8,
          ...imageStyles,
        }}
        alt="uploaded_image"
      />
    </div>
  );
}
