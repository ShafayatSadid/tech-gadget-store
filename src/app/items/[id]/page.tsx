// src/app/items/[id]/page.tsx
"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { mockItems } from "@/lib/data";
import { ArrowLeft, Star, CheckCircle2 } from "lucide-react";

export default function ItemDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  // আইডি দিয়ে আইটেম খোঁজা
  const item = mockItems.find((i) => i.id === id);

  if (!item) {
    return (
      <div className="flex h-[70vh] flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Item Not Found</h1>
        <button onClick={() => router.push("/items")} className="text-orange-500 hover:underline">
          Back to Items
        </button>
      </div>
    );
  }

  // রিলেটেড আইটেম বের করা (একই ক্যাটাগরির অন্য আইটেম)
  const relatedItems = mockItems
    .filter((i) => i.category === item.category && i.id !== item.id)
    .slice(0, 3);

  return (
    <div className="mx-auto min-h-[80vh] max-w-7xl px-4 py-12 md:px-6">
      {/* Back Button */}
      <button 
        onClick={() => router.push("/items")}
        className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-orange-500 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Items
      </button>

      {/* Main Content */}
      <div className="grid gap-10 md:grid-cols-2">
        {/* Image Section */}
        <div className="overflow-hidden rounded-3xl border bg-muted">
          <img
            src={item.image}
            alt={item.title}
            className="h-full w-full object-cover aspect-square md:aspect-auto"
          />
        </div>

        {/* Details Section */}
        <div className="flex flex-col justify-center">
          <div className="mb-4 flex items-center gap-3">
            <span className="rounded-full bg-orange-500/10 px-3 py-1 text-xs font-semibold text-orange-500 uppercase tracking-wider">
              {item.category}
            </span>
            <div className="flex items-center gap-1 text-sm font-medium">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              {item.rating} Rating
            </div>
          </div>

          <h1 className="mb-4 text-3xl font-bold md:text-5xl">{item.title}</h1>
          <p className="mb-6 text-3xl font-bold text-orange-500">${item.price}</p>
          
          <div className="mb-8">
            <h3 className="mb-2 text-lg font-semibold">Description</h3>
            <p className="text-muted-foreground leading-relaxed">
              {item.fullDescription}
            </p>
          </div>

          {/* Specifications */}
          <div className="mb-8">
            <h3 className="mb-4 text-lg font-semibold">Key Specifications</h3>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {item.specs.map((spec, index) => (
                <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-orange-500" />
                  {spec}
                </li>
              ))}
            </ul>
          </div>

          <button className="w-full rounded-full bg-orange-500 py-4 text-lg font-bold text-white transition-colors hover:bg-orange-600 md:w-auto md:px-12">
            Buy Now
          </button>
        </div>
      </div>

      {/* Related Items */}
      {relatedItems.length > 0 && (
        <div className="mt-24 border-t pt-12">
          <h2 className="mb-8 text-2xl font-bold">Related Items</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedItems.map((related) => (
              <div key={related.id} className="group flex flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition-all hover:shadow-md">
                <div className="aspect-video w-full overflow-hidden bg-muted">
                  <img src={related.image} alt={related.title} className="h-full w-full object-cover transition-transform group-hover:scale-105" />
                </div>
                <div className="p-4">
                  <h3 className="mb-2 font-bold">{related.title}</h3>
                  <p className="mb-4 text-sm text-orange-500 font-semibold">${related.price}</p>
                  <Link href={`/items/${related.id}`} className="text-sm font-medium hover:underline text-orange-500">
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