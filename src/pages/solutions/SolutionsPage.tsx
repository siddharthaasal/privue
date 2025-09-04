import Layout from "@/components/Layout";
import { solutions } from "@/data/solutions/solutions";
import CapabilitiesSection from "@/sections/solutions/CapabilitiesSection";
import Hero from "@/sections/solutions/Hero";
import ProblemSection from "@/sections/solutions/ProblemSection";
import SolutionSection from "@/sections/solutions/SolutionSection";
import ModulesSection from "@/sections/solutions/MoudulesSection";
import RelatedArticles from "@/sections/solutions/RelatedArticles";

export default function SolutionsPage() {

    const soln = solutions[1];

    return (
        <Layout>
            <main className="relative mx-auto">
                <Hero heading={soln.heading} subHeading={soln.subHeading} image={soln.img} />
                <ProblemSection problems={soln.problems} />
                <SolutionSection mainDesc={soln.mainSolnDesc} solnPoints={soln.solnPoints} />
                {!!soln.coreCapabilities?.length && (
                    console.log("Rendering CapabilitiesSection with", soln.coreCapabilities.length),
                    <CapabilitiesSection capabilities={soln.coreCapabilities} />
                )}

                <ModulesSection modules={soln.modules} />
                <RelatedArticles mainArticleSlug={soln.mainArticleSlug} />
            </main>
        </Layout>
    )
}