import { createContext, useState } from "react";

export const ScreenshotViewContext = createContext({
  file: null as File | null,
  setFile: (file: File | null) => {},
  imageStyles: {} as React.CSSProperties,
  setImageStyles: (styles: React.CSSProperties) => {},
});

export const ScreenshotViewContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [imageStyles, setImageStyles] = useState({} as React.CSSProperties);

  const value = {
    file,
    setFile,
    imageStyles,
    setImageStyles,
  };

  return (
    <ScreenshotViewContext.Provider value={value}>
      {children}
    </ScreenshotViewContext.Provider>
  );
};
