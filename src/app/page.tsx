"use client";
import DockMenu from "@/components/dock-menu/dock-menu";
import AppContext from "@/context/app-context";
import DiffView from "@/components/diff-view/diff-view";
import styles from "./page.module.css";
export default function Home() {
  return (
    <AppContext>
      <main className={styles.container}>
        <DiffView />
        <DockMenu />
      </main>
    </AppContext>
  );
}
