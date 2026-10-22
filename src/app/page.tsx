// src/app/page.tsx
"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck, Zap, Sparkles, Star } from "lucide-react";
import { mockItems } from "@/lib/data";

export default function Home() {
  const featuredItems = mockItems.slice(0, 3);

  return (
    <div className="flex flex-col">
      {/* 1. Hero Section */}
      <section className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden px-4 text-center">
        <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
          <div className="h-[300px] w-[300px] md:h-[500px] md:w-[500px] rounded-full bg-accent/20 blur-[100px] md:blur-[150px] opacity-50" />
        </div>

        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium mb-8">
          <Sparkles className="h-3 w-3 text-accent" />
          <span>New arrivals just dropped</span>
        </div>

        <h1 className="max-w-4xl text-5xl font-bold tracking-tighter md:text-7xl lg:text-8xl text-foreground mb-6">
          Discover the Future <br className="hidden md:block" /> of Tech.
        </h1>
        <p className="max-w-2xl text-lg text-muted-foreground mb-10 md:text-xl">
          Premium gadgets for developers, creators, and everyday power users. 
          Build your perfect setup with TechGadget.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link href="/items" className="flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105">
            Shop Now <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/about" className="rounded-full border border-border bg-background px-8 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted">
            Learn More
          </Link>
        </div>
      </section>

      {/* 2. Features Section */}
      <section className="border-y border-border bg-muted/30 py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-background border border-border shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/5 text-primary">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-bold">Lightning Fast</h3>
              <p className="text-sm text-muted-foreground">Get your gadgets delivered within 24 hours.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-background border border-border shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/5 text-primary">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-bold">1 Year Warranty</h3>
              <p className="text-sm text-muted-foreground">All products come with official brand warranty.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-background border border-border shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/5 text-primary">
                <Star className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-bold">Premium Quality</h3>
              <p className="text-sm text-muted-foreground">Handpicked gadgets that meet our strict standards.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Items Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Featured Gadgets</h2>
              <p className="mt-2 text-muted-foreground">Our most popular tech right now.</p>
            </div>
            <Link href="/items" className="text-sm font-semibold text-accent hover:underline flex items-center gap-1">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredItems.map((item) => (
              <div key={item.id} className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:shadow-lg">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted p-6 flex items-center justify-center">
                  <img src={item.image} alt={item.title} className="h-full w-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <span className="text-xs font-bold uppercase tracking-widest text-accent mb-2">{item.category}</span>
                  <h3 className="text-lg font-bold text-foreground mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-1">{item.shortDescription}</p>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-lg font-bold text-foreground">${item.price}</span>
                    <Link href={`/items/${item.id}`} className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-semibold hover:bg-primary hover:text-primary-foreground transition-colors">
                      View
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Testimonials Section */}
      <section className="border-t border-border bg-muted/10 py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Loved by Professionals</h2>
            <p className="mt-4 text-muted-foreground">Hear what our customers have to say.</p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-2xl border border-border bg-card p-8 shadow-sm">
                <div className="flex gap-1 mb-4">
                  {[1,2,3,4,5].map(s => <Star key={s} className="h-4 w-4 fill-foreground text-foreground" />)}
                </div>
                <p className="text-muted-foreground leading-relaxed mb-6 italic">
                  "The quality of the gadgets is unmatched. The delivery was super fast, and the setup looks amazing on my desk."
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-foreground">U</div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">User {i}</h4>
                    <p className="text-xs text-muted-foreground">Software Engineer</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. NEW: CTA Banner Section (4th Relevant Section) */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-20 text-center shadow-2xl md:px-12">
            <div className="relative z-10">
              <h2 className="text-3xl font-bold tracking-tight text-primary-foreground md:text-5xl mb-6">
                Ready to upgrade your setup?
              </h2>
              <p className="mx-auto max-w-2xl text-primary-foreground/80 mb-10 text-lg">
                Join thousands of professionals who trust TechGadget for their daily tech needs. 
                Get the best deals today.
              </p>
              <Link href="/items" className="inline-flex items-center gap-2 rounded-full bg-background px-8 py-3.5 text-sm font-semibold text-foreground transition-transform hover:scale-105">
                Browse Collection <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}