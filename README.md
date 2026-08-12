# 🏔️ The Northbengal Buzz - Travel & Pure Himalayan Tea Store

[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![React Router](https://img.shields.io/badge/React_Router-6.26-CA4245?style=flat-square&logo=react-router&logoColor=white)](https://reactrouter.com/)
[![License](https://img.shields.io/badge/License-MIT-emerald?style=flat-square)](LICENSE)

A production-grade, highly responsive web application and digital guide for **North Bengal & Sikkim** travel exploration, homestay bookings, and direct sales of authentic **Darjeeling & Himalayan Teas**.

---

## ✨ Features

- 🌄 **Curated Himalayan Tour Packages**: Explore hand-crafted itineraries across Darjeeling, Kalimpong, Dooars, Sikkim, Sandakphu, Tinchuley, Chatakpur, and Pelling.
- 🧮 **Live Trip Estimation Calculator**: Interactive booking tool with instant total cost calculation based on traveler count and travel dates.
- ☕ **Authentic Himalayan Tea Store**: Direct-from-source Darjeeling Loose Leaf Tea (First Flush Organic) and Pure Himalayan Milk CTC Tea with multi-quantity pricing.
- 💬 **Direct WhatsApp Business Booking**: One-click pre-filled WhatsApp links (`+91-74782-86972`) for instant booking confirmations and custom inquiries.
- 🌙 **Persistent Dark / Light Theme System**: Smooth theme toggle button persistent across browser sessions via `localStorage` and CSS design tokens.
- 📱 **Mobile-First Glassmorphism Design**: Ultra-responsive layout optimized for all screen viewports (375px to 4K displays) featuring a sliding navigation drawer.
- 🛡️ **Production & Security Hardened**: Built-in HTTP security headers (`netlify.toml`), native date-range validation, accessibility attributes (`ARIA`), and route code-splitting (`React.lazy` + `Suspense`).

---

## 🛠️ Tech Stack

- **Frontend Core**: React 18, HTML5, Vanilla CSS3 (Custom Design System with CSS variables)
- **Routing**: React Router DOM v6
- **Icons & Fonts**: Font Awesome 6, Google Fonts (*Outfit* & *Playfair Display*)
- **Build Tool**: Vite 5
- **Deployment & Security Target**: Netlify SPA (`netlify.toml` security headers)

---

## 📂 Project Structure

```text
The-NorthBengal-Buzz/
├── netlify.toml                # HTTP Security headers & SPA redirects configuration
├── index.html                  # Root HTML template with OpenGraph meta tags
├── package.json                # Project dependencies & npm scripts
├── vite.config.js              # Vite bundler configuration
├── public/
│   └── assets/
│       └── images/             # Optimized photos, emblems, and tea assets
└── src/
    ├── main.jsx                # Application entry point wrapped in ThemeProvider
    ├── App.jsx                 # Route splitting with React.lazy and Suspense
    ├── index.css               # Global CSS design tokens, utilities & theme rules
    ├── components/
    │   ├── Navbar.jsx          # Responsive header navigation with theme switcher
    │   ├── QuickSearch.jsx     # Floating hero search bar
    │   ├── PackageCard.jsx     # Reusable tour package card component
    │   └── Footer.jsx          # Glassmorphic footer with Google rating badge
    ├── context/
    │   └── ThemeContext.jsx    # React context managing dark/light theme state
    ├── data/
    │   ├── packagesData.js     # Centralized tour packages data model
    │   └── teaProductsData.js  # Centralized tea product catalog model
    └── pages/
        ├── HomePage.jsx        # Landing page with hero, search, & tea store
        ├── AboutPage.jsx       # About us story, features grid, & trust badges
        ├── PackagesPage.jsx    # Full catalog with search & category filters
        ├── BookPage.jsx        # Interactive trip booking & live cost estimator
        └── NotFound.jsx        # 404 Error page with recovery navigation
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v18.0.0 or higher) installed on your machine.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/tamalbarman/The-NorthBengal-Buzz.git
   cd The-NorthBengal-Buzz
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

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

The output files will be generated in the `dist/` directory, ready for deployment to platforms like Netlify, Vercel, or AWS Amplify.

---

## 🛡️ Security & Performance Highlights

- **HTTP Security Headers (`netlify.toml`)**:
  - `Content-Security-Policy`
  - `X-Frame-Options: DENY`
  - `X-Content-Type-Options: nosniff`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy`
- **Route Code-Splitting**: Pages (`HomePage`, `AboutPage`, `PackagesPage`, `BookPage`) are loaded asynchronously via `React.lazy`, reducing core entry bundle size to **~173 kB**.
- **Form Date Validation**: Controls past date selection (`min={todayStr}`) and guarantees departure dates cannot precede arrival dates.

---

## 📞 Business Contact & Support

- **Business Name**: The Northbengal Buzz
- **Owner / Contact**: Tamal Barman
- **WhatsApp / Phone**: `+91-74782-86972`
- **WhatsApp Link**: [Click to chat on WhatsApp](https://wa.me/917478286972)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
