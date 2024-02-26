import React from "react";
import styles from "./screenshot.module.css";
import { Blockquote } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";

export default function ScreenshotSettings() {
  return (
    <div className={styles.container}>
      {" "}
      <h3>Screenshot</h3>
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
  );
}
