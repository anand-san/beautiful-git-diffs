"use client";
import * as React from "react";
import styles from "./settings.module.css";
import {
  Drawer,
  DrawerContent,
  DrawerBody,
  UnstyledButton,
  Switch,
  useMantineTheme,
  rem,
  Divider,
  Blockquote,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconArrowsSplit,
  IconCheck,
  IconInfoCircle,
  IconTree,
  IconX,
} from "@tabler/icons-react";
import { DiffViewContext } from "@/context/diff-view-context";

export function Settings({ triggerChild }: { triggerChild: React.ReactNode }) {
  const [opened, { open, close }] = useDisclosure(false);
  const theme = useMantineTheme();
  const {
    dndEnabled,
    toggleDnd,
    showEditorHeader,
    toggleEditorHeader,
    editorSplitView,
    toggleSplitView,
  } = React.useContext(DiffViewContext);

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
          <DrawerBody className={styles.drawerBody}>
            <h3>Diff Viewer</h3>
            <div className={styles.diffViewerOptions}>
              <Switch
                checked={dndEnabled}
                onChange={toggleDnd}
                color="teal"
                size="md"
                label="Enable moving diff viewer around"
                thumbIcon={
                  dndEnabled ? (
                    <IconCheck
                      style={{ width: rem(12), height: rem(12) }}
                      color={theme.colors.teal[6]}
                      stroke={3}
                    />
                  ) : (
                    <IconX
                      style={{ width: rem(12), height: rem(12) }}
                      color={theme.colors.red[6]}
                      stroke={3}
                    />
                  )
                }
              />
              {dndEnabled && (
                <Blockquote
                  color="yellow"
                  icon={<IconInfoCircle />}
                  mt="md"
                  iconSize={24}
                  className={styles.blockquote}
                >
                  When diff-viewer drag and drop is enabled, you wont be able to
                  resize the diff-viewer container and vice versa.
                </Blockquote>
              )}
              {!dndEnabled && (
                <Blockquote
                  color="blue"
                  icon={<IconInfoCircle />}
                  mt="md"
                  iconSize={24}
                  className={styles.blockquote}
                >
                  You will be able to resize diff viewer container when drag and
                  drop is disabled
                </Blockquote>
              )}
              <Switch
                checked={editorSplitView}
                onChange={toggleSplitView}
                color="teal"
                size="md"
                label="Toggle Split/Tree view"
                thumbIcon={
                  editorSplitView ? (
                    <IconArrowsSplit
                      style={{ width: rem(12), height: rem(12) }}
                      color={theme.colors.teal[6]}
                      stroke={3}
                    />
                  ) : (
                    <IconTree
                      style={{ width: rem(12), height: rem(12) }}
                      color={theme.colors.red[6]}
                      stroke={3}
                    />
                  )
                }
              />
              <Switch
                checked={showEditorHeader}
                onChange={toggleEditorHeader}
                color="teal"
                size="md"
                label="Show header"
                thumbIcon={
                  showEditorHeader ? (
                    <IconCheck
                      style={{ width: rem(12), height: rem(12) }}
                      color={theme.colors.teal[6]}
                      stroke={3}
                    />
                  ) : (
                    <IconX
                      style={{ width: rem(12), height: rem(12) }}
                      color={theme.colors.red[6]}
                      stroke={3}
                    />
                  )
                }
              />
              {showEditorHeader && (
                <Blockquote
                  color="yellow"
                  icon={<IconInfoCircle />}
                  mt="md"
                  iconSize={24}
                  className={styles.blockquote}
                >
                  The text on the header is editable
                </Blockquote>
              )}
            </div>
            <Divider my="md" />
            <h3>Code Editor</h3>
            <Blockquote
              color="blue"
              icon={<IconInfoCircle />}
              mt="md"
              iconSize={24}
              className={styles.blockquote}
            >
              Coming Soon
            </Blockquote>
            <Divider my="md" />
            <h3>Export/Download</h3>
            <Blockquote
              color="blue"
              icon={<IconInfoCircle />}
              mt="md"
              iconSize={24}
              className={styles.blockquote}
            >
              Coming Soon
            </Blockquote>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <UnstyledButton onClick={open}>{triggerChild}</UnstyledButton>
    </div>
  );
}
