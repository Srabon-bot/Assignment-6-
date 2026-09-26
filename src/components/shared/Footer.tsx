import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="mt-auto border-t border-base-300 bg-base-100">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row">
        <Link href="/" className="flex items-center gap-3 font-heading text-lg font-bold tracking-wide uppercase">
          <Image src="/logo.png" alt="FitLog Logo" width={24} height={24} className="h-6 w-6 object-contain" />
          FITLOG
        </Link>
        <p className="text-sm text-base-content/60">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
