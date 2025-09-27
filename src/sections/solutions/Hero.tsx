import React from "react";
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
        : typeof workflow === "function"
            ? React.createElement(workflow as React.ComponentType<any>, {})
            : workflow;

    return (
        <div className="relative flex flex-col gap-10 overflow-hidden border-x border-gray-200 px-6 sm:px-12 lg:px-20">
            {/* Heading */}
            <div className="pt-20 mx-auto flex max-w-2xl flex-col gap-4 text-center">
                <h1 className="text-5xl 2xl:text-5xl font-semibold text-gray-800">{heading}</h1>
                <p className="text-base text-center 2xl:text-lg max-w-[750px] font-medium text-gray-600">
                    {subHeading}
                </p>
            </div>

            {/* Hero Content */}
            {image && (
                <>
                    <div className="relative mx-auto w-full max-w-7xl h-[30rem] overflow-hidden rounded-xl border-0 ring-0">
                        <img
                            src={image}
                            alt=""
                            className="absolute inset-0 w-full h-full object-cover rounded-xl border-0 outline-none"
                        />
                        <div className="absolute inset-0 pointer-events-auto">
                            <div className="w-full h-full p-4">
                                {React.isValidElement(workflow) ? workflow : typeof workflow === 'function' ? React.createElement(workflow as any, {}) : null}
                            </div>
                        </div>
                    </div>

                </>
            )}

            {workflowContent && (
                <div
                    className="relative mx-auto ml-3 mt-0 border-0 h-fit w-full max-w-7xl animate-slide-up-fade sm:ml-auto sm:w-full sm:px-2"
                    style={{ animationDuration: "1400ms" }}
                >
                    <div className="relative mx-auto w-full border-0 max-w-7xl h-[30rem] overflow-hidden">
                        <img src={image} alt="" className="absolute border-0 inset-0 w-full h-full object-cover" />
                        <div className="absolute inset-0 pointer-events-auto">
                            <div className="w-full h-full border-2 border-background p-4">
                                {/* instantiate the workflow — it will fill parent and be transparent */}
                                {React.isValidElement(workflow) ? workflow : typeof workflow === 'function' ? React.createElement(workflow as any, {}) : null}
                            </div>
                        </div>
                    </div>

                </div>
            )}
        </div>
    );
}
