import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ArticleListing from "./pages/articles/ArticleListing";
import TestBlogPlage from "./pages/TestBlogPage";

function App() {
  return (
    <>
      < Routes >
        <Route path="/" element={<LandingPage />} />
        <Route path="/articles" element={<ArticleListing />} />
        <Route path="/test" element={<TestBlogPlage />} />
      </Routes >
    </>
  )
}

export default App
