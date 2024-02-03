import { type ClassValue, clsx } from "clsx";
import { toPng } from "html-to-image";
import Prism from "prismjs";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const captureElement = async (elementId: string) => {
  const node = document.getElementById(elementId) as HTMLElement;
  const dataUrl = await toPng(node);
  const link = document.createElement("a");
  link.download = "diff.png";
  link.href = dataUrl;
  link.click();
};

export const customHighlightSyntax = (str: string) => {
  if (!str) str = "";
  return Prism.highlight(str, Prism.languages.javascript, "javascript");
};
