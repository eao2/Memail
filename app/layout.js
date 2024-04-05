import { Inter } from "next/font/google";
import "./globals.css";
import SigninButton from "@/components/SigninButton";
import Providers from '@/components/Providers';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Memail",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
