import { solutions } from '@/data/solutions/solutions.ts';
import FlipCard from '@/components/feature/FlipCard';

export default function FeaturesFlip() {
  return (
    <section>
      <div className="py-16">
        <div className="mx-auto px-6">
          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {solutions.map((s) => (
              <FlipCard
                key={s.id}
                title={s.heading}
                subtitle={s.subHeading}
                description={s.subHeading}
                features={s.featurePoints}
                slug={s.slug}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
