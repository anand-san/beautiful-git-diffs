"use client";
import * as React from "react";
import Editor from "@monaco-editor/react";
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
        position="right"
        overlayProps={{ backgroundOpacity: 0.3, blur: 1 }}
        size={"xl"}
        withCloseButton={false}
        padding={0}
      >
        <DrawerContent>
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
            <h3 className={styles.heading}>Before</h3>
            <Editor
              height="400px"
              defaultLanguage="javascript"
              value={sourceCode}
              onChange={(value?: string) => updateSourceCode(value)}
              language={selectedLanguage || "javascript"}
              theme={currentTheme === "light" ? "light" : "vs-dark"}
            />
            <h3 className={styles.heading}>After</h3>

            <Editor
              height="400px"
              defaultLanguage="javascript"
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
