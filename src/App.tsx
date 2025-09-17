import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import NotFound from "./pages/NotFound";
import ArticleListing from "./pages/articles/ArticleListing";
import TestBlogPlage from "./pages/TestBlogPage.tsx";
import Workflow from "./pages/Workflow.tsx";
import ArticlePage from "./pages/articles/ArticlePage";
import OldArticleListing from "./pages/articles/OldArticleListing";
import DarkHeroSection from "./sections/DarkHeroSection";
import TestStyles from "./pages/TestStyles";
import ContactPage from "./pages/contact/ContactPage";
// legal
import Terms from "./pages/legal/Terms";
import PrivacyPolicy from "./pages/legal/PrivacyPolicy";
import SolutionsPage from "./pages/solutions/SolutionsPage";
import DPM from "./pages/solutions/DPM";
import Sustainability from "./pages/solutions/Sustainability";
import DummyArticleListing from "./pages/test/DummyArticles.tsx";

function App() {
  return (
    <>
      < Routes >
        <Route path="/" element={<LandingPage />} />
        <Route path="/articles" element={<ArticleListing />} />
        <Route path="/dummy-articles" element={<DummyArticleListing />} />
        <Route path="/test" element={<TestBlogPlage />} />
        <Route path="/workflow" element={<Workflow />} />
        <Route path="/article" element={<ArticlePage />} />
        <Route path="/articles/:slug" element={<ArticlePage />} />
        <Route path="/articles-0" element={<OldArticleListing />} />
        <Route path="/dark" element={<DarkHeroSection />} />
        <Route path="/styles" element={<TestStyles />} />
        <Route path="/solutions-final" element={<SolutionsPage />} />
        <Route path="/solution1" element={<DPM />} />
        <Route path="/solution2" element={<Sustainability />} />
        <Route path="/contact" element={<ContactPage />} />
        {/* legal */}
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/solutions/:slug" element={<SolutionsPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes >
    </>
  )
}

export default App
