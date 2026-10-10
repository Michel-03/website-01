import "./globals.css";
import SiteChrome from "../components/layout/SiteChrome";

export const metadata = {
  title: "Byte Analytics | AI for High-Profile Organizations",
  description:
    "Byte Analytics designs, builds, and operates AI, data, and automation systems for leadership teams.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans bg-[#fbfbfe] text-gray-900">
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
