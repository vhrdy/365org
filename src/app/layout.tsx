import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  metadataBase: new URL("https://365art.org"),
  title: {
    default: "365 COINS – On-Chain Performance Art",
    template: "%s | 365 COINS",
  },
  description:
    "365 COINS is a year-long on-chain performance by an artist deploying one token per day on Pump.fun. A reflection on creation, decay, and the permanence of digital memory.",
  openGraph: {
    title: "365 COINS – A Year of On-Chain Creation",
    description:
      "An artistic performance unfolding over 365 days: one token per day, same hour, same ritual. Each coin lives, fades, yet remains forever on-chain.",
    url: "https://365art.org",
    siteName: "365 COINS",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://365art.org/assets/banner.png",
        width: 1200,
        height: 630,
        alt: "365 COINS – A Year of On-Chain Performance",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "365 COINS – On-Chain Performance Art",
    description:
      "A year-long blockchain performance: one coin every day, a ritual of creation and oblivion. The first coin, $365, anchors the entire series.",
    images: ["https://365art.org/assets/banner.png"],
    creator: "@yourhandle", // replace with your real Twitter handle
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}
      >
        {children}
      </body>
    </html>
  );
}
