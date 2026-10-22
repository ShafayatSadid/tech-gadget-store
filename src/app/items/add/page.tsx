// src/app/items/add/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { addItem } from "@/lib/storage";
import { toast } from "sonner";
import { Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AddItemPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    fullDescription: "",
    category: "Laptop",
    price: "",
    rating: "4.5",
    image: "",
    specs: "",
  });

  useEffect(() => {
    if (!authLoading && !user) {
      toast.error("You must be logged in to add an item");
      router.push("/login");
    }
  }, [user, authLoading, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const newItem = {
        id: crypto.randomUUID(),
        title: formData.title,
        shortDescription: formData.shortDescription,
        fullDescription: formData.fullDescription,
        category: formData.category,
        price: Number(formData.price),
        rating: Number(formData.rating),
        image: formData.image || "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80",
        specs: formData.specs.split(",").map(s => s.trim()).filter(Boolean),
      };

      addItem(newItem);
      toast.success("Item added successfully!");
      router.push("/items");
      setLoading(false);
    }, 800);
  };

  if (authLoading || !user) return <div className="flex h-[70vh] items-center justify-center"><Loader2 className="animate-spin h-8 w-8 text-foreground" /></div>;

  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <Link href="/items" className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back to Items
      </Link>
      <div className="rounded-3xl border border-border bg-card p-6 shadow-sm md:p-10">
        <h1 className="mb-8 text-3xl font-bold text-foreground">Add New Product</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-sm font-medium text-foreground">Title</label>
            <input required type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:ring-2 focus:ring-foreground focus:outline-none transition-all" placeholder="e.g. iPhone 15 Pro" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground">Category</label>
              <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:ring-2 focus:ring-foreground focus:outline-none cursor-pointer">
                <option value="Laptop">Laptop</option>
                <option value="Smartphone">Smartphone</option>
                <option value="Tablet">Tablet</option>
                <option value="Audio">Audio</option>
                <option value="Accessories">Accessories</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Price ($)</label>
              <input required type="number" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:ring-2 focus:ring-foreground focus:outline-none" placeholder="999" />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground">Image URL (Optional)</label>
            <input type="url" value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:ring-2 focus:ring-foreground focus:outline-none" placeholder="https://..." />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground">Short Description</label>
            <input required type="text" value={formData.shortDescription} onChange={(e) => setFormData({...formData, shortDescription: e.target.value})} className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:ring-2 focus:ring-foreground focus:outline-none" placeholder="Brief overview..." />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground">Full Description</label>
            <textarea required rows={4} value={formData.fullDescription} onChange={(e) => setFormData({...formData, fullDescription: e.target.value})} className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:ring-2 focus:ring-foreground focus:outline-none resize-none" placeholder="Detailed description..." />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground">Specifications (Comma separated)</label>
            <input type="text" value={formData.specs} onChange={(e) => setFormData({...formData, specs: e.target.value})} className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:ring-2 focus:ring-foreground focus:outline-none" placeholder="128GB, 8GB RAM, Black" />
          </div>

          <button type="submit" disabled={loading} className="mt-8 flex w-full justify-center items-center gap-2 rounded-full bg-primary py-4 font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50">
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : null}
            {loading ? "Adding..." : "Add Item"}
          </button>
        </form>
      </div>
    </div>
  );
}