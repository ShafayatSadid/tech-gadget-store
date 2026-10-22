// src/app/items/page.tsx
"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { Item } from "@/lib/data";
import { getItems } from "@/lib/storage";
import { Search, Filter, Star } from "lucide-react";

export default function ItemsPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [priceFilter, setPriceFilter] = useState("All");

  useEffect(() => {
    setItems(getItems());
  }, []);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === "All" || item.category === categoryFilter;
      
      let matchesPrice = true;
      if (priceFilter === "Under $500") matchesPrice = item.price < 500;
      else if (priceFilter === "$500 - $1000") matchesPrice = item.price >= 500 && item.price <= 1000;
      else if (priceFilter === "Over $1000") matchesPrice = item.price > 1000;

      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [items, searchQuery, categoryFilter, priceFilter]);

  return (
    <div className="mx-auto min-h-[80vh] max-w-7xl px-4 py-16 md:px-6">
      {/* Header */}
      <div className="mb-12 text-center md:text-left">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl text-foreground">Explore Gadgets</h1>
        <p className="mt-4 text-lg text-muted-foreground">Find the perfect tech for your needs.</p>
      </div>

      {/* Filters */}
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input type="text" placeholder="Search gadgets..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full rounded-lg border border-border bg-background py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-foreground transition-all" />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Filter className="h-4 w-4" /> Filters:
          </div>
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-foreground cursor-pointer text-foreground">
            <option value="All">All Categories</option>
            <option value="Laptop">Laptop</option>
            <option value="Smartphone">Smartphone</option>
            <option value="Tablet">Tablet</option>
            <option value="Audio">Audio</option>
            <option value="Accessories">Accessories</option>
          </select>
          <select value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)} className="rounded-lg border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-foreground cursor-pointer text-foreground">
            <option value="All">All Prices</option>
            <option value="Under $500">Under $500</option>
            <option value="$500 - $1000">$500 - $1000</option>
            <option value="Over $1000">Over $1000</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      {filteredItems.length === 0 ? (
        <div className="flex h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card">
          <p className="text-lg font-medium text-muted-foreground">No items found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => (
            <div key={item.id} className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:shadow-lg hover:shadow-border/50">
              {/* Image */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted p-6 flex items-center justify-center">
                <img src={item.image} alt={item.title} className="h-full w-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute top-4 right-4 rounded-md bg-primary px-2.5 py-1 text-xs font-bold text-primary-foreground shadow-sm">
                  ${item.price}
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-6">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-widest text-accent">{item.category}</span>
                  <div className="flex items-center gap-1 text-sm font-medium text-foreground">
                    <Star className="h-3.5 w-3.5 fill-foreground text-foreground" />
                    {item.rating}
                  </div>
                </div>
                
                <h3 className="mb-2 text-lg font-bold leading-tight text-foreground">{item.title}</h3>
                <p className="mb-6 flex-1 text-sm text-muted-foreground line-clamp-2">
                  {item.shortDescription}
                </p>

                <Link
                  href={`/items/${item.id}`}
                  className="inline-flex w-full items-center justify-center rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-semibold text-foreground transition-all hover:bg-primary hover:text-primary-foreground"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}