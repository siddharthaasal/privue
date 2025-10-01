import React from 'react';
// import { GridPattern } from "@/components/magicui/grid-pattern";
// import { cn } from "@/lib/utils";

interface HeroProps {
  heading: string;
  subHeading: string;
  image?: string; // optional
  // accept either an already-instantiated node or a component type (function/class)
  workflow?: React.ReactNode | React.ComponentType<any>;
}

export default function Hero({ heading, subHeading, image, workflow }: HeroProps) {
  // Normalize workflow into something renderable:
  // - if it's already a React element/node, use it
  // - if it's a component type (function/class), instantiate it
  const workflowContent: React.ReactNode = React.isValidElement(workflow)
    ? workflow
    : typeof workflow === 'function'
      ? React.createElement(workflow as React.ComponentType<any>, {})
      : workflow;

  return (
    <div className="relative flex flex-col gap-10 overflow-hidden border-x border-gray-200 px-6 sm:px-12 lg:px-20">
      {/* Heading */}
      <div className="mx-auto flex max-w-2xl flex-col gap-4 pt-20 text-center">
        <h1 className="text-5xl font-semibold text-gray-800 2xl:text-5xl">{heading}</h1>
        <p className="max-w-[750px] text-center text-base font-medium text-gray-600 2xl:text-lg">
          {subHeading}
        </p>
      </div>

      {/* Hero Content */}
      {image && (
        <>
          <div className="relative mx-auto h-[30rem] w-full max-w-7xl overflow-hidden rounded-xl border-0 ring-0">
            <img
              src={image}
              alt=""
              className="absolute inset-0 h-full w-full rounded-xl border-0 object-cover outline-none"
            />
            <div className="pointer-events-auto absolute inset-0">
              <div className="h-full w-full p-4">
                {React.isValidElement(workflow)
                  ? workflow
                  : typeof workflow === 'function'
                    ? React.createElement(workflow as any, {})
                    : null}
              </div>
            </div>
          </div>
        </>
      )}

      {workflowContent && (
        <div
          className="animate-slide-up-fade relative mx-auto mt-0 ml-3 h-fit w-full max-w-7xl border-0 sm:ml-auto sm:w-full sm:px-2"
          style={{ animationDuration: '1400ms' }}
        >
          <div className="relative mx-auto h-[30rem] w-full max-w-7xl overflow-hidden border-0">
            <img
              src={image}
              alt=""
              className="absolute inset-0 h-full w-full border-0 object-cover"
            />
            <div className="pointer-events-auto absolute inset-0">
              <div className="border-background h-full w-full border-2 p-4">
                {/* instantiate the workflow — it will fill parent and be transparent */}
                {React.isValidElement(workflow)
                  ? workflow
                  : typeof workflow === 'function'
                    ? React.createElement(workflow as any, {})
                    : null}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
