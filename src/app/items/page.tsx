// src/app/items/page.tsx
"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { Item } from "@/lib/data";
import { getItems } from "@/lib/storage"; // নতুন ইমপোর্ট
import { Search, Filter, Star } from "lucide-react";

export default function ItemsPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [priceFilter, setPriceFilter] = useState("All");

  // পেজ লোড হলে ডেটা আনা
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
    <div className="mx-auto min-h-[80vh] max-w-7xl px-4 py-12 md:px-6">
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Explore Gadgets</h1>
        <p className="mt-2 text-muted-foreground">Find the perfect tech for your needs.</p>
      </div>

      <div className="mb-8 flex flex-col gap-4 rounded-2xl border bg-card p-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input type="text" placeholder="Search gadgets..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full rounded-full border bg-transparent py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500" />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Filter className="h-4 w-4" /> Filters:
          </div>
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="rounded-full border bg-transparent px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500">
            <option value="All">All Categories</option>
            <option value="Laptop">Laptop</option>
            <option value="Smartphone">Smartphone</option>
            <option value="Tablet">Tablet</option>
            <option value="Audio">Audio</option>
            <option value="Accessories">Accessories</option>
          </select>
          <select value={priceFilter} onChange={(e) => setPriceFilter(e.target.value)} className="rounded-full border bg-transparent px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500">
            <option value="All">All Prices</option>
            <option value="Under $500">Under $500</option>
            <option value="$500 - $1000">$500 - $1000</option>
            <option value="Over $1000">Over $1000</option>
          </select>
        </div>
      </div>

      {filteredItems.length === 0 ? (
        <div className="flex h-64 flex-col items-center justify-center rounded-2xl border border-dashed bg-muted/30">
          <p className="text-lg font-medium text-muted-foreground">No items found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => (
            <div key={item.id} className="group flex flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition-all hover:shadow-md hover:border-orange-500/50">
              <div className="relative aspect-video w-full overflow-hidden bg-muted">
                <img src={item.image} alt={item.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute top-3 right-3 rounded-full bg-background/90 px-2.5 py-1 text-xs font-bold shadow-sm backdrop-blur-sm">${item.price}</div>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-orange-500">{item.category}</span>
                  <div className="flex items-center gap-1 text-sm font-medium"><Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />{item.rating}</div>
                </div>
                <h3 className="mb-2 text-lg font-bold leading-tight">{item.title}</h3>
                <p className="mb-4 flex-1 text-sm text-muted-foreground line-clamp-2">{item.shortDescription}</p>
                <Link href={`/items/${item.id}`} className="inline-flex w-full items-center justify-center rounded-full bg-orange-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-orange-600">View Details</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}