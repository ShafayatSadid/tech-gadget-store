// src/lib/storage.ts
import { Item, mockItems } from "./data";

// সব আইটেম পাওয়া (Static + LocalStorage)
export function getItems(): Item[] {
  if (typeof window === "undefined") return mockItems;
  const stored = localStorage.getItem("custom_items");
  const customItems = stored ? JSON.parse(stored) : [];
  return [...mockItems, ...customItems];
}

// নতুন আইটেম অ্যাড করা
export function addItem(item: Item) {
  if (typeof window === "undefined") return;
  const stored = localStorage.getItem("custom_items");
  const customItems = stored ? JSON.parse(stored) : [];
  customItems.push(item);
  localStorage.setItem("custom_items", JSON.stringify(customItems));
}

// আইটেম ডিলিট করা
export function deleteItem(id: string) {
  if (typeof window === "undefined") return;
  const stored = localStorage.getItem("custom_items");
  if (stored) {
    const customItems: Item[] = JSON.parse(stored);
    const updatedItems = customItems.filter((item) => item.id !== id);
    localStorage.setItem("custom_items", JSON.stringify(updatedItems));
  }
}