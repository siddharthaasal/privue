import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ArticleListing from "./pages/articles/ArticleListing";
import TestBlogPlage from "./pages/TestBlogPage";
import ArticlePage from "./pages/articles/ArticlePage";
import OldArticleListing from "./pages/articles/OldArticleListing";
import DarkHeroSection from "./sections/DarkHeroSection";
import TestStyles from "./pages/TestStyles";
import SolutionPage from "./pages/solutions/SolutionPage";
// legal
import Terms from "./pages/legal/Terms";
import PrivacyPolicy from "./pages/legal/PrivacyPolicy";

function App() {
  return (
    <>
      < Routes >
        <Route path="/" element={<LandingPage />} />
        <Route path="/articles" element={<ArticleListing />} />
        <Route path="/test" element={<TestBlogPlage />} />
        <Route path="/article" element={<ArticlePage />} />
        <Route path="/articles-0" element={<OldArticleListing />} />
        <Route path="/dark" element={<DarkHeroSection />} />
        <Route path="/styles" element={<TestStyles />} />
        <Route path="/solution" element={<SolutionPage />} />
        {/* legal */}
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes >
    </>
  )
}

export default App
