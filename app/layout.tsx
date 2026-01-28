import "./globals.css";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export const metadata = {
  title: "YourCompany AI | Empowering Businesses with Intelligence",
  description: "Official website for YourCompany AI solutions and consultancy.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans bg-white text-gray-900">
        <Navbar /> {/* Always at top */}
        <main className="min-h-screen">{children}</main> {/* Page content */}
        <Footer /> {/* Always at bottom */}
      </body>
    </html>
  );
}
