// src/app/items/[id]/page.tsx
"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { mockItems } from "@/lib/data";
import { ArrowLeft, Star, CheckCircle2, Calendar } from "lucide-react";

export default function ItemDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const item = mockItems.find((i) => i.id === id);

  if (!item) {
    return (
      <div className="flex h-[70vh] flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4 text-foreground">Item Not Found</h1>
        <button onClick={() => router.push("/items")} className="text-accent hover:underline">
          Back to Items
        </button>
      </div>
    );
  }

  const relatedItems = mockItems
    .filter((i) => i.category === item.category && i.id !== item.id)
    .slice(0, 3);

  return (
    <div className="mx-auto min-h-[80vh] max-w-7xl px-4 py-16 md:px-6">
      <button onClick={() => router.push("/items")} className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to Items
      </button>

      <div className="grid gap-12 md:grid-cols-2">
        <div className="overflow-hidden rounded-3xl border border-border bg-muted p-8 flex items-center justify-center">
          <img src={item.image} alt={item.title} className="h-full w-full max-w-md object-contain rounded-xl" />
        </div>

        <div className="flex flex-col justify-center">
          <div className="mb-6 flex items-center gap-3">
            <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-bold text-accent uppercase tracking-wider">
              {item.category}
            </span>
            <div className="flex items-center gap-1 text-sm font-medium text-foreground">
              <Star className="h-4 w-4 fill-foreground text-foreground" />
              {item.rating} Rating
            </div>
          </div>

          <h1 className="mb-4 text-4xl font-bold md:text-5xl text-foreground leading-tight">{item.title}</h1>
          
          {/* Price and Date Added */}
          <div className="mb-8 flex items-center justify-between border-b border-border pb-6">
            <p className="text-3xl font-bold text-foreground">${item.price}</p>
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" /> Added: Oct 2026
            </p>
          </div>
          
          <div className="mb-10">
            <h3 className="mb-3 text-lg font-semibold text-foreground">Description</h3>
            <p className="text-muted-foreground leading-relaxed">
              {item.fullDescription}
            </p>
          </div>

          <div className="mb-10">
            <h3 className="mb-4 text-lg font-semibold text-foreground">Key Specifications</h3>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {item.specs.map((spec, index) => (
                <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-foreground" />
                  {spec}
                </li>
              ))}
            </ul>
          </div>

          <button className="w-full rounded-full bg-primary py-4 text-lg font-bold text-primary-foreground transition-colors hover:bg-primary/90 md:w-auto md:px-16">
            Buy Now
          </button>
        </div>
      </div>

      {relatedItems.length > 0 && (
        <div className="mt-24 border-t border-border pt-16">
          <h2 className="mb-8 text-2xl font-bold text-foreground">Related Items</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedItems.map((related) => (
              <div key={related.id} className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:shadow-md">
                <div className="aspect-video w-full overflow-hidden bg-muted p-4 flex items-center justify-center">
                  <img src={related.image} alt={related.title} className="h-full w-full object-contain transition-transform group-hover:scale-105" />
                </div>
                <div className="p-5">
                  <h3 className="mb-2 font-bold text-foreground truncate">{related.title}</h3>
                  <p className="mb-4 text-sm text-foreground font-semibold">${related.price}</p>
                  <Link href={`/items/${related.id}`} className="text-sm font-medium text-accent hover:underline">
                    View Details &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}