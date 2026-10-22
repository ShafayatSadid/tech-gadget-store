// src/components/Navbar.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Menu, X, LogOut, Package, PlusCircle, LayoutDashboard, ShoppingBag } from "lucide-react";
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
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <ShoppingBag className="h-6 w-6 text-orange-500" />
          <span className="text-xl font-bold tracking-tight">TechGadget</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-orange-500",
                pathname === link.href ? "text-orange-500" : "text-muted-foreground"
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Auth Section (Desktop) */}
        <div className="hidden md:flex items-center gap-4">
          {!loading && (
            <>
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-2 rounded-full border bg-muted/50 px-3 py-1.5 hover:bg-muted transition-colors"
                  >
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-500 text-xs text-white">
                      {user.email?.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm font-medium max-w-[100px] truncate">{user.email}</span>
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 rounded-xl border bg-card p-2 shadow-lg animate-in fade-in zoom-in-95">
                      <div className="mb-2 border-b px-2 py-1.5">
                        <p className="text-xs text-muted-foreground">Logged in as</p>
                        <p className="text-sm font-medium truncate">{user.email}</p>
                      </div>
                      <Link href="/items/add" onClick={() => setIsDropdownOpen(false)} className="flex items-center gap-2 rounded-md px-2 py-2 text-sm hover:bg-muted transition-colors">
                        <PlusCircle className="h-4 w-4" /> Add Product
                      </Link>
                      <Link href="/items/manage" onClick={() => setIsDropdownOpen(false)} className="flex items-center gap-2 rounded-md px-2 py-2 text-sm hover:bg-muted transition-colors">
                        <Package className="h-4 w-4" /> Manage Products
                      </Link>
                      <button onClick={handleLogout} className="mt-1 flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors">
                        <LogOut className="h-4 w-4" /> Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link href="/login" className="text-sm font-medium hover:text-orange-500 transition-colors">
                    Login
                  </Link>
                  <Link href="/register" className="rounded-full bg-orange-500 px-5 py-2 text-sm font-medium text-white hover:bg-orange-600 transition-colors">
                    Register
                  </Link>
                </>
              )}
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden border-t bg-background px-4 py-4">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="text-sm font-medium">
                {link.name}
              </Link>
            ))}
            <div className="my-2 border-t pt-4">
              {user ? (
                <>
                  <p className="mb-4 text-sm font-semibold truncate">{user.email}</p>
                  <Link href="/items/add" onClick={() => setIsOpen(false)} className="mb-2 flex items-center gap-2 text-sm"><PlusCircle className="h-4 w-4"/> Add Product</Link>
                  <Link href="/items/manage" onClick={() => setIsOpen(false)} className="mb-4 flex items-center gap-2 text-sm"><Package className="h-4 w-4"/> Manage Products</Link>
                  <button onClick={handleLogout} className="text-sm text-red-500 flex items-center gap-2"><LogOut className="h-4 w-4"/> Logout</button>
                </>
              ) : (
                <div className="flex flex-col gap-3">
                  <Link href="/login" onClick={() => setIsOpen(false)} className="text-sm font-medium">Login</Link>
                  <Link href="/register" onClick={() => setIsOpen(false)} className="rounded-full bg-orange-500 px-5 py-2 text-center text-sm font-medium text-white">Register</Link>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}