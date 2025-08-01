import Layout from "@/components/Layout"
import HeroSection from "@/sections/HeroSection"
import FeaturedArticles from "@/sections/FeaturedArticles"


export default function LandingPage() {
    return (
        <>
            <Layout>
                <>
                    <HeroSection />
                    <FeaturedArticles />
                </>
            </Layout>
        </>
    )
}