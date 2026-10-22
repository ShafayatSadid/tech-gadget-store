// src/app/about/page.tsx
import { ArrowRight, Box, Truck, Shield } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
    return (
        <div className="mx-auto max-w-4xl px-4 py-24">
            {/* Header */}
            <div className="text-center mb-20">
                <h1 className="text-4xl font-bold tracking-tighter md:text-6xl text-foreground mb-6">
                    Built for the Modern <br className="hidden md:block" /> Tech Enthusiast.
                </h1>
                <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
                    TechGadget was founded with a simple mission: to provide developers, creators, and everyday users with the best premium tech accessories without the hassle.
                </p>
            </div>

            {/* Image Section */}
            <div className="relative w-full aspect-[21/9] rounded-3xl overflow-hidden border border-border bg-muted mb-20">
                <img
                    src="https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=2000&auto=format&fit=crop"
                    alt="Workspace setup"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Features Grid */}
            <div className="grid gap-8 sm:grid-cols-3 mb-24">
                <div className="flex flex-col items-center text-center p-6">
                    <Box className="h-8 w-8 mb-4 text-foreground" />
                    <h3 className="font-bold text-lg mb-2">Curated Selection</h3>
                    <p className="text-sm text-muted-foreground">We only stock products we personally test and love.</p>
                </div>
                <div className="flex flex-col items-center text-center p-6">
                    <Truck className="h-8 w-8 mb-4 text-foreground" />
                    <h3 className="font-bold text-lg mb-2">Fast Delivery</h3>
                    <p className="text-sm text-muted-foreground">Get your gear within 24-48 hours, anywhere in the country.</p>
                </div>
                <div className="flex flex-col items-center text-center p-6">
                    <Shield className="h-8 w-8 mb-4 text-foreground" />
                    <h3 className="font-bold text-lg mb-2">Secure Shopping</h3>
                    <p className="text-sm text-muted-foreground">100% secure checkout powered by Firebase.</p>
                </div>
            </div>

            {/* CTA */}
            <div className="rounded-3xl border border-border bg-muted/30 p-12 text-center">
                <h2 className="text-2xl font-bold mb-4 text-foreground">Ready to upgrade your setup?</h2>
                <Link href="/items" className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
                    Explore Products <ArrowRight className="h-4 w-4" />
                </Link>
            </div>
        </div>
    );
}