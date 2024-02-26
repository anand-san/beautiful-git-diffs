"use client";
import React, { ReactNode, createContext } from "react";
import { CodeEditorContextProvider } from "./code-editor-context";
import { DiffViewContextProvider } from "./diff-view-context";
import { MantineProvider, createTheme } from "@mantine/core";
import { BackgroundContextProvider } from "./background-context";
import { ScreenshotViewContextProvider } from "./screenshot-context";

const VIEW_TYPES = [
  {
    value: "Screenshot",
    label: "Screenshot",
    disabled: false,
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

export const RootAppContext = createContext({
  activeElement: {
    value: "Screenshot",
    label: "Screenshot",
    disabled: false,
  },
  setActiveElement: (element: (typeof VIEW_TYPES)[0]) => {},
  VIEW_TYPES: VIEW_TYPES,
});

export default function RootAppContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [activeElement, setActiveElement] = React.useState<
    (typeof VIEW_TYPES)[0]
  >({
    value: "Screenshot",
    label: "Screenshot",
    disabled: false,
  });
  const value = {
    activeElement,
    setActiveElement,
    VIEW_TYPES,
  };
  return (
    <RootAppContext.Provider value={value}>
      <MantineProvider defaultColorScheme={"dark"}>
        <BackgroundContextProvider>
          <CodeEditorContextProvider>
            <ScreenshotViewContextProvider>
              <DiffViewContextProvider>{children}</DiffViewContextProvider>
            </ScreenshotViewContextProvider>
          </CodeEditorContextProvider>
        </BackgroundContextProvider>
      </MantineProvider>
    </RootAppContext.Provider>
  );
}
