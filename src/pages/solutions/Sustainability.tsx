import Layout from "@/components/Layout";
import { solutions } from "@/data/solutions/solutions";
import CapabilitiesSection from "@/sections/solutions/CapabilitiesSection";
import Hero from "@/sections/solutions/Hero";
import ProblemSection from "@/sections/solutions/ProblemSection";
import SolutionSection from "@/sections/solutions/SolutionSection";
import ModulesSection from "@/sections/solutions/MoudulesSection";
import RelatedArticles from "@/sections/solutions/RelatedArticles";

export default function Sustainability() {

    const soln = solutions[1];

    return (
        <Layout>
            <main className="relative mx-auto space-y-12">
                <Hero heading={soln.heading} subHeading={soln.subHeading} image={soln.img} />
                <ProblemSection problems={soln.problems} />
                <SolutionSection mainDesc={soln.mainSolnDesc} solnPoints={soln.solnPoints} />
                <CapabilitiesSection capabilities={soln.coreCapabilities} />
                <ModulesSection modules={soln.modules} />
                <RelatedArticles mainArticleSlug={soln.mainArticleSlug} />
            </main>
        </Layout>
    )
}