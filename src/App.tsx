// App.tsx
import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import CookieBanner from './cookies/CookieBanner';
import ProductDataLifecycle from './pages/legal/ProductDataLifecycle';
import CookiePreferencesPage from './cookies/CookiePreferencesPage';

// small UI fallback while chunks load
// function PageFallback() {
//   return <div style={{ padding: 40, textAlign: 'center' }}>Loading…</div>;
// }

/**
 * Lazy-load every route so Vite creates separate chunks for each page.
 * This will drastically reduce initial bundle size (index-*.js).
 */
const LandingPage = lazy(() => import('./pages/LandingPage'));
const NotFound = lazy(() => import('./pages/NotFound'));
const ArticleListing = lazy(() => import('./pages/articles/ArticleListing'));
const TestBlogPage = lazy(() => import('./pages/TestBlogPage'));
const ShowcasePage = lazy(() => import('./pages/test/ShowcasePage'));
const Workflow = lazy(() => import('./pages/Workflow'));
const ArticlePage = lazy(() => import('./pages/articles/ArticlePage'));
const OldArticleListing = lazy(() => import('./pages/articles/OldArticleListing'));
const TestStyles = lazy(() => import('./pages/TestStyles'));
const ContactPage = lazy(() => import('./pages/contact/ContactPage'));
const ProductPage = lazy(() => import('./pages/ProductPage'));
const Terms = lazy(() => import('./pages/legal/Terms'));
const PrivacyPolicy = lazy(() => import('./pages/legal/PrivacyPolicy'));
const SolutionsPage = lazy(() => import('./pages/solutions/SolutionsPage'));
const DPM = lazy(() => import('./pages/solutions/DPM'));
const Sustainability = lazy(() => import('./pages/solutions/Sustainability'));
const DummyArticleListing = lazy(() => import('./pages/test/DummyArticles'));
const CookiePolicy = lazy(() => import('./pages/legal/CookiePolicy'));
const CaliforniaNotice = lazy(() => import('./pages/legal/CaliforniaNotice'));
const DataSecurity = lazy(() => import('./pages/legal/DataSecurity'));

export default function App() {
  return (
    // Outer Suspense catches route chunk loads; use nested Suspense for more granular fallbacks if desired
    // <Suspense fallback={<PageFallback />}>
    <>
      <CookieBanner />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/articles" element={<ArticleListing />} />
        <Route path="/dummy-articles" element={<DummyArticleListing />} />
        <Route path="/show" element={<ShowcasePage />} />
        <Route path="/test" element={<TestBlogPage />} />
        <Route path="/workflow" element={<Workflow />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/article" element={<ArticlePage />} />
        <Route path="/articles/:slug" element={<ArticlePage />} />
        <Route path="/articles-0" element={<OldArticleListing />} />
        <Route path="/styles" element={<TestStyles />} />
        <Route path="/solutions-final" element={<SolutionsPage />} />
        <Route path="/solution1" element={<DPM />} />
        <Route path="/solution2" element={<Sustainability />} />
        <Route path="/contact" element={<ContactPage />} />
        {/* legal */}
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
        <Route path="/cookie-preferences" element={<CookiePreferencesPage />} />
        <Route path="/california-notice" element={<CaliforniaNotice />} />
        <Route path="/data-security" element={<DataSecurity />} />
        <Route path="/product-data-lifecycle" element={<ProductDataLifecycle />} />
        <Route path="/solutions/:slug" element={<SolutionsPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
    // </Suspense>
  );
}
