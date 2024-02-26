import {
  IconCameraCode,
  IconCode,
  IconSettings,
  IconBrandGithub,
  IconBrandX,
  IconSun,
  IconMoon,
  IconLogin2,
  IconLogout2,
} from "@tabler/icons-react";

import React, { useContext } from "react";
import styles from "./dock-menu.module.css";
import Link from "next/link";
import { CodeEditor } from "../code-editor/code-editor";
import { captureElement } from "@/lib/utils";
import {
  Button,
  Tooltip,
  UnstyledButton,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";
import { Settings } from "../settings/settings";
import { LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

interface DockMenuProps {
  position?: "top" | "bottom";
}

export default function DockMenu({}: DockMenuProps) {
  const { toggleColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme();
  const { user } = useKindeBrowserClient();

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
            <Tooltip position="top" offset={12} label="Code Editor">
              <div className={styles.navElement}>
                <IconCode className={styles.navIcon} />
              </div>
            </Tooltip>
          }
        />

        <Tooltip position="top" offset={12} label="Export Image">
          <UnstyledButton
            className={styles.navElement}
            onClick={() => captureElement("diff-view")}
          >
            <IconCameraCode className={styles.navIcon} />
          </UnstyledButton>
        </Tooltip>

        <Settings
          triggerChild={
            <Tooltip position="top" offset={12} label="Settings">
              <div className={styles.navElement}>
                <IconSettings className={styles.navIcon} />
              </div>
            </Tooltip>
          }
        />

        <div className={styles.navSeparator}></div>

        <Tooltip position="top" offset={12} label="Github">
          <Link
            className={styles.navElement}
            href={"https://github.com/anand-san/beautiful-git-diffs"}
            target="_blank"
          >
            <IconBrandGithub className={styles.navIcon} />
          </Link>
        </Tooltip>

        <Tooltip position="top" offset={12} label="X">
          <Link
            className={styles.navElement}
            href={"https://twitter.com/anandsan_"}
            target="_blank"
          >
            <IconBrandX className={styles.navIcon} />
          </Link>
        </Tooltip>

        <div className={styles.navSeparator}></div>

        {!user ? (
          <Tooltip position="top" offset={12} label="Login">
            <LoginLink className={styles.navElement}>
              <IconLogin2 className={styles.navIcon} />
            </LoginLink>
          </Tooltip>
        ) : (
          <Tooltip position="top" offset={12} label="Logout">
            <LogoutLink className={styles.navElement}>
              <IconLogout2 className={styles.navIcon} />
            </LogoutLink>
          </Tooltip>
        )}

        <Tooltip position="top" offset={12} label="Toggle Theme">
          <UnstyledButton
            className={styles.navElement}
            onClick={toggleColorScheme}
          >
            {computedColorScheme && computedColorScheme === "light" ? (
              <IconMoon className={styles.navIcon} />
            ) : (
              <IconSun className={styles.navIcon} />
            )}
          </UnstyledButton>
        </Tooltip>
      </div>
    </section>
  );
}
