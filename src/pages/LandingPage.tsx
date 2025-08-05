import Layout from "@/components/Layout"
import HeroSection from "@/sections/HeroSection"
import FeaturedArticles from "@/sections/FeaturedArticles"
import FeaturedModules from "@/sections/FeaturedModules"
import Products from "@/sections/Products"


export default function LandingPage() {
    return (
        <>
            <Layout>
                <>
                    <HeroSection />
                    <Products />
                    <FeaturedModules />
                    <FeaturedArticles />
                </>
            </Layout>
        </>
    )
}