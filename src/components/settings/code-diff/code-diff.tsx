import { DiffViewContext } from "@/context/diff-view-context";
import {
  DrawerBody,
  Radio,
  Group,
  Switch,
  rem,
  Blockquote,
  Divider,
  useMantineTheme,
} from "@mantine/core";
import {
  IconCheck,
  IconX,
  IconInfoCircle,
  IconArrowsSplit,
  IconTree,
} from "@tabler/icons-react";
import React from "react";
import { DiffMethod } from "react-diff-viewer";
import styles from "./code-diff.module.css";

export default function CodeDiffSettings() {
  const theme = useMantineTheme();
  const {
    dndEnabled,
    toggleDnd,
    showEditorHeader,
    toggleEditorHeader,
    editorSplitView,
    toggleSplitView,
    diffAlgorithm,
    setDiffAlgorithm,
  } = React.useContext(DiffViewContext);

  return (
    <DrawerBody className={styles.container}>
      <h3>Diff Viewer</h3>
      <div className={styles.diffViewerOptions}>
        <Radio.Group
          name="diffAlgorithm"
          label="Select word difference calculator algorithm"
          size="md"
          value={diffAlgorithm}
          withAsterisk
          onChange={(value) => setDiffAlgorithm(value as DiffMethod)}
        >
          <Group mt="xs">
            <Radio value={DiffMethod.CHARS} label="Chars" />
            <Radio value={DiffMethod.WORDS} label="Words" />
            <Radio value={DiffMethod.LINES} label="Lines" />
          </Group>
        </Radio.Group>
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
            You will be able to resize diff viewer container when drag and drop
            is disabled
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
    </DrawerBody>
  );
}
