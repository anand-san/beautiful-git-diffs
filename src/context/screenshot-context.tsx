import { DragEndEvent } from "@dnd-kit/core";
import { createContext, useState } from "react";

export const ScreenshotViewContext = createContext({
  file: null as File | null,
  setFile: (file: File | null) => {},
  imageStyles: {} as React.CSSProperties,
  setImageStyles: (styles: React.CSSProperties) => {},
  screenshotViewPositionX: 0,
  screenshotViewPositionY: 0,
  handleScreenshotViewDragEnd: (event: DragEndEvent) => {},
});

export const ScreenshotViewContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [imageStyles, setImageStyles] = useState({} as React.CSSProperties);
  const [screenshotViewPositionX, setScreenshotViewPositionX] = useState(0);
  const [screenshotViewPositionY, setScreenshotViewPositionY] = useState(0);

  function handleScreenshotViewDragEnd(event: DragEndEvent) {
    setScreenshotViewPositionX(
      (currentPosition) => (currentPosition += event.delta.x)
    );
    setScreenshotViewPositionY(
      (currentPosition) => (currentPosition += event.delta.y)
    );
  }

  const value = {
    file,
    setFile,
    imageStyles,
    setImageStyles,
    screenshotViewPositionX,
    screenshotViewPositionY,
    handleScreenshotViewDragEnd,
  };

  return (
    <ScreenshotViewContext.Provider value={value}>
      {children}
    </ScreenshotViewContext.Provider>
  );
};
