import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { ColorSchemeScript } from "@mantine/core";
import "@mantine/core/styles.css";
import "./globals.css";
import AppContext from "@/context/app-context";

const roboto = Roboto({ weight: ["400", "700"], subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://gd.sandilya.dev"),
  title: {
    default: "Beautiful Git Diffs",
    template: "%s | Beautiful Git Diffs",
  },
  description: "Create beautiful git-diff screenshots from code",
  openGraph: {
    title: "Create Beautiful Git Diff",
    description: "Create beautiful git-diff screenshots from code",
    url: "https://gd.sandilya.dev",
    siteName: "Beautiful Git Diff",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "Create Beautiful Git Diff",
    card: "summary_large_image",
  },
  verification: {
    google: "eZSdmzAXlLkKhNJzfgwDqWORghxnJ8qR9_CHdAh5-xw",
    yandex: "14d2e73487fa6c71",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript defaultColorScheme="dark" />
      </head>
      <body className={roboto.className}>
        <AppContext>{children}</AppContext>
        <Analytics />
      </body>
    </html>
  );
}
