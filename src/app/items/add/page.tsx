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

  // Auth Guard
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
        id: crypto.randomUUID(), // ইউনিক আইডি জেনারেট
        title: formData.title,
        shortDescription: formData.shortDescription,
        fullDescription: formData.fullDescription,
        category: formData.category,
        price: Number(formData.price),
        rating: Number(formData.rating),
        image: formData.image || "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80", // ডিফল্ট ছবি
        specs: formData.specs.split(",").map(s => s.trim()).filter(Boolean),
      };

      addItem(newItem);
      toast.success("Item added successfully!");
      router.push("/items");
      setLoading(false);
    }, 800); // লোডিং স্টেট দেখানোর জন্য সামান্য ডিলে
  };

  if (authLoading || !user) return <div className="flex h-[70vh] items-center justify-center"><Loader2 className="animate-spin h-8 w-8 text-orange-500" /></div>;

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <Link href="/items" className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-orange-500">
        <ArrowLeft className="h-4 w-4" /> Back to Items
      </Link>
      <div className="rounded-2xl border bg-card p-6 shadow-sm md:p-8">
        <h1 className="mb-6 text-2xl font-bold">Add New Product</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Title</label>
            <input required type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="mt-1 w-full rounded-md border bg-transparent px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none" placeholder="e.g. iPhone 15 Pro" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Category</label>
              <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="mt-1 w-full rounded-md border bg-transparent px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none">
                <option value="Laptop">Laptop</option>
                <option value="Smartphone">Smartphone</option>
                <option value="Tablet">Tablet</option>
                <option value="Audio">Audio</option>
                <option value="Accessories">Accessories</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Price ($)</label>
              <input required type="number" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} className="mt-1 w-full rounded-md border bg-transparent px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none" placeholder="999" />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Image URL (Optional)</label>
            <input type="url" value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} className="mt-1 w-full rounded-md border bg-transparent px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none" placeholder="https://..." />
          </div>

          <div>
            <label className="text-sm font-medium">Short Description</label>
            <input required type="text" value={formData.shortDescription} onChange={(e) => setFormData({...formData, shortDescription: e.target.value})} className="mt-1 w-full rounded-md border bg-transparent px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none" placeholder="Brief overview..." />
          </div>

          <div>
            <label className="text-sm font-medium">Full Description</label>
            <textarea required rows={4} value={formData.fullDescription} onChange={(e) => setFormData({...formData, fullDescription: e.target.value})} className="mt-1 w-full rounded-md border bg-transparent px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none resize-none" placeholder="Detailed description..." />
          </div>

          <div>
            <label className="text-sm font-medium">Specifications (Comma separated)</label>
            <input type="text" value={formData.specs} onChange={(e) => setFormData({...formData, specs: e.target.value})} className="mt-1 w-full rounded-md border bg-transparent px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none" placeholder="128GB, 8GB RAM, Black" />
          </div>

          <button type="submit" disabled={loading} className="mt-6 flex w-full justify-center items-center gap-2 rounded-full bg-orange-500 py-3 font-semibold text-white transition-colors hover:bg-orange-600 disabled:opacity-50">
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : null}
            {loading ? "Adding..." : "Add Item"}
          </button>
        </form>
      </div>
    </div>
  );
}