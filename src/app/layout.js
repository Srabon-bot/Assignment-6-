import { Inter, Oswald } from "next/font/google";
import { Toaster } from "react-hot-toast";
import PlanProvider from "../context/PlanContext";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

export const metadata = {
  title: "FitLog — Workout Library",
  description: "Browse gym workouts, build today's plan, and track weekly calories with FitLog.",
};

const RootLayout = ({ children }) => {
  return (
    <html
      lang="en"
      data-theme="fitlog"
      className={`${inter.variable} ${oswald.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-base-100 font-sans">
        <PlanProvider>
          {children}
          <Toaster position="top-right" />
        </PlanProvider>
      </body>
    </html>
  );
};

export default RootLayout;
