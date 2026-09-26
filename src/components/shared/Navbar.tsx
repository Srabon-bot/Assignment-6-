"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useContext } from "react";
import { Menu } from "lucide-react";
import { PlanContext } from "../../context/PlanContext";

const Navbar = () => {
  const pathname = usePathname();
  const { plan, saved } = useContext(PlanContext);

  const getLinkClass = (path: string) => {
    return pathname === path 
      ? "bg-primary/10 text-primary font-medium rounded-full px-5 py-2" 
      : "text-base-content/70 hover:text-base-content font-medium px-5 py-2 transition-colors";
  };

  const navLinks = (
    <>
      <li role="none">
        <Link href="/" className={getLinkClass("/")}>
          Workouts
        </Link>
      </li>
      <li role="none">
        <Link href="/my-plan" className={getLinkClass("/my-plan")}>
          My Plan
        </Link>
      </li>
    </>
  );

  return (
    <header className="z-40 bg-base-100 py-2">
      <nav className="navbar mx-auto max-w-[1200px] px-4">
        <div className="navbar-start gap-2">
          <div className="dropdown lg:hidden">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-square" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </div>
            <ul
              tabIndex={0}
              role="menu"
              className="menu dropdown-content menu-sm z-50 mt-3 w-52 rounded-2xl border border-base-300 bg-base-200 p-2"
            >
              {navLinks}
            </ul>
          </div>
          
          <Link href="/" className="flex items-center gap-3 font-heading text-xl font-bold tracking-wide uppercase">
            <Image src="/logo.png" alt="FitLog Logo" width={24} height={24} className="h-6 w-6 object-contain" />
            FITLOG
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="flex items-center gap-2" role="menu">
            {navLinks}
          </ul>
        </div>

        <div className="navbar-end gap-5 text-sm font-medium">
          <Link href="/my-plan" className="flex items-center gap-2 text-base-content/80 hover:text-white transition-colors">
            Plan 
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-black">
              {plan.length}
            </span>
          </Link>
          <Link href="/my-plan" className="flex items-center gap-2 text-base-content/80 hover:text-white transition-colors">
            Saved 
            <span className="flex h-6 w-6 items-center justify-center rounded-full border border-base-content/30 text-xs">
              {saved.length}
            </span>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
