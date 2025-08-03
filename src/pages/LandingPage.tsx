import Layout from "@/components/Layout"
import HeroSection from "@/sections/HeroSection"
import FeaturedArticles from "@/sections/FeaturedArticles"
import FeaturedModules from "@/sections/FeaturedModules"


export default function LandingPage() {
    return (
        <>
            <Layout>
                <>
                    <HeroSection />
                    <FeaturedModules />
                    <FeaturedArticles />
                </>
            </Layout>
        </>
    )
}