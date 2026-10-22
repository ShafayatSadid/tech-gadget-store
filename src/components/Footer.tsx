// src/components/Footer.tsx
import Link from "next/link";
import { Triangle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-white dark:bg-black">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-8 md:grid-cols-4">
          
          {/* Brand */}
          <div className="flex flex-col gap-4 md:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <Triangle className="h-6 w-6 fill-foreground text-foreground" />
              <span className="text-lg font-bold tracking-tight text-foreground">TechGadget</span>
            </Link>
            <p className="max-w-xs text-sm text-muted-foreground leading-relaxed">
              The best place to find premium tech gadgets. Built for performance and design.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold text-foreground">Explore</h4>
            <Link href="/items" className="text-sm text-muted-foreground hover:text-foreground transition-colors">All Products</Link>
            <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About Us</Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
          </div>

          {/* Legal */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold text-foreground">Legal</h4>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} TechGadget. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Designed & Built by Shafayat
          </p>
        </div>
      </div>
    </footer>
  );
}