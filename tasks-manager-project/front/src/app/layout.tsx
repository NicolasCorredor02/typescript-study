import type { Metadata } from "next";
import "./globals.css";
import { montserrat } from "@/app/fonts";

export const metadata: Metadata = {
  title: "Tasks Manager with NextJS",
  description: "Web application to manage tasks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} antialiased`}>
        <main className="container mx-auto flex flex-col justify-center items-center">
          {children}
        </main>
      </body>
    </html>
  );
}
