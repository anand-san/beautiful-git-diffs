import React, { ReactNode } from "react";
import { CodeEditorContextProvider } from "./code-editor-context";
import { DiffViewContextProvider } from "./diff-view-context";

export default function AppContext({ children }: { children: ReactNode }) {
  return (
    <div>
      <CodeEditorContextProvider>
        <DiffViewContextProvider>{children}</DiffViewContextProvider>
      </CodeEditorContextProvider>
    </div>
  );
}
