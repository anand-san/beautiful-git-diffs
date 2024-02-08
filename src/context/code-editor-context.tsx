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
  const [sourceCode, setSourceCode] = useState<string>(sampleSourceCode);
  const [targetCode, setTargetCode] = useState<string>(sampleTargetCode);

  const updateSourceCode = (value?: string) => {
    setSourceCode(value || "");
  };

  const updateTargetCode = (value?: string) => {
    setTargetCode(value || "");
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
