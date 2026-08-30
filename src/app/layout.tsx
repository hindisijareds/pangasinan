import type { Metadata, Viewport } from "next";
import { MotionProvider } from "@/components/motion/MotionProvider/MotionProvider";
import { HeaderNavigation } from "@/components/organisms/HeaderNavigation/HeaderNavigation";
import "./globals.css";
import "../styles/gold.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://example.github.io"),
  title: {
    default: "Pangasinan Heritage Digital Showcase",
    template: "%s | Pangasinan Heritage",
  },
  description:
    "Discover Pangasinan through an accessible, cinematic showcase of its landscapes, landmarks, and living heritage.",
  applicationName: "Pangasinan Heritage Digital Showcase",
  keywords: ["Pangasinan", "heritage", "tourism", "Hundred Islands", "Bolinao"],
  openGraph: {
    title: "Pangasinan Heritage Digital Showcase",
    description: "A visual journey through Pangasinan's landscapes and heritage places.",
    type: "website",
    locale: "en_PH",
  },
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#0c292b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skipLink" href="#main-content">Skip to main content</a>
        <MotionProvider>
          <HeaderNavigation />
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}
