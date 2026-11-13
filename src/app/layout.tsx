import type { Metadata } from "next";
import { Courier_Prime, IM_Fell_English } from "next/font/google";
import "./globals.css";
import "./keepsake.css";

const fell = IM_Fell_English({
  weight: "400",
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-fell",
});

const courier = Courier_Prime({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-courier",
});

export const metadata: Metadata = {
  title: "For you — keepsake box",
  description: "A private digital keepsake box",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fell.variable} ${courier.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
