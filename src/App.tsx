import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ArticleListing from "./pages/articles/ArticleListing";
import TestBlogPlage from "./pages/TestBlogPage";
import ArticlePage from "./pages/articles/ArticlePage";
import OldArticleListing from "./pages/articles/OldArticleListing";
import DarkHeroSection from "./sections/DarkHeroSection";
import TestStyles from "./pages/TestStyles";

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
      </Routes >
    </>
  )
}

export default App
