"use client";
import DockMenu from "@/components/dock-menu/dock-menu";
import DiffView from "@/components/diff-view/diff-view";
import styles from "./page.module.css";
export default function Home() {
  return (
    <main className={styles.container}>
      <DiffView />
      <DockMenu />
    </main>
  );
}
