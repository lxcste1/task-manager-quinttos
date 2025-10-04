"use client";

import { v4 as uuidv4 } from "uuid";
import { useAuth } from "@/context/AuthContext";
import { navData } from "./data/navigationData";
import NavigationItem from "./components/NavigationItem";
import Logo from "./components/Logo";
import DesktopNav from "./components/DesktopNav";
import MobileNav from "./components/MobileNav";
import { HydrationGate } from "../common/HydrationGate";

const Fallback = () => (
  <div className="flex items-center justify-between">
    <a href="/" className="flex items-start gap-2">
      <Logo title="Task manager" subtitle="Quinttos challenge" />
    </a>
    <div className="h-6 w-24 rounded bg-muted/60" />
  </div>
);

export default function Header() {
  const { isAuthenticated } = useAuth();

  return (
    <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 py-4">
        <HydrationGate fallback={<Fallback />}>
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-start gap-2">
              <Logo title="Task manager" subtitle="Quinttos challenge" />
            </a>
            {isAuthenticated && (
              <nav className="hidden md:flex items-center gap-6">
                {navData.map((item) => (
                  <NavigationItem key={uuidv4()} {...item} />
                ))}
              </nav>
            )}
            <DesktopNav className="hidden md:flex" />
            <MobileNav className="md:hidden" />
          </div>
        </HydrationGate>
      </div>
    </header>
  );
}
