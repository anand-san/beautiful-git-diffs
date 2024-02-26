import {
  BackgroundContext,
  BackgroundGradiant,
} from "@/context/background-context";
import { DiffViewContext } from "@/context/diff-view-context";
import {
  DrawerBody,
  Radio,
  Group,
  Switch,
  rem,
  Blockquote,
  ColorPicker,
  DEFAULT_THEME,
  SegmentedControl,
  Slider,
  Divider,
  useMantineTheme,
  Text,
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
  const [selectedGradiantPanel, setSelectedGradiantPanel] = React.useState<
    "from" | "via" | "to"
  >("from");
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

  const {
    backgroundGradiant,
    setBackgroundGradiant,
    useSolidBackground,
    toggleUseSolidBackground,
    backgroundColor,
    setBackgroundColor,
  } = React.useContext(BackgroundContext);

  const calculateGradiantStrength = (
    value: number,
    position: "from" | "via" | "to"
  ) => {
    const previousValue = backgroundGradiant[`${position}Position`];
    const difference = value - previousValue;

    const differenceToSplit = difference / 2;

    const floorValue = Math.floor(differenceToSplit);
    const ceilValue = Math.ceil(differenceToSplit);

    let finalPositions: Partial<BackgroundGradiant> = {
      fromPosition: 0,
      viaPosition: 50,
      toPosition: 100,
    };

    if (position === "from") {
      finalPositions = {
        fromPosition: value,
        viaPosition: backgroundGradiant.viaPosition - floorValue,
        toPosition: backgroundGradiant.toPosition - ceilValue,
      };
    } else if (position === "via") {
      finalPositions = {
        fromPosition: backgroundGradiant.fromPosition - floorValue,
        viaPosition: value,
        toPosition: backgroundGradiant.toPosition - ceilValue,
      };
    } else if (position === "to") {
      finalPositions = {
        fromPosition: backgroundGradiant.fromPosition - floorValue,
        viaPosition: backgroundGradiant.viaPosition - ceilValue,
        toPosition: value,
      };
    }
    setBackgroundGradiant({
      ...backgroundGradiant,
      ...finalPositions,
    });
  };

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
        <Switch
          checked={useSolidBackground}
          onChange={toggleUseSolidBackground}
          color="teal"
          size="md"
          label="Use solid background"
          thumbIcon={
            useSolidBackground ? (
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
        <Text size="md">Choose a background</Text>

        {useSolidBackground ? (
          <ColorPicker
            format="hex"
            value={backgroundColor}
            onChange={setBackgroundColor}
            //   withPicker={false}
            fullWidth
            swatches={[
              ...DEFAULT_THEME.colors.red.slice(5, 7),
              ...DEFAULT_THEME.colors.green.slice(5, 7),
              ...DEFAULT_THEME.colors.blue.slice(4, 7),
            ]}
          />
        ) : (
          <div className={styles.gradiantPicker}>
            <div>
              <SegmentedControl
                data={[
                  { value: "from", label: "From" },
                  { value: "via", label: "Via" },
                  { value: "to", label: "To" },
                ]}
                value={selectedGradiantPanel}
                onChange={(value) =>
                  setSelectedGradiantPanel(value as "from" | "via" | "to")
                }
              />
            </div>

            <div>
              {selectedGradiantPanel === "from" && (
                <div className={styles.gradiantPickerOption}>
                  <Text size="sm">From</Text>
                  <ColorPicker
                    format="hex"
                    fullWidth
                    value={backgroundGradiant.from}
                    onChange={(value) =>
                      setBackgroundGradiant({
                        ...backgroundGradiant,
                        from: value,
                      })
                    }
                  />
                  <Text size="sm">Intensity</Text>

                  <Slider
                    color={backgroundGradiant.from}
                    label="From Position"
                    value={backgroundGradiant.fromPosition}
                    onChange={(value) =>
                      calculateGradiantStrength(value, "from")
                    }
                  />
                </div>
              )}

              {selectedGradiantPanel === "via" && (
                <div className={styles.gradiantPickerOption}>
                  <Text size="sm">Via</Text>
                  <ColorPicker
                    format="hex"
                    fullWidth
                    value={backgroundGradiant.via}
                    onChange={(value) =>
                      setBackgroundGradiant({
                        ...backgroundGradiant,
                        via: value,
                      })
                    }
                  />
                  <Text size="sm">Intensity</Text>

                  <Slider
                    color={backgroundGradiant.via}
                    label="Via Position"
                    value={backgroundGradiant.viaPosition}
                    onChange={(value) =>
                      calculateGradiantStrength(value, "via")
                    }
                  />
                </div>
              )}

              {selectedGradiantPanel === "to" && (
                <div className={styles.gradiantPickerOption}>
                  <Text size="sm">To</Text>
                  <ColorPicker
                    format="hex"
                    fullWidth
                    value={backgroundGradiant.to}
                    onChange={(value) =>
                      setBackgroundGradiant({
                        ...backgroundGradiant,
                        to: value,
                      })
                    }
                  />
                  <Text size="sm">Intensity</Text>

                  <Slider
                    color={backgroundGradiant.to}
                    label="To Position"
                    value={backgroundGradiant.toPosition}
                    onChange={(value) => calculateGradiantStrength(value, "to")}
                  />
                </div>
              )}
            </div>
          </div>
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
  );
}
