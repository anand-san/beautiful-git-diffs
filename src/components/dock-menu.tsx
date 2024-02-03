"use client";
import {
  Camera,
  Code,
  GithubIcon,
  HomeIcon,
  LogIn,
  Mail,
  MoonIcon,
  Settings,
  SunIcon,
  Twitter,
} from "lucide-react";
import React from "react";
import "./dock-menu.css";
import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import Link from "next/link";
import { CodeEditor } from "./code-editor";
import { captureElement } from "@/lib/utils";

interface DockMenuProps {
  position?: "top" | "bottom";
}

export default function DockMenu({}: DockMenuProps) {
  const { setTheme, resolvedTheme } = useTheme();

  const handleDarkMode = () => {
    const newTheme = resolvedTheme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  return (
    <section className="nav-wrapper">
      <div className="nav-container">
        <CodeEditor
          triggerChild={
            <div className="nav-element">
              <Code className="nav-icon" />
            </div>
          }
        />

        <button
          className="nav-element"
          onClick={() => captureElement("diff-view")}
        >
          <Camera className="nav-icon" />
        </button>
        <div className="nav-element">
          <Settings className="nav-icon" />
        </div>
        <div className="nav-separator"></div>
        <Link
          className="nav-element"
          href={"https://github.com/anand-san/beautiful-git-diffs"}
          target="_blank"
        >
          {" "}
          <GithubIcon className="nav-icon" />
        </Link>
        <Link
          className="nav-element"
          href={"https://twitter.com/anandsan_"}
          target="_blank"
        >
          <Twitter className="nav-icon" />
        </Link>
        <div className="nav-separator"></div>
        <Link className="nav-element" href={"/login"}>
          <LogIn className="nav-icon" />
        </Link>
        <button className="nav-element" onClick={handleDarkMode}>
          {resolvedTheme && resolvedTheme === "light" ? (
            <MoonIcon className="nav-icon" />
          ) : (
            <SunIcon className="nav-icon" />
          )}
        </button>
      </div>
    </section>
  );
}
