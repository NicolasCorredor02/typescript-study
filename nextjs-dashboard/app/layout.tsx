import "@/app/ui/global.css";
import { monserrat } from "@/app/ui/fonts";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${monserrat.className} antialiased`}>
        {children}
        <footer className="py-10 flex justify-center items-center mx-auto">
          Hecho con amor por la gente de Vercel
        </footer>
      </body>
    </html>
  );
}
