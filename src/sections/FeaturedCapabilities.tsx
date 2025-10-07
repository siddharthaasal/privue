import React from 'react';
import { Cpu, GitPullRequestCreateArrow, GitCompare, Landmark, Server } from 'lucide-react';

type IconType =
  | string // image url
  | React.ReactElement // already instantiated <Icon />
  | React.ComponentType<{ className?: string; 'aria-hidden'?: boolean }>; // component

export default function FeaturedCapabilities() {
  const coreCapabilities = [
    {
      icon: <Cpu />,
      heading: 'Predictive Risk Management',
      desc: 'Anticipate and mitigate financial, operational, and compliance risks before they impact your business.',
    },
    {
      icon: <GitPullRequestCreateArrow />,
      heading: 'AI-Powered Intelligence',
      desc: 'Transform raw data into strategic insights that drive smarter business decisions.',
    },
    {
      icon: <GitCompare />,
      heading: 'Intelligent Data Integration',
      desc: 'Unify disparate data sources into a single, enriched view of your business landscape.',
    },
    {
      icon: <GitPullRequestCreateArrow />,
      heading: 'Strategic Decision Intelligence',
      desc: 'Empower leadership with AI-backed recommendations for critical business choices.',
    },
    {
      icon: <Landmark />,
      heading: 'Industry-Focused AI Solutions',
      desc: 'Purpose-built applications for BFSI, Enterprise, Consulting, and Legal sectors.',
    },
    {
      icon: <Server />,
      heading: 'Enterprise-Grade AI',
      desc: 'Platform Scalable, secure, and cloud-native infrastructure designed for mission-critical operations.',
    },
  ];

  return (
    <section className="font-open-sans relative mx-auto">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="mx-auto py-8 px-4 text-center md:py-12">
          <h1 className="mb-3 text-2xl font-semibold text-[#171717] md:text-4xl leading-tight">
            Core{' '}
            <span className="from-privue-950 to-privue-900 via-privue-800 bg-gradient-to-r bg-clip-text font-semibold text-transparent">
              Capabilities
            </span>
          </h1>
          <p className="mt-2 mb-4 mx-auto text-sm text-[#525252] md:text-lg dark:text-gray-400 leading-relaxed">
            Harness AI to streamline decisions, manage risk, and unlock growth opportunities.
          </p>
        </div>


        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {coreCapabilities.map((s, i) => (
            <FeatureCapabilityCard key={i} title={s.heading} description={s.desc} icon={s.icon} />
          ))}
        </div>
      </div>
    </section>
  );
}

type FeatureCapabilityCardProps = {
  icon?: IconType;
  title: string;
  description: string;
};

function FeatureCapabilityCard({ icon, title, description }: FeatureCapabilityCardProps) {
  const renderIcon = (icon?: IconType) => {
    if (!icon) return null;

    // string -> <img>
    if (typeof icon === 'string') {
      return (
        <img
          src={icon}
          alt=""
          className="h-8 w-8 object-contain transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
          aria-hidden
        />
      );
    }

    // already a JSX element (e.g. <Icon /> instance)
    if (React.isValidElement(icon)) {
      // Tell TS that this is a ReactElement with unknown props so cloneElement accepts our props.
      const elem = icon as React.ReactElement<any, any>;
      return React.cloneElement(elem, {
        className: `w-6 h-6 ${elem.props?.className ?? ''}`.trim(),
        'aria-hidden': true,
      });
    }

    // function / component constructor (e.g. Zap)
    if (typeof icon === 'function') {
      const IconComp = icon as React.ComponentType<any>;
      return <IconComp className="h-6 w-6" aria-hidden />;
    }

    return null;
  };

  return (
    <div
      className={`group hover:shadow-privue-200/60 block rounded-xl border border-gray-100 bg-white p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl`}
    >
      {icon ? (
        <div className="bg-privue-100 group-hover:bg-privue-200 mb-4 flex h-15 w-15 items-center justify-center overflow-hidden rounded-full transition-colors duration-300">
          <div className="text-privue-700 transform transition-transform duration-300 group-hover:scale-110">
            {renderIcon(icon)}
          </div>
        </div>
      ) : null}

      <h2 className="group-hover:text-privue-800 mb-2 text-lg font-medium tracking-tight transition-colors duration-300">
        {title}
      </h2>
      <p className="text-muted-foreground group-hover:text-foreground/80 text-sm transition-colors duration-300">
        {description}
      </p>
    </div>
  );
}
