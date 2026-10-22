// src/components/Footer.tsx
import Link from "next/link";
import { Triangle } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa"; // react-icons থেকে ব্র্যান্ড আইকন
import { cacheLife } from "next/cache";

async function getCurrentYear() {
  "use cache";
  cacheLife("max");
  return new Date().getFullYear();
}

export default async function Footer() {
  const year = await getCurrentYear();

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-8 md:grid-cols-4">
          
          <div className="flex flex-col gap-4 md:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <Triangle className="h-6 w-6 fill-foreground text-foreground" />
              <span className="text-lg font-bold tracking-tight text-foreground">TechGadget</span>
            </Link>
            <p className="max-w-xs text-sm text-muted-foreground leading-relaxed">
              The best place to find premium tech gadgets. Built for performance and design.
            </p>
            <div className="flex gap-4 mt-2">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors"><FaGithub className="h-5 w-5" /></a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors"><FaLinkedin className="h-5 w-5" /></a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors"><FaTwitter className="h-5 w-5" /></a>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold text-foreground">Explore</h4>
            <Link href="/items" className="text-sm text-muted-foreground hover:text-foreground transition-colors">All Products</Link>
            <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About Us</Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold text-foreground">Legal</h4>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">© {year} TechGadget. All rights reserved.</p>
          <p className="text-sm text-muted-foreground">Designed & Built by Shafayat</p>
        </div>
      </div>
    </footer>
  );
}