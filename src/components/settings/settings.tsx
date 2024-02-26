"use client";
import * as React from "react";
import styles from "./settings.module.css";
import { Drawer, DrawerContent, UnstyledButton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import CodeDiffSettings from "./code-diff/code-diff";
import ScreenshotSettings from "./screenshot/screenshot";
import { RootAppContext } from "@/context/app-context";
export function Settings({ triggerChild }: { triggerChild: React.ReactNode }) {
  const [opened, { open, close }] = useDisclosure(false);
  const { activeElement, VIEW_TYPES, setActiveElement } =
    React.useContext(RootAppContext);

  const renderSettings = () => {
    switch (activeElement.value) {
      case "Screenshot":
        return <ScreenshotSettings />;
      case "Code Diff":
        return <CodeDiffSettings />;
      case "Terminal":
        return "Terminal Settings";
      default:
        return <ScreenshotSettings />;
    }
  };
  return (
    <div>
      <Drawer
        opened={opened}
        onClose={close}
        position="right"
        overlayProps={{ backgroundOpacity: 0, blur: 0 }}
        size={"md"}
        padding={0}
        title={<h2 className={styles.drawerTitle}>Settings</h2>}
      >
        <DrawerContent className={styles.container}>
          {renderSettings()}
        </DrawerContent>
      </Drawer>
      <UnstyledButton onClick={open}>{triggerChild}</UnstyledButton>
    </div>
  );
}
