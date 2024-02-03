import {
  IconCameraCode,
  IconCode,
  IconSettings,
  IconBrandGithub,
  IconBrandX,
  IconSun,
  IconMoon,
  IconLogin2,
} from "@tabler/icons-react";

import React, { useContext } from "react";
import styles from "./dock-menu.module.css";
import Link from "next/link";
import { CodeEditor } from "../code-editor/code-editor";
import { captureElement } from "@/lib/utils";
import { useComputedColorScheme, useMantineColorScheme } from "@mantine/core";

interface DockMenuProps {
  position?: "top" | "bottom";
}

export default function DockMenu({}: DockMenuProps) {
  const { toggleColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme();

  const [isMounted, setIsMounted] = React.useState(false);

  // TODO: Fix hydration without using these additional hacks
  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <></>;

  return (
    <section className={styles.navWrapper}>
      <div className={styles.navContainer}>
        <CodeEditor
          triggerChild={
            <div className={styles.navElement}>
              <IconCode className={styles.navIcon} />
            </div>
          }
        />

        <button
          className={styles.navElement}
          onClick={() => captureElement("diff-view")}
        >
          <IconCameraCode className={styles.navIcon} />
        </button>
        <div className={styles.navElement}>
          <IconSettings className={styles.navIcon} />
        </div>
        <div className={styles.navSeparator}></div>
        <Link
          className={styles.navElement}
          href={"https://github.com/anand-san/beautiful-git-diffs"}
          target="_blank"
        >
          <IconBrandGithub className={styles.navIcon} />
        </Link>
        <Link
          className={styles.navElement}
          href={"https://twitter.com/anandsan_"}
          target="_blank"
        >
          <IconBrandX className={styles.navIcon} />
        </Link>
        <div className={styles.navSeparator}></div>
        <Link className={styles.navElement} href={"/login"}>
          <IconLogin2 className={styles.navIcon} />
        </Link>
        <button className={styles.navElement} onClick={toggleColorScheme}>
          {computedColorScheme && computedColorScheme === "light" ? (
            <IconMoon className={styles.navIcon} />
          ) : (
            <IconSun className={styles.navIcon} />
          )}
        </button>
      </div>
    </section>
  );
}
