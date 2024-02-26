"use client";
import * as React from "react";
import styles from "./settings.module.css";
import {
  ColorPicker,
  DEFAULT_THEME,
  Drawer,
  DrawerContent,
  SegmentedControl,
  Slider,
  Switch,
  UnstyledButton,
  rem,
  useMantineTheme,
  Text,
  Divider,
  Blockquote,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import CodeDiffSettings from "./code-diff/code-diff";
import ScreenshotSettings from "./screenshot/screenshot";
import { RootAppContext } from "@/context/app-context";
import {
  BackgroundContext,
  BackgroundGradiant,
} from "@/context/background-context";
import { IconCheck, IconInfoCircle, IconX } from "@tabler/icons-react";
export function Settings({ triggerChild }: { triggerChild: React.ReactNode }) {
  const [opened, { open, close }] = useDisclosure(false);
  const { activeElement } = React.useContext(RootAppContext);
  const {
    backgroundGradiant,
    setBackgroundGradiant,
    useSolidBackground,
    toggleUseSolidBackground,
    backgroundColor,
    setBackgroundColor,
  } = React.useContext(BackgroundContext);

  const [selectedGradiantPanel, setSelectedGradiantPanel] = React.useState<
    "from" | "via" | "to"
  >("from");
  const theme = useMantineTheme();

  const renderSettings = () => {
    switch (activeElement.value) {
      case "screenshot":
        return <ScreenshotSettings />;
      case "code-diff":
        return <CodeDiffSettings />;
      case "terminal":
        return "Terminal Settings";
      default:
        return <ScreenshotSettings />;
    }
  };

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
    <div>
      <Drawer
        opened={opened}
        onClose={close}
        position="right"
        overlayProps={{ backgroundOpacity: 0, blur: 0 }}
        size={"md"}
        padding={0}
        className={styles.drawer}
        title={<h2 className={styles.drawerTitle}>Settings</h2>}
      >
        <DrawerContent className={styles.drawerContent}>
          <div className={styles.commonSettings}>
            <div className={styles.colors}>
              <h3>General Options</h3>
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
                          onChange={(value) =>
                            calculateGradiantStrength(value, "to")
                          }
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            <Divider mt={"md"} />
            <div>
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
            </div>
          </div>
          <Divider my="md" />
          {renderSettings()}
        </DrawerContent>
      </Drawer>
      <UnstyledButton onClick={open}>{triggerChild}</UnstyledButton>
    </div>
  );
}
