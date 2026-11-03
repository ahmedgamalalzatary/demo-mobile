import type { Metadata, Viewport } from "next";
import { Alexandria } from "next/font/google";
import { CartProvider } from "@/components/CartProvider";
import "./globals.css";

const alexandria = Alexandria({
  variable: "--font-alexandria",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "روشتة صيدليات",
  description: "صحتك تهمنا — فيتامينات، عناية بالبشرة والشعر وكل احتياجات الصيدلية",
  icons: { icon: "/logo-mark.png", apple: "/logo-mark.png" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#f6f8f2",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ar" dir="rtl" className={`${alexandria.variable} antialiased`}>
      <body>
        <CartProvider>
          <div className="relative mx-auto min-h-dvh w-full max-w-[440px] overflow-x-hidden bg-mist">
            {children}
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
