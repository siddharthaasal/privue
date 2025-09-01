import Layout from "@/components/Layout"
import HeroSection from "@/sections/HeroSection"
import FeaturedArticles from "@/sections/FeaturedArticles"
import FeaturedModules from "@/sections/FeaturedModules"
import FeaturedSolutions from "@/sections/FeaturedSolutions"
import FeaturedSolutions2 from "@/sections/FeaturedSolutions2"
// import Products from "@/sections/Products"


export default function LandingPage() {
    return (
        <>
            <Layout>
                <>
                    <section id="hero" data-theme="light">
                        <div>
                            <HeroSection />
                        </div>
                    </section>
                    {/* <section id="products" data-theme="dark">
                        <Products />
                    </section> */}
                    <section id="modules" data-theme="light">
                        <FeaturedSolutions />
                    </section>
                    <section id="modules" data-theme="light">
                        <FeaturedSolutions2 />
                    </section>
                    <section id="modules" data-theme="light">
                        <FeaturedModules />
                    </section>
                    <section id="articles" data-theme="light">
                        <FeaturedArticles />
                    </section>
                </>
            </Layout>
        </>
    )
}