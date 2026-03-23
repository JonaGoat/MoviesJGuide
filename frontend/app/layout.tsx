import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GuideMovies | Guia MCU",
  description: "Guia interactiva del MCU con timeline, filtros y playlists."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <div className="bg" id="bg" />
        {children}
      </body>
    </html>
  );
}
