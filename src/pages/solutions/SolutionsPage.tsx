// src/pages/SolutionsPage.tsx
import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { solutions } from '@/data/solutions/solutions.ts';
import CapabilitiesSection from '@/sections/solutions/CapabilitiesSection';
import UseCasesSection from '@/sections/solutions/UseCasesSection';
import Hero from '@/sections/solutions/Hero';
import ProblemSection from '@/sections/solutions/ProblemSection';
import SolutionSection from '@/sections/solutions/SolutionSection';
// import ModulesSection from "@/sections/solutions/MoudulesSection";
import RelatedArticles from '@/sections/solutions/RelatedArticles';
// import VerticalModulesListing from "@/components/modules/VerticalModulesListing";
import TestVerticalModules from '@/components/TestVerticalModules';

export default function SolutionsPage() {
  const { slug = '' } = useParams();

  // memoized lookup keeps renders cheap
  const soln = useMemo(() => solutions.find((s) => s.slug === slug), [slug]);

  if (!soln) {
    return (
      <Layout>
        <main className="mx-auto max-w-3xl p-6">
          <h1 className="text-2xl font-semibold">Solution not found</h1>
          <p className="mt-2 text-gray-600">
            We couldn’t find “{slug}”.{' '}
            <Link to="/" className="underline">
              Go back home
            </Link>
            .
          </p>
        </main>
      </Layout>
    );
  }

  return (
    <Layout>
      <main className="relative mx-auto">
        <Hero
          heading={soln.heading}
          subHeading={soln.subHeading}
          image={soln.img}
          workflow={soln.workflow}
        />

        <ProblemSection problems={soln.problems} />
        <SolutionSection mainDesc={soln.mainSolnDesc} solnPoints={soln.solnPoints} />

        {!!soln.coreCapabilities?.length && (
          <CapabilitiesSection capabilities={soln.coreCapabilities} />
        )}

        {!!soln.useCases?.length && <UseCasesSection useCases={soln.useCases} />}

        {/* <ModulesSection modules={soln.modules} /> */}
        {/* <VerticalModulesListing /> */}
        <TestVerticalModules items={soln.modules} />
        <RelatedArticles mainArticleSlug={soln.mainArticleSlug} />
      </main>
    </Layout>
  );
}
