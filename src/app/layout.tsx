import { Header } from "@/features/layout/Header";
import clsx from "clsx";
import { getSession } from "next-auth/react";
import { Inter } from "next/font/google";
import Provider from "./context/client-provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  return (
    <html lang="en" className="h-full">
      <body className={clsx(inter.className, "bg-background h-full")}>
        <Provider session={session}>
          <div className="flex flex-col h-full">
            <Header />
            <div className="flex-1 py-12">{children}</div>
          </div>
        </Provider>
      </body>
    </html>
  );
}
