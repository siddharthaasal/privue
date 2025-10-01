type FeatureCardProps = {
  icon: React.ComponentType<any> | string;
  title: string;
  description: string;
  href: string;
};

function FeatureCard({ icon: Icon, title, description, href }: FeatureCardProps) {
  return (
    <a
      href={href}
      className={`group hover:shadow-privue-200/60 block rounded-xl border border-gray-100 bg-white p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl`}
    >
      <div className="bg-privue-100 group-hover:bg-privue-200 mb-4 flex h-12 w-12 items-center justify-center rounded-full transition-colors duration-300">
        <div className="text-privue-700 transition-transform duration-300 group-hover:scale-110">
          <Icon className="text-privue-700 h-6 w-6" aria-hidden />
        </div>
      </div>
      <h3 className="group-hover:text-privue-800 mb-2 text-lg font-medium tracking-tight transition-colors duration-300">
        {title}
      </h3>
      <p className="text-muted-foreground group-hover:text-foreground/80 text-sm transition-colors duration-300">
        {description}
      </p>
    </a>
  );
}

import { solutions } from '@/data/solutions/solutions.ts';
export default function FinalFeaturesGrid() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {solutions.map((s, i) => {
        return (
          <FeatureCard
            key={i}
            title={s.heading}
            description={s.subHeading}
            icon={s.icon}
            href={`/solutions/${s.slug}`}
          />
        );
      })}
    </div>
  );
}
