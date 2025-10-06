import IndustrySoltions from '@/components/industry/IndusdrySolutions';

export default function IndustrySection() {
  return (
    <section id="industries-section" className="font-open-sans relative mx-auto">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="mx-auto py-12 text-center">
          <h2 className="mb-4 text-3xl font-semibold text-[#171717] md:text-4xl">
            Who We{' '}
            <span className="from-privue-950 to-privue-900 via-privue-800 bg-gradient-to-r bg-clip-text font-semibold text-transparent">
              Serve
            </span>
          </h2>
          <p className="mt-2 mb-4 text-base text-[#525252] md:text-lg dark:text-gray-400">
            Whatever your needs, we have the solution, capabilities, and tools to help you achieve
            your goals.
          </p>
        </div>

        <IndustrySoltions />
      </div>
    </section>
  );
}
