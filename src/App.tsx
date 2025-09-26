import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import NotFound from "./pages/NotFound";
import ArticleListing from "./pages/articles/ArticleListing";
import TestBlogPlage from "./pages/TestBlogPage.tsx";
import ShowcasePage from "./pages/test/ShowcasePage.tsx";
import Workflow from "./pages/Workflow.tsx";
import ArticlePage from "./pages/articles/ArticlePage";
import OldArticleListing from "./pages/articles/OldArticleListing";
import TestStyles from "./pages/TestStyles";
import ContactPage from "./pages/contact/ContactPage";
import ProductPage from "./pages/ProductPage.tsx";
// legal
import Terms from "./pages/legal/Terms";
import PrivacyPolicy from "./pages/legal/PrivacyPolicy";
import SolutionsPage from "./pages/solutions/SolutionsPage";
import DPM from "./pages/solutions/DPM";
import Sustainability from "./pages/solutions/Sustainability";
import DummyArticleListing from "./pages/test/DummyArticles.tsx";
import CookiePolicy from "./pages/legal/CookiePolicy.tsx";
import CaliforniaNotice from "./pages/legal/CaliforniaNotice.tsx";
import DataSecurity from "./pages/legal/DataSecurity.tsx";

function App() {
  return (
    <>
      < Routes >
        <Route path="/" element={<LandingPage />} />
        <Route path="/articles" element={<ArticleListing />} />
        <Route path="/dummy-articles" element={<DummyArticleListing />} />
        <Route path="/show" element={<ShowcasePage />} />
        <Route path="/test" element={<TestBlogPlage />} />
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
        <Route path="/california-notice" element={<CaliforniaNotice />} />
        <Route path="/data-security" element={<DataSecurity />} />
        <Route path="/solutions/:slug" element={<SolutionsPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes >
    </>
  )
}

export default App
