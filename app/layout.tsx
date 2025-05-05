import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./context/ThemeContext";
import Header from "./components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fridge Assistant | AI-Powered Food Analysis",
  description:
    "Upload a photo of your fridge and get detailed nutritional information about each ingredient using AI vision technology. Discover recipes, nutrition facts, and storage tips for the food you already have.",
  keywords: [
    "food analysis",
    "AI vision",
    "fridge assistant",
    "nutrition information",
    "food ingredients",
    "recipe suggestions",
  ],
  authors: [{ name: "Fridge Assistant Team" }],
  openGraph: {
    title: "Fridge Assistant | AI-Powered Food Analysis",
    description: "Discover what's in your fridge with AI vision technology",
    images: [
      {
        url: "/fridge-app.png",
        width: 990,
        height: 622,
        alt: "Fridge Assistant App",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fridge Assistant | AI Vision Food Analysis",
    description: "AI-powered food detection and nutrition analysis",
    images: ["/fridge-app.png"],
  },
  viewport: "width=device-width, initial-scale=1",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f5f5" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
