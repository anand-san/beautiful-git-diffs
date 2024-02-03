"use client";
import "../styles/prism.css";
import DockMenu from "@/components/dock-menu";
import AppContext from "@/context/app-context";
import DiffView from "@/components/diff-view";

export default function Home() {
  return (
    <AppContext>
      <main className="h-full bg-slate-800 min-w-[1024px]">
        <DiffView />
        <DockMenu />
      </main>
    </AppContext>
  );
}
