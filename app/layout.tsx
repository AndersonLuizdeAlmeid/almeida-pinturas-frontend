import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/app/components/components/ui/sonner";

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        {children}
        <Toaster position="top-right" richColors /> {}
      </body>
    </html>
  );
}
