# 🏔️ The Northbengal Buzz - Travel & Pure Himalayan Tea Store

[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Express](https://img.shields.io/badge/Express-4.19-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.3-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-emerald?style=flat-square)](LICENSE)

A production-grade, full-stack **MERN** web application, Content Management System (CMS), and digital travel guide for **North Bengal & Sikkim** exploration, homestay bookings, NJP/Bagdogra cab rentals, restricted area permits, outdoor adventure activities, and direct sales of authentic **Darjeeling & Himalayan Teas**.

---

## ✨ Features

- 🌄 **Curated Himalayan Tour Packages**: Explore hand-crafted itineraries across Darjeeling, Kalimpong, Dooars, Sikkim, Sandakphu, Tinchuley, Chatakpur, and Pelling.
- 🏷️ **Dynamic Package Pricing & Percentage Discounts**: Admin can set original prices and discount percentages (e.g. `15% OFF`), automatically computing sale prices with strike-through original rates (`<del>₹14,999</del> ₹12,749`).
- 🚖 **NJP & Bagdogra Airport Cab Fare Estimator**: Interactive car rental quote calculator (Dzire, Bolero, Innova Crysta, 4x4 Land Rover) for pickups from Bagdogra (IXB) & NJP Railway Station with 1-click WhatsApp booking.
- 📄 **Sikkim & Restricted Area Permit (ILP/PAP) Assistant**: Interactive document checklist (Voter ID / Passport + photos) and Army checkpost notes for Nathula Pass, Tsomgo Lake, North Sikkim, and Zuluk.
- 🪂 **Outdoor Adventure & Heritage Add-Ons**: Teesta White Water Rafting, Kalimpong Paragliding, UNESCO Darjeeling Toy Train Ride, and Sandakphu Land Rover Safaris.
- 📸 **Visitor Photo Gallery (Max 3 Limit) & HD Lightbox**: Visitor photo submission system enforcing **strictly 3 photos max** per upload, featuring full-screen HD Lightbox preview and Admin approval queue.
- ⭐ **Verified Guest Ratings & Moderated Reviews**: Visitors can submit 5-star ratings and comments. Admin approves reviews before publishing to the public site with star filter pills (`All`, `5★`, `4★`, `3★`).
- 🔐 **Protected Admin CMS Portal (`/admin`)**: Password-protected dashboard (`admin123`) backed by JWT authentication for managing packages, review approvals, photo moderation, and security credentials.
- ☕ **Authentic Himalayan Tea Store**: Direct-from-source Darjeeling Loose Leaf Tea (First Flush Organic) and Pure Himalayan Milk CTC Tea with multi-quantity pack options.
- 📈 **98/100 Lighthouse SEO & Schema.org Rich Snippets**: Includes `Schema.org/TravelAgency` JSON-LD rich snippets, OpenGraph tags, `robots.txt`, and `sitemap.xml`.
- 🌙 **Persistent Dark / Light Theme System**: Smooth theme toggle persistent across browser sessions via `localStorage` and CSS design tokens.

---

## 🛠️ Tech Stack

- **Frontend Core**: React 18, React Router v6, Vanilla CSS3 (Custom Design System with CSS variables)
- **Backend API**: Node.js, Express.js REST API (`server/`)
- **Database**: MongoDB & Mongoose Object Data Modeling (`server/models/`)
- **Security & Auth**: JSON Web Tokens (JWT), XSS Sanitization, CORS, Rate Limiting
- **Icons & Fonts**: Font Awesome 6, Google Fonts (*Outfit* & *Playfair Display*)
- **Build Tool**: Vite 5

---

## 📂 Project Structure

```text
The-NorthBengal-Buzz/
├── server/                     # Express REST API Backend
│   ├── config/
│   │   └── db.js               # MongoDB Mongoose connection setup
│   ├── middleware/
│   │   └── auth.js             # JWT authentication middleware
│   ├── models/
│   │   ├── Package.js          # Tour Package Mongoose model
│   │   ├── Review.js           # Guest Review Mongoose model
│   │   └── VisitorMedia.js     # Traveler Photo Upload model (Max 3 photos cap)
│   ├── routes/
│   │   ├── authRoutes.js       # Admin JWT Login route
│   │   ├── packageRoutes.js    # Package CRUD & Discount routes
│   │   ├── reviewRoutes.js     # Guest Ratings moderation routes
│   │   └── mediaRoutes.js      # Visitor Photo Gallery routes
│   ├── package.json            # Express server dependencies
│   ├── seed.js                 # MongoDB database seeder script
│   └── server.js               # Express application entry point (Port 5000)
├── public/
│   ├── robots.txt              # Search engine crawler directives
│   ├── sitemap.xml             # Search engine XML sitemap
│   └── assets/images/          # Optimized photos, emblems, and tea assets
├── index.html                  # Root HTML with Schema.org JSON-LD structured data
├── package.json                # React frontend dependencies & scripts
├── vite.config.js              # Vite bundler configuration
└── src/
    ├── main.jsx                # Application entry point
    ├── App.jsx                 # Route code-splitting with CMSProvider
    ├── index.css               # Global CSS design tokens, themes & component rules
    ├── api/
    │   └── client.js           # REST API client connecting React frontend to Express API
    ├── components/
    │   ├── Navbar.jsx          # Header navigation with section shortcuts & theme switcher
    │   ├── QuickSearch.jsx     # Floating hero search bar
    │   ├── PackageCard.jsx     # Tour package card with discount badges & pricing
    │   ├── CabEstimatorSection.jsx # NJP/Bagdogra Taxi & Cab Fare Estimator
    │   ├── PermitGuideSection.jsx  # Sikkim ILP/PAP Permit requirement guide
    │   ├── AdventureAddonsSection.jsx # Rafting, Paragliding & Toy Train add-ons
    │   ├── VisitorGallerySection.jsx  # Visitor photo gallery (Max 3 cap) & HD Lightbox
    │   ├── RatingReviewSection.jsx   # Guest reviews with star rating filter pills
    │   ├── TeaCard.jsx         # Himalayan Tea store product card
    │   └── Footer.jsx          # Glassmorphic footer with Admin CMS link
    ├── context/
    │   ├── CMSContext.jsx      # Global CMS context connecting Express REST API
    │   └── ThemeContext.jsx    # Theme toggle context (Dark/Light mode)
    └── pages/
        ├── HomePage.jsx        # Landing page with hero, services, & tea store
        ├── AboutPage.jsx       # About us story & features grid
        ├── PackagesPage.jsx    # Full package catalog with filters
        ├── BookPage.jsx        # Dynamic trip booking & CMS estimation box
        ├── AdminPage.jsx       # Protected Admin CMS Portal (`/admin`)
        └── NotFound.jsx        # 404 Error page
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v18.0.0 or higher) and [MongoDB](https://www.mongodb.com/) installed on your system.

### 1. Frontend Setup & Run

1. **Install Frontend Dependencies**:
   ```bash
   npm install
   ```

2. **Start Vite Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

### 2. Express Backend Setup & Run

1. **Install Backend Dependencies**:
   ```bash
   cd server
   npm install
   ```

2. **Seed MongoDB Database**:
   ```bash
   node seed.js
   ```

3. **Start Express REST API Server**:
   ```bash
   node server.js
   ```
   Express API server will run on `http://localhost:5000/api`.

---

## 🔑 Admin CMS Portal Credentials

- **URL**: `http://localhost:3000/admin`
- **Default Password**: `admin123`

---

## 📦 Building for Production

To create an optimized production build:

```bash
npm run build
```

To preview the production bundle locally:

```bash
npm run preview
```

---

## 📞 Business Contact & Support

- **Business Name**: The Northbengal Buzz
- **Owner / Contact**: Tamal Barman
- **WhatsApp / Phone**: `+91-74782-86972`
- **WhatsApp Link**: [Click to chat on WhatsApp](https://wa.me/917478286972)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
