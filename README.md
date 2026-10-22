# TechGadget - Premium Tech Store

A modern, responsive e-commerce web application built with Next.js (App Router) and Firebase Authentication. This project was developed as part of the Remontada Next.js Assessment Task.

## 🔗 Links
- **Live Demo:** [https://tech-gadget-store-omega.vercel.app/](https://tech-gadget-store-omega.vercel.app/)
- **GitHub Repository:** [https://github.com/ShafayatSadid/tech-gadget-store](https://github.com/ShafayatSadid/tech-gadget-store)

## 📝 Short Project Description
TechGadget is a premium tech gadget store where users can browse the latest tech products. It features a fully responsive, Vercel-inspired minimalist UI with system-based dark/light mode. The app includes public pages for browsing items and protected pages for authenticated users to add and manage products.

## ✨ Key Features
- **Firebase Authentication:** Secure Login and Registration using Email/Password and Google OAuth.
- **Public & Protected Routes:** Unauthenticated users can browse products, while only logged-in users can access the Add and Manage Product pages.
- **Dynamic Routing:** Dedicated item details page using Next.js dynamic routes (`/items/[id]`).
- **Search & Filtering:** Real-time search functionality and filtering by Category and Price range on the Items page.
- **Local Storage Integration:** Users can add new products which are persisted in the browser's local storage (merged with static data).
- **Responsive UI:** Fully responsive design optimized for mobile, tablet, and desktop screens.
- **Minimalist Theme:** Clean, professional UI built with Tailwind CSS, featuring system-based Dark/Light mode support.

## 🛠️ Technologies Used
- **Framework:** Next.js 16 (App Router)
- **Authentication:** Firebase
- **Styling:** Tailwind CSS
- **Icons:** Lucide React & React Icons
- **Notifications:** Sonner (Toast)

## 🚀 Setup & Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ShafayatSadid/tech-gadget-store.git
   cd tech-gadget-store
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env.local` file in the root directory and add your Firebase configuration keys:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY="your_api_key"
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your_auth_domain"
   NEXT_PUBLIC_FIREBASE_PROJECT_ID="your_project_id"
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your_storage_bucket"
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="your_messaging_sender_id"
   NEXT_PUBLIC_FIREBASE_APP_ID="your_app_id"
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📍 Route Summary

| Route | Description | Access |
| :--- | :--- | :--- |
| `/` | Landing Page (Hero, Features, Featured Items, Testimonials, Footer) | Public |
| `/items` | Items listing with Search and Filters | Public |
| `/items/[id]` | Detailed view of a specific item | Public |
| `/about` | About the app and its mission | Public |
| `/contact` | Contact information and form | Public |
| `/login` | User Login page | Public |
| `/register` | User Registration page | Public |
| `/items/add` | Form to add a new product | Protected (Auth Required) |
| `/items/manage` | Dashboard to view and delete products | Protected (Auth Required) |
