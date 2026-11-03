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
  metadataBase: new URL("https://my-portfolio-alpha-ten-69.vercel.app"),
  title: {
    default: "ธนกร ทิพย์วารีรัตนะ | Tanakorn Tipwarreerattana - Front-end Developer Portfolio",
    template: "%s | Tanakorn Tipwarreerattana",
  },
  description:
    "พอร์ตโฟลิโอของ นายธนกร ทิพย์วารีรัตนะ (Tanakorn Tipwarreerattana) นักศึกษาคณะเทคโนโลยีสารสนเทศและการสื่อสาร (ICT) มหาวิทยาลัยมหิดล มุ่งเน้นการพัฒนาเว็บไซต์ Front-end Developer, React, Next.js, Tailwind CSS และ UI/UX Design",
  keywords: [
    "ธนกร ทิพย์วารีรัตนะ",
    "Tanakorn Tipwarreerattana",
    "Front-end Developer",
    "Web Developer Portfolio",
    "React Developer",
    "Next.js Developer",
    "ICT Mahidol",
    "คณะ ICT มหาวิทยาลัยมหิดล",
    "นักศึกษาฝึกงาน Front-end",
    "พอร์ตโฟลิโอ",
    "Portfolio",
  ],
  authors: [{ name: "Tanakorn Tipwarreerattana", url: "https://my-portfolio-alpha-ten-69.vercel.app" }],
  creator: "Tanakorn Tipwarreerattana",
  publisher: "Tanakorn Tipwarreerattana",
  openGraph: {
    title: "ธนกร ทิพย์วารีรัตนะ | Tanakorn Tipwarreerattana - Front-end Developer Portfolio",
    description:
      "พอร์ตโฟลิโอผลงานการพัฒนาเว็บไซต์และประสบการณ์ Front-end Web Developer ของ ธนกร ทิพย์วารีรัตนะ (ICT Mahidol)",
    url: "https://my-portfolio-alpha-ten-69.vercel.app",
    siteName: "Tanakorn Portfolio",
    images: [
      {
        url: "/20241009_083423_368.JPG",
        width: 1200,
        height: 630,
        alt: "Tanakorn Tipwarreerattana - Front-end Developer Portfolio",
      },
    ],
    locale: "th_TH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ธนกร ทิพย์วารีรัตนะ | Tanakorn Tipwarreerattana - Front-end Developer",
    description:
      "พอร์ตโฟลิโอผลงานการพัฒนาเว็บไซต์และประสบการณ์ Front-end Developer (React / Next.js)",
    images: ["/20241009_083423_368.JPG"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Tanakorn Tipwarreerattana",
  alternateName: "ธนกร ทิพย์วารีรัตนะ",
  url: "https://my-portfolio-alpha-ten-69.vercel.app",
  image: "https://my-portfolio-alpha-ten-69.vercel.app/20241009_083423_368.JPG",
  jobTitle: "Front-end Developer",
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Mahidol University (มหาวิทยาลัยมหิดล)",
    department: "Faculty of Information and Communication Technology (ICT)",
  },
  sameAs: [
    "https://www.linkedin.com/in/tanakorn-tipwarreerattana-1a6053364",
    "https://github.com/Bankkie16149",
  ],
  knowsAbout: [
    "Front-end Development",
    "React.js",
    "Next.js",
    "JavaScript",
    "Tailwind CSS",
    "HTML5",
    "CSS3",
    "Git",
    "UI/UX Design",
    "Figma",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@300,0&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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
