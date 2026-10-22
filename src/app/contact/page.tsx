// src/app/contact/page.tsx
"use client";

import { useState } from "react";
import { Mail, MapPin, Phone, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // ডেমো সাবমিশন (অ্যাসেসমেন্টের জন্য)
    setTimeout(() => {
      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({ name: "", email: "", message: "" });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="mx-auto min-h-[80vh] max-w-7xl px-4 py-24 md:px-6">
      <div className="grid gap-16 md:grid-cols-2 md:items-center">
        
        {/* Contact Info */}
        <div>
          <h1 className="text-4xl font-bold tracking-tighter md:text-6xl text-foreground mb-6">
            Let&apos;s Talk.
          </h1>
          <p className="text-lg text-muted-foreground mb-12 max-w-md">
            Have a question about our products or need help with your order? 
            Drop us a message and we&apos;ll get back to you as soon as possible.
          </p>

          <div className="flex flex-col gap-8">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-muted border border-border">
                <Mail className="h-5 w-5 text-foreground" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-1">Email</h3>
                <a href="mailto:support@techgadget.com" className="text-muted-foreground hover:text-accent transition-colors">support@techgadget.com</a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-muted border border-border">
                <Phone className="h-5 w-5 text-foreground" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-1">Phone</h3>
                <p className="text-muted-foreground">+1 (555) 123-4567</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-muted border border-border">
                <MapPin className="h-5 w-5 text-foreground" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-1">Office</h3>
                <p className="text-muted-foreground">123 Tech Street, Silicon Valley<br />CA 94025, United States</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="rounded-3xl border border-border bg-card p-8 shadow-sm md:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-sm font-medium text-foreground">Full Name</label>
              <input 
                required 
                type="text" 
                value={formData.name} 
                onChange={(e) => setFormData({...formData, name: e.target.value})} 
                className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:ring-2 focus:ring-foreground focus:outline-none transition-all" 
                placeholder="John Doe" 
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground">Email Address</label>
              <input 
                required 
                type="email" 
                value={formData.email} 
                onChange={(e) => setFormData({...formData, email: e.target.value})} 
                className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:ring-2 focus:ring-foreground focus:outline-none transition-all" 
                placeholder="john@example.com" 
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground">Message</label>
              <textarea 
                required 
                rows={5} 
                value={formData.message} 
                onChange={(e) => setFormData({...formData, message: e.target.value})} 
                className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:ring-2 focus:ring-foreground focus:outline-none resize-none transition-all" 
                placeholder="How can we help you?" 
              />
            </div>

            <button 
              type="submit" 
              disabled={loading} 
              className="flex w-full items-center justify-center gap-2 rounded-full bg-primary py-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : null}
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}