"use client";
import React, { ReactNode } from "react";
import { CodeEditorContextProvider } from "./code-editor-context";
import { DiffViewContextProvider } from "./diff-view-context";
import { MantineProvider } from "@mantine/core";

export default function AppContext({ children }: { children: ReactNode }) {
  return (
    <div>
      <MantineProvider defaultColorScheme={"dark"}>
        <CodeEditorContextProvider>
          <DiffViewContextProvider>{children}</DiffViewContextProvider>
        </CodeEditorContextProvider>
      </MantineProvider>
    </div>
  );
}
