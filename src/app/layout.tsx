import type { Metadata } from "next";
import "./globals.css";
import { portfolioData } from "@/data/portfolio";
import BackgroundMusic from "@/components/BackgroundMusic";

export const metadata: Metadata = {
  metadataBase: new URL("https://karthavya.vercel.app"),
  title: "Karthavya S | AI & Data Systems Engineer",
  description:
    "Portfolio of Karthavya S — Curious mind. Creative coder. AI enthusiast. B.E. Computer Science student at REC Chennai exploring AI/ML, logic engines, and data analytics.",
  keywords: [
    "Karthavya S",
    "Karthavya",
    "Portfolio",
    "AI Engineer",
    "Machine Learning",
    "Computer Science",
    "Rajalakshmi Engineering College",
    "Unscramble",
    "FloodGuard",
    "Logic Courtroom",
    "APIx",
    "Data Analytics",
  ],
  authors: [{ name: "Karthavya S", url: "https://github.com/KarthavyaS" }],
  creator: "Karthavya S",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://karthavya.vercel.app",
    title: "Karthavya S | AI & Data Systems Engineer",
    description:
      "Curious mind. Creative coder. AI enthusiast. Portfolio of Karthavya S showcasing major projects: Unscramble, APIx, Logic Courtroom, and FloodGuard.",
    siteName: "Karthavya S Portfolio",
    images: [
      {
        url: "/avatar.png",
        width: 800,
        height: 800,
        alt: "Karthavya S - 3D Avatar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Karthavya S | AI & Data Systems Engineer",
    description:
      "Curious mind. Creative coder. AI enthusiast. Exploring AI/ML, logic engines, and data analytics systems.",
    images: ["/avatar.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: portfolioData.personal.name,
    alternateName: portfolioData.personal.nickname,
    jobTitle: "AI & Data Systems Engineer",
    description: portfolioData.personal.introText,
    url: "https://github.com/KarthavyaS",
    sameAs: [
      portfolioData.personal.github,
      portfolioData.personal.linkedin,
    ],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Rajalakshmi Engineering College",
    },
    knowsAbout: [
      "Machine Learning",
      "Natural Language Processing",
      "Symbolic Logic",
      "Python",
      "Java",
      "TypeScript",
      "Next.js",
      "Data Analytics",
    ],
  };

  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[#070a24] text-slate-100 selection:bg-purple-600 selection:text-white antialiased flex flex-col">
        {children}
        <BackgroundMusic />
      </body>
    </html>
  );
}
