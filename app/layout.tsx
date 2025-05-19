import { ThemeSwitcher } from '@/components/theme-switcher';
import { Geist } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Tower of Hanoi',
  description: 'A simulation of the Tower of Hanoi game',
};

const geistSans = Geist({
  display: 'swap',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col h-screen">
            <nav className="flex justify-between p-5 items-center">
              <div>Tower of Hanoi Simulation</div>
              <ThemeSwitcher />
            </nav>
            <main className="w-full h-full flex flex-col items-center container mx-auto px-5 py-5 overflow-hidden">
              {children}
            </main>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
