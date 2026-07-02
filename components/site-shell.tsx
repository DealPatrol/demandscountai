import Link from "next/link";
import type { ReactNode } from "react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/search/new", label: "New Search" },
];

type SiteShellProps = {
  active?: string;
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
  actions?: ReactNode;
};

export function SiteShell({
  active,
  eyebrow,
  title,
  description,
  children,
  actions,
}: SiteShellProps) {
  return (
    <div className="min-h-screen">
      <header className="border-b border-white/10">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-400/15 text-sm font-semibold text-cyan-300">
              DS
            </span>
            <div>
              <p className="text-sm font-semibold text-white">DemandScout AI</p>
              <p className="text-xs text-slate-400">
                Demand intelligence for SaaS builders
              </p>
            </div>
          </Link>
          <nav className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1 md:flex">
            {navItems.map((item) => {
              const selected = active === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-full px-4 py-2 text-sm transition ${
                    selected
                      ? "bg-white text-slate-950"
                      : "text-slate-300 hover:bg-white/8 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-6 pb-20 pt-10 lg:px-8">
        <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.28em] text-cyan-300/80">
              {eyebrow}
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              {title}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
              {description}
            </p>
          </div>
          {actions ? <div className="shrink-0">{actions}</div> : null}
        </div>

        {children}
      </main>
    </div>
  );
}
