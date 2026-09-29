import { Plus_Jakarta_Sans, Kanit } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/app/context/LanguageContext"; 
import VisitorTracker from "@/app/components/VisitorTracker";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const kanit = Kanit({
  variable: "--font-kanit",
  subsets: ["latin", "thai"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "TK MY PORTFOLIO",
  description: "Tanakorn Tipwarreerattana - Front-end Developer Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@300,0&display=swap" rel="stylesheet" />
      </head>
      <body className={`${jakarta.variable} ${kanit.variable} font-sans antialiased`}>
        <LanguageProvider>
          <VisitorTracker />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
