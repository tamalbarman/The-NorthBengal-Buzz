import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppFAB from './components/WhatsAppFAB';
import ScrollToTop from './components/ScrollToTop';
import { CMSProvider } from './context/CMSContext';

const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const PackagesPage = lazy(() => import('./pages/PackagesPage'));
const BookPage = lazy(() => import('./pages/BookPage'));
const AdminPage = lazy(() => import('./pages/AdminPage'));
const NotFound = lazy(() => import('./pages/NotFound'));

const PageLoader = () => (
  <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <div style={{ textAlign: 'center' }}>
      <i className="fas fa-spinner fa-spin text-teal" style={{ fontSize: '3rem', marginBottom: '1rem' }}></i>
      <p style={{ fontSize: '1.4rem', color: 'var(--text-muted)', fontWeight: '600' }}>Loading content...</p>
    </div>
  </div>
);

function App() {
  return (
    <CMSProvider>
      <div className="app-container">
        <ScrollToTop />
        <Navbar />
        <main className="main-content">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/package" element={<PackagesPage />} />
              <Route path="/book" element={<BookPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <WhatsAppFAB />
      </div>
    </CMSProvider>
  );
}

export default App;
