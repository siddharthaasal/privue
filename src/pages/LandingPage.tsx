import Layout from "@/components/Layout"
import HeroSection from "@/sections/HeroSection"
import AboutSection from "@/sections/AboutSection"
import FeaturedArticles from "@/sections/FeaturedArticles"
import FeaturedModules from "@/sections/FeaturedModules"
import FeaturedSolutions from "@/sections/FeaturedSolutions"
import IndustrySection from "@/sections/IndustrySection"
import FeaturedCapabilities from "@/sections/FeaturedCapabilities"



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
                    <section id="modules" data-theme="light">
                        <AboutSection />
                    </section>
                    <section id="modules" data-theme="light">
                        <FeaturedSolutions />
                    </section>
                    <section id="modules" data-theme="light">
                        <FeaturedCapabilities />
                    </section>
                    <section id="modules" data-theme="light">
                        <IndustrySection />
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