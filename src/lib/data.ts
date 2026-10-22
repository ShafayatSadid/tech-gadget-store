// src/lib/data.ts
export interface Item {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  price: number;
  rating: number;
  image: string;
  specs: string[];
}

export const mockItems: Item[] = [
  {
    id: "1",
    title: "MacBook Pro M3 Max",
    shortDescription: "The ultimate pro laptop for developers and creators.",
    fullDescription: "The MacBook Pro with M3 Max chip delivers extreme performance for the most demanding workflows. With a stunning Liquid Retina XDR display, up to 22 hours of battery life, and advanced connectivity, it's the perfect workstation.",
    category: "Laptop",
    price: 3499,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80",
    specs: ["M3 Max Chip", "36GB RAM", "1TB SSD", "14-inch Display"],
  },
  {
    id: "2",
    title: "iPhone 15 Pro Max",
    shortDescription: "Titanium design, A17 Pro chip, and pro camera system.",
    fullDescription: "Experience the power of iPhone 15 Pro Max. Forged in titanium, it features the groundbreaking A17 Pro chip, a customizable Action button, and the most powerful iPhone camera system ever.",
    category: "Smartphone",
    price: 1199,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1695822822491-d92cee704368?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    specs: ["A17 Pro Chip", "256GB Storage", "48MP Main Camera", "Titanium Frame"],
  },
  {
    id: "3",
    title: "Sony WH-1000XM5",
    shortDescription: "Industry-leading noise canceling headphones.",
    fullDescription: "The WH-1000XM5 headphones rewrite the rules for distraction-free listening. Two processors control 8 microphones for unprecedented noise cancellation and exceptional call quality.",
    category: "Audio",
    price: 399,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&q=80",
    specs: ["Wireless", "Active Noise Cancellation", "30-hour Battery", "Multipoint Connection"],
  },
  {
    id: "4",
    title: "iPad Pro 12.9-inch",
    shortDescription: "The ultimate iPad experience with M2 chip.",
    fullDescription: "Astonishing performance. Incredibly advanced displays. Superfast wireless connectivity. Next-level Apple Pencil capabilities. Powerful new features in iPadOS. The ultimate iPad experience.",
    category: "Tablet",
    price: 1099,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&q=80",
    specs: ["M2 Chip", "12.9-inch Liquid Retina XDR", "256GB Storage", "Face ID"],
  },
  {
    id: "5",
    title: "Logitech MX Master 3S",
    shortDescription: "Advanced wireless mouse for power users.",
    fullDescription: "Meet MX Master 3S – an iconic mouse remastered. Feel every moment of your workflow with even more precision, tactility, and performance, thanks to Quiet Click technology.",
    category: "Accessories",
    price: 99,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&q=80",
    specs: ["8K DPI Tracking", "Quiet Clicks", "USB-C Charging", "MagSpeed Scrolling"],
  },
  {
    id: "6",
    title: "Samsung Galaxy S24 Ultra",
    shortDescription: "The ultimate AI-powered Android smartphone.",
    fullDescription: "Welcome to the era of mobile AI. With Galaxy S24 Ultra in your hands, you can unleash whole new levels of creativity, productivity, and possibility — starting with the most important device in your life.",
    category: "Smartphone",
    price: 1299,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&q=80",
    specs: ["Snapdragon 8 Gen 3", "200MP Camera", "S Pen Included", "Titanium Frame"],
  },
];