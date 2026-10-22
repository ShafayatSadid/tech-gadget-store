// src/components/Navbar.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Menu, X, LogOut, Package, PlusCircle, Triangle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const { user, logout, loading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Items", href: "/items" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const handleLogout = async () => {
    await logout();
    setIsDropdownOpen(false);
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <Triangle className="h-6 w-6 fill-foreground text-foreground" />
          <span className="text-lg font-bold tracking-tight text-foreground">TechGadget</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-foreground",
                pathname === link.href ? "text-foreground" : "text-muted-foreground"
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Auth Section */}
        <div className="hidden md:flex items-center gap-4">
          {!loading && (
            <>
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 hover:bg-muted transition-colors"
                  >
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-foreground text-xs text-background">
                      {user.email?.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm font-medium max-w-[100px] truncate text-foreground">{user.email}</span>
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 rounded-xl border border-border bg-card p-1.5 shadow-lg animate-in fade-in zoom-in-95">
                      <div className="mb-1 border-b border-border px-2 py-2">
                        <p className="text-xs text-muted-foreground">Signed in as</p>
                        <p className="text-sm font-medium truncate text-foreground">{user.email}</p>
                      </div>
                      <Link href="/items/add" onClick={() => setIsDropdownOpen(false)} className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                        <PlusCircle className="h-4 w-4" /> Add Product
                      </Link>
                      <Link href="/items/manage" onClick={() => setIsDropdownOpen(false)} className="flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                        <Package className="h-4 w-4" /> Manage Products
                      </Link>
                      <div className="my-1 border-t border-border" />
                      <button onClick={handleLogout} className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm text-red-500 hover:bg-red-500/10 transition-colors">
                        <LogOut className="h-4 w-4" /> Sign out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                    Log in
                  </Link>
                  <Link href="/register" className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
                    Sign up
                  </Link>
                </>
              )}
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden p-2 text-foreground" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden border-t border-border bg-background px-4 py-4 absolute w-full shadow-lg">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="text-sm font-medium p-2 rounded-md hover:bg-muted">
                {link.name}
              </Link>
            ))}
            <div className="my-2 border-t border-border pt-4">
              {user ? (
                <>
                  <p className="mb-4 px-2 text-sm font-semibold truncate text-foreground">{user.email}</p>
                  <Link href="/items/add" onClick={() => setIsOpen(false)} className="mb-1 flex items-center gap-2 p-2 text-sm rounded-md hover:bg-muted"><PlusCircle className="h-4 w-4"/> Add Product</Link>
                  <Link href="/items/manage" onClick={() => setIsOpen(false)} className="mb-4 flex items-center gap-2 p-2 text-sm rounded-md hover:bg-muted"><Package className="h-4 w-4"/> Manage Products</Link>
                  <button onClick={handleLogout} className="w-full text-left p-2 text-sm text-red-500 flex items-center gap-2 rounded-md hover:bg-red-500/10"><LogOut className="h-4 w-4"/> Sign out</button>
                </>
              ) : (
                <div className="flex flex-col gap-3 px-2">
                  <Link href="/login" onClick={() => setIsOpen(false)} className="text-sm font-medium">Log in</Link>
                  <Link href="/register" onClick={() => setIsOpen(false)} className="rounded-full bg-primary px-5 py-2 text-center text-sm font-medium text-primary-foreground">Sign up</Link>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}