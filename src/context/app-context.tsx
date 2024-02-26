"use client";
import React, { ReactNode } from "react";
import { CodeEditorContextProvider } from "./code-editor-context";
import { DiffViewContextProvider } from "./diff-view-context";
import { MantineProvider } from "@mantine/core";
import { DndContext } from "@dnd-kit/core";
import { BackgroundContextProvider } from "./background-context";

export default function AppContext({ children }: { children: ReactNode }) {
  return (
    <div>
      <MantineProvider defaultColorScheme={"dark"}>
        <BackgroundContextProvider>
          <CodeEditorContextProvider>
            <DiffViewContextProvider>
              <>{children}</>
            </DiffViewContextProvider>
          </CodeEditorContextProvider>
        </BackgroundContextProvider>
      </MantineProvider>
    </div>
  );
}
