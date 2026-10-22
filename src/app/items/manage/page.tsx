// src/app/items/manage/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Item } from "@/lib/data";
import { getItems, deleteItem } from "@/lib/storage";
import { toast } from "sonner";
import { Loader2, Eye, Trash2 } from "lucide-react";

export default function ManageItemsPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      toast.error("You must be logged in to manage items");
      router.push("/login");
    } else if (user) {
      setItems(getItems());
      setLoading(false);
    }
  }, [user, authLoading, router]);

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this item?")) {
      deleteItem(id);
      setItems(getItems());
      toast.success("Item deleted successfully");
    }
  };

  if (authLoading || loading) return <div className="flex h-[70vh] items-center justify-center"><Loader2 className="animate-spin h-8 w-8 text-foreground" /></div>;

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 md:px-6">
      <div className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">Manage Products</h1>
          <p className="mt-2 text-muted-foreground">View and delete your products here.</p>
        </div>
        <Link href="/items/add" className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors w-fit">
          Add New Product
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-muted/50 text-muted-foreground">
              <tr>
                <th className="px-6 py-4 font-medium">Product</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Price</th>
                <th className="px-6 py-4 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 shrink-0 rounded-lg bg-muted p-1 flex items-center justify-center">
                        <img src={item.image} alt={item.title} className="h-full w-full object-contain rounded-md" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{item.title}</p>
                        <p className="text-xs text-muted-foreground line-clamp-1 max-w-[200px] mt-1">{item.shortDescription}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{item.category}</td>
                  <td className="px-6 py-4 font-medium text-foreground">${item.price}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/items/${item.id}`} className="flex h-9 w-9 items-center justify-center rounded-lg border border-border hover:bg-muted text-foreground transition-colors">
                        <Eye className="h-4 w-4" />
                      </Link>
                      
                      {/* স্ট্যাটিক আইটেমগুলো ডিলিট বাটন হাইড করা হলো */}
                      {!["1","2","3","4","5","6"].includes(item.id) && (
                        <button onClick={() => handleDelete(item.id)} className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-red-500 hover:bg-red-500/10 transition-colors">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}