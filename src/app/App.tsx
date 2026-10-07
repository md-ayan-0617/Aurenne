import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { SmoothScrollProvider, scrollPageToTop } from '../components/common/SmoothScrollProvider';
import { Preloader } from '../components/common/Preloader';
import { CustomCursor } from '../components/common/CustomCursor';
import { LuxuryHeader } from '../components/navigation/LuxuryHeader';
import { FullscreenMenu } from '../components/navigation/FullscreenMenu';
import { SearchOverlay } from '../components/common/SearchOverlay';
import { MiniBag } from '../components/common/MiniBag';
import { WishlistDrawer } from '../components/common/WishlistDrawer';
import { AppointmentDrawer } from '../components/common/AppointmentDrawer';
import { LuxuryFooter } from '../components/common/LuxuryFooter';
import { ScrollProgress } from '../components/common/ScrollProgress';
import { RouteTransition } from '../components/common/RouteTransition';

// Lazy-Loaded Routes for Optimal Performance & Code Splitting
const HomePage = lazy(() => import('../pages/home/HomePage').then((m) => ({ default: m.HomePage })));
const CollectionsPage = lazy(() => import('../pages/collections/CollectionsPage').then((m) => ({ default: m.CollectionsPage })));
const CollectionDetailPage = lazy(() => import('../pages/collections/CollectionDetailPage').then((m) => ({ default: m.CollectionDetailPage })));
const ProductDetailPage = lazy(() => import('../pages/product/ProductDetailPage').then((m) => ({ default: m.ProductDetailPage })));
const MaisonPage = lazy(() => import('../pages/maison/MaisonPage').then((m) => ({ default: m.MaisonPage })));
const AtelierPage = lazy(() => import('../pages/atelier/AtelierPage').then((m) => ({ default: m.AtelierPage })));
const BespokePage = lazy(() => import('../pages/bespoke/BespokePage').then((m) => ({ default: m.BespokePage })));
const JournalPage = lazy(() => import('../pages/journal/JournalPage').then((m) => ({ default: m.JournalPage })));
const ArticleDetailPage = lazy(() => import('../pages/journal/ArticleDetailPage').then((m) => ({ default: m.ArticleDetailPage })));
const AppointmentsPage = lazy(() => import('../pages/appointments/AppointmentsPage').then((m) => ({ default: m.AppointmentsPage })));
const ContactPage = lazy(() => import('../pages/contact/ContactPage').then((m) => ({ default: m.ContactPage })));
const WishlistPage = lazy(() => import('../pages/wishlist/WishlistPage').then((m) => ({ default: m.WishlistPage })));
const BagPage = lazy(() => import('../pages/bag/BagPage').then((m) => ({ default: m.BagPage })));
const SearchPage = lazy(() => import('../pages/search/SearchPage').then((m) => ({ default: m.SearchPage })));
const NotFoundPage = lazy(() => import('../pages/notFound/NotFoundPage').then((m) => ({ default: m.NotFoundPage })));

// Sleek luxury page loading fallback
const PageFallback: React.FC = () => (
  <div className="w-full min-h-[70vh] flex flex-col items-center justify-center bg-[#08090A] text-[#F1EDE5]">
    <div className="relative w-12 h-12 flex items-center justify-center">
      <svg className="w-8 h-8 animate-spin" viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="16" stroke="rgba(199,166,106,0.2)" strokeWidth="1.5" />
        <path d="M20 4 A 16 16 0 0 1 36 20" stroke="#C7A66A" strokeWidth="1.5" />
      </svg>
    </div>
    <span className="mt-4 font-mono text-[10px] uppercase tracking-[0.25em] text-[#C7A66A]">
      ILLUMINATING OBJECT // AURENNE
    </span>
  </div>
);

// Scroll to top on route change (synchronous with Lenis & window)
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    scrollPageToTop();
  }, [pathname]);
  return null;
};

// Route layout
const AppLayout: React.FC = () => {
  const { pathname } = useLocation();
  const is404 =
    pathname !== '/' &&
    pathname !== '/collections' &&
    !pathname.startsWith('/collections/') &&
    !pathname.startsWith('/piece/') &&
    pathname !== '/maison' &&
    pathname !== '/atelier' &&
    pathname !== '/bespoke' &&
    pathname !== '/journal' &&
    !pathname.startsWith('/journal/') &&
    pathname !== '/appointments' &&
    pathname !== '/contact' &&
    pathname !== '/wishlist' &&
    pathname !== '/bag' &&
    pathname !== '/search';

  return (
    <div className="relative min-h-screen flex flex-col selection:bg-[#C7A66A] selection:text-[#08090A]">
      <ScrollToTop />
      {/* Noise Texture Overlay */}
      <div className="noise-overlay" />

      {/* Luxury Custom Cursor (Desktop Only) */}
      <CustomCursor />

      {/* Exhibition Preloader */}
      <Preloader />

      {/* Route Switch Transition */}
      <RouteTransition />

      {/* Global Luxury Header */}
      <LuxuryHeader />

      {/* Drawers & Overlays */}
      <FullscreenMenu />
      <SearchOverlay />
      <MiniBag />
      <WishlistDrawer />
      <AppointmentDrawer />
      <ScrollProgress />

      {/* Main Routed Page Content with Suspense */}
      <main className="flex-1 w-full" id="main-content">
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/collections" element={<CollectionsPage />} />
            <Route path="/collections/:slug" element={<CollectionDetailPage />} />
            <Route path="/piece/:slug" element={<ProductDetailPage />} />
            <Route path="/maison" element={<MaisonPage />} />
            <Route path="/atelier" element={<AtelierPage />} />
            <Route path="/bespoke" element={<BespokePage />} />
            <Route path="/journal" element={<JournalPage />} />
            <Route path="/journal/:slug" element={<ArticleDetailPage />} />
            <Route path="/appointments" element={<AppointmentsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/bag" element={<BagPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>

      {/* Global Luxury Footer */}
      {!is404 && <LuxuryFooter />}
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <SmoothScrollProvider>
        <AppLayout />
      </SmoothScrollProvider>
    </BrowserRouter>
  );
};
export default App;
