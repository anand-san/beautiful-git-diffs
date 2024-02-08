"use client";
import * as React from "react";
import Editor from "@monaco-editor/react";
import { sampleSourceCode, sampleTargetCode } from "@/lib/const";
import { CodeEditorContext } from "@/context/code-editor-context";
import styles from "./code-editor.module.css";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerBody,
  DrawerHeader,
  Select,
  CloseButton,
  UnstyledButton,
  useComputedColorScheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export function CodeEditor({
  triggerChild,
}: {
  triggerChild: React.ReactNode;
}) {
  const [opened, { open, close }] = useDisclosure(false);
  const [isMounted, setIsMounted] = React.useState(false);

  const [selectedLanguage, setSelectedLanguage] = React.useState<string | null>(
    "javascript"
  );

  const currentTheme = useComputedColorScheme();

  // TODO: Fix hydration without using these additional hacks
  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const { sourceCode, updateSourceCode, targetCode, updateTargetCode } =
    React.useContext(CodeEditorContext);

  if (!isMounted) return <></>;

  return (
    <div>
      <Drawer
        opened={opened}
        onClose={close}
        position="top"
        overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
        size={"lg"}
        withCloseButton={false}
        padding={0}
      >
        <DrawerContent className={styles.drawerContent}>
          <DrawerHeader className={styles.drawerHeader}>
            <DrawerTitle>
              <h3>Edit your code</h3>
              <p>Start typing or paste two different codes.</p>
            </DrawerTitle>
            <Select
              label="Choose Language"
              placeholder="javascript"
              defaultValue={selectedLanguage}
              data={[
                {
                  value: "javascript",
                  label: "JavaScript",
                },
                {
                  value: "typescript",
                  label: "TypeScript",
                },
                {
                  value: "python",
                  label: "Python",
                },
                {
                  value: "go",
                  label: "Go",
                },
                {
                  value: "php",
                  label: "PHP",
                },
              ]}
              onChange={setSelectedLanguage}
              searchable
            ></Select>
          </DrawerHeader>
          <DrawerBody className={styles.drawerBody}>
            <Editor
              height="400px"
              defaultLanguage="javascript"
              defaultValue={sampleSourceCode}
              value={sourceCode}
              onChange={(value?: string) => updateSourceCode(value)}
              language={selectedLanguage || "javascript"}
              theme={currentTheme === "light" ? "light" : "vs-dark"}
            />
            <Editor
              height="400px"
              defaultLanguage="javascript"
              defaultValue={sampleTargetCode}
              value={targetCode}
              onChange={(value?: string) => updateTargetCode(value)}
              language={selectedLanguage || "javascript"}
              theme={currentTheme === "light" ? "light" : "vs-dark"}
            />
          </DrawerBody>
          <div className={styles.drawerFooter}>
            <CloseButton onClick={close} />
          </div>
        </DrawerContent>
      </Drawer>
      <UnstyledButton onClick={open}>{triggerChild}</UnstyledButton>
    </div>
  );
}
