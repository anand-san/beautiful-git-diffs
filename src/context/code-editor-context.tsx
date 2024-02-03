import { sampleSourceCode, sampleTargetCode } from "@/lib/const";
import { createContext, useState } from "react";

export const CodeEditorContext = createContext({
  sourceCode: "",
  updateSourceCode: (value?: string) => {},

  targetCode: "",
  updateTargetCode: (value?: string) => {},

  editorTheme: "vs-dark",
  toggleEditorTheme: (value?: "light" | "vs-dark") => {},
});

export const CodeEditorContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [sourceCode, setSourceCode] = useState<string>("");
  const [targetCode, setTargetCode] = useState<string>("");
  const [editorTheme, setEditorTheme] = useState<"light" | "vs-dark">(
    "vs-dark"
  );

  const updateSourceCode = (value?: string) => {
    setSourceCode(value || sampleSourceCode);
  };

  const updateTargetCode = (value?: string) => {
    setTargetCode(value || sampleTargetCode);
  };

  const toggleEditorTheme = (value?: "light" | "vs-dark") => {
    setEditorTheme((currentTheme) =>
      currentTheme === "light" ? "vs-dark" : "light"
    );
  };

  const value = {
    sourceCode,
    updateSourceCode,
    targetCode,
    updateTargetCode,
    editorTheme,
    toggleEditorTheme,
  };

  return (
    <CodeEditorContext.Provider value={value}>
      {children}
    </CodeEditorContext.Provider>
  );
};
