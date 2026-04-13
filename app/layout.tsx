import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Inter, Fira_Code } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import Header from '@/components/header';
import Footer from '@/components/footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const firaCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-fira',
});

export const metadata: Metadata = {
  title: 'Aansh Malhotra | Full-Stack Web Developer',
  description: 'Full-stack web developer with expertise in building modern, scalable, and user-friendly web applications using React, Next.js, Node.js, and MongoDB.',
  icons: {
    icon: '/favicon.ico',
  },
  keywords: [
    'Aansh Malhotra',
    'Aansh',
    'Malhotra',
    'Aansh Developer',
    'Aansh Full Stack Developer',
    'Full Stack Developer',
    'MERN Developer',
    'React Developer',
    'Next.js',
    'Node.js',
    'MongoDB',
    'Frontend Developer',
    'Backend Developer',
    'Web Developer',
    'Full Stack Web Developer India',
    'React Developer India',
    'MERN Developer Indian'
  ],
  authors: [{ name: 'Aansh Malhotra' }],
  creator: 'Aansh Malhotra',
  publisher: 'Aansh Malhotra',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    title: 'Aansh Malhotra | Full-Stack Web Developer',
    description: 'Full-stack web developer specializing in React, Next.js, Node.js, and MongoDB.',
    siteName: 'Aansh Portfolio',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Aansh Malhotra - Full-Stack Developer',
      },
    ],
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
      </head>
      <body className={`${inter.variable} ${firaCode.variable} font-sans bg-background text-foreground min-h-screen`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={true}
          storageKey="theme"
        >
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}