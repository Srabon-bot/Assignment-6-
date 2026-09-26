"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import { Dumbbell, Menu } from "lucide-react";
import { PlanContext } from "../../context/PlanContext";

const Navbar = () => {
  const pathname = usePathname();
  const { plan, saved } = useContext(PlanContext);

  const getLinkClass = (path: string) => {
    return pathname === path ? "bg-base-200 font-semibold text-accent" : "";
  };

  const navLinks = (
    <>
      <li role="menuitem">
        <Link href="/" className={getLinkClass("/")}>
          Workouts
        </Link>
      </li>
      <li role="menuitem">
        <Link href="/my-plan" className={getLinkClass("/my-plan")}>
          My Plan
        </Link>
      </li>
    </>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-base-300 bg-base-100/95 backdrop-blur">
      <nav className="navbar mx-auto max-w-6xl px-4">
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
          
          <Link href="/" className="flex items-center gap-2 font-heading text-xl tracking-wide">
            <Dumbbell className="h-6 w-6 text-primary" />
            FitLog
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-1 px-1" role="menu">
            {navLinks}
          </ul>
        </div>

        <div className="navbar-end gap-2">
          <Link href="/my-plan" className="btn btn-ghost btn-sm gap-2">
            Plan <span className="badge badge-accent badge-sm">{plan.length}</span>
          </Link>
          <Link href="/my-plan" className="btn btn-ghost btn-sm gap-2">
            Saved <span className="badge badge-outline badge-sm">{saved.length}</span>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
