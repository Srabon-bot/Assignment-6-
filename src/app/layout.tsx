import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import { Toaster } from "react-hot-toast";
import PlanProvider from "../context/PlanContext";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FitLog — Workout Library",
  description: "Browse gym workouts, build today's plan, and track weekly calories with FitLog.",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html
      lang="en"
      data-theme="fitlog"
      className={`${inter.variable} ${oswald.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-base-100 font-sans">
        <PlanProvider>
          <Navbar />
          <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
            {children}
          </main>
          <Footer />
          <Toaster position="top-right" />
        </PlanProvider>
      </body>
    </html>
  );
};

export default RootLayout;
