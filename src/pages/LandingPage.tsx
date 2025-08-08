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
                    <section id="hero" data-theme="dark">
                        <div className="dark">
                            <HeroSection />
                        </div>
                    </section>
                    <section id="modules" data-theme="light">
                        <FeaturedModules />
                    </section>

                    <section id="products" data-theme="dark">
                        <Products />
                    </section>

                    <section id="articles" data-theme="light">
                        <FeaturedArticles />
                    </section>
                </>
            </Layout>
        </>
    )
}