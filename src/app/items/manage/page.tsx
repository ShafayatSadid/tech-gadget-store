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
      setItems(getItems()); // UI আপডেট
      toast.success("Item deleted successfully");
    }
  };

  if (authLoading || loading) return <div className="flex h-[70vh] items-center justify-center"><Loader2 className="animate-spin h-8 w-8 text-orange-500" /></div>;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage Products</h1>
          <p className="mt-1 text-muted-foreground">View and delete your products here.</p>
        </div>
        <Link href="/items/add" className="rounded-full bg-orange-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-orange-600 transition-colors">
          Add New
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b bg-muted/50 text-muted-foreground">
              <tr>
                <th className="px-6 py-4 font-medium">Product</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Price</th>
                <th className="px-6 py-4 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={item.image} alt={item.title} className="h-10 w-10 rounded-md object-cover" />
                      <div>
                        <p className="font-semibold">{item.title}</p>
                        <p className="text-xs text-muted-foreground line-clamp-1 max-w-[200px]">{item.shortDescription}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">{item.category}</td>
                  <td className="px-6 py-4 font-medium">${item.price}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/items/${item.id}`} className="flex h-8 w-8 items-center justify-center rounded-md border hover:bg-muted">
                        <Eye className="h-4 w-4" />
                      </Link>
                      {/* শুধুমাত্র localStorage-এ থাকা কাস্টম আইটেমগুলো ডিলিট করা যাবে */}
                      {!["1","2","3","4","5","6"].includes(item.id) && (
                        <button onClick={() => handleDelete(item.id)} className="flex h-8 w-8 items-center justify-center rounded-md border text-red-500 hover:bg-red-50">
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