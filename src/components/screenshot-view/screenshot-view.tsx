import { ScreenshotViewContext } from "@/context/screenshot-context";
import { Button, FileButton, Group, Text } from "@mantine/core";
import Image from "next/image";
import React, { useContext, useState } from "react";

export default function ScreenshotView() {
  const { file, setFile, imageStyles } = useContext(ScreenshotViewContext);
  return (
    <div>
      {!file ? (
        <>
          <Group justify="center">
            <FileButton onChange={setFile} accept="image/png,image/jpeg">
              {(props) => <Button {...props}>Upload image</Button>}
            </FileButton>
          </Group>
        </>
      ) : (
        <div>
          <Image
            src={URL.createObjectURL(file)}
            width={0}
            height={0}
            style={{
              width: "auto",
              height: "auto",
              borderRadius: 8,
              ...imageStyles,
            }}
            alt="uploaded_image"
          />
        </div>
      )}
    </div>
  );
}
