import { sampleSourceCode, sampleTargetCode } from "@/lib/const";
import { createContext, useState } from "react";

export const CodeEditorContext = createContext({
  sourceCode: "",
  updateSourceCode: (value?: string) => {},

  targetCode: "",
  updateTargetCode: (value?: string) => {},
});

export const CodeEditorContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [sourceCode, setSourceCode] = useState<string>("");
  const [targetCode, setTargetCode] = useState<string>("");

  const updateSourceCode = (value?: string) => {
    setSourceCode(value || sampleSourceCode);
  };

  const updateTargetCode = (value?: string) => {
    setTargetCode(value || sampleTargetCode);
  };

  const value = {
    sourceCode,
    updateSourceCode,
    targetCode,
    updateTargetCode,
  };

  return (
    <CodeEditorContext.Provider value={value}>
      {children}
    </CodeEditorContext.Provider>
  );
};
