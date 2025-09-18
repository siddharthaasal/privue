const mdxComponents = {
    h1: (props: any) => (
        <h1 className="text-3xl font-medium text-zinc-800 mt-10 mb-6" {...props} />
    ),

    h2: (props: any) => (
        <h2
            className="
      text-2xl font-normal scroll-mt-24 mt-10 mb-4 text-zinc-700
      [&>a]:no-underline [&>a:hover]:no-underline
      [&>a]:[color:inherit] [&>a:hover]:[color:inherit]
    "
            {...props}
        />
    ),

    h3: (props: any) => (
        <h3 className="text-xl font-normal mt-8 mb-3 text-zinc-600 [&>a]:no-underline [&>a:hover]:no-underline
      [&>a]:[color:inherit] [&>a:hover]:[color:inherit]" {...props} />
    ),

    h4: (props: any) => (
        <h3 className="text-base font-normal mt-6 mb-2 text-zinc-600 [&>a]:no-underline [&>a:hover]:no-underline
      [&>a]:[color:inherit] [&>a:hover]:[color:inherit]" {...props} />
    ),
    p: (props: any) => (
        <p className="text-[15px] leading-7 my-4 text-zinc-600 text-pretty" {...props} />
    ),
    ul: ({ children, ...props }: any) => (
        <ul className="space-y-2 my-4 px-4 text-[15px] text-zinc-600" {...props}>
            {children}
        </ul>
    ),
    li: ({ children, ...props }: any) => (
        <li
            className="relative list-none before:content-['–'] before:absolute before:left-[-1rem] before:text-zinc-400"
            {...props}
        >
            {children}
        </li>
    ),


    ol: ({ children, ...props }: any) => (
        <ol className="list-decimal list-inside space-y-2 my-4 text-[15px] text-zinc-600" {...props}>
            {children}
        </ol>
    ),
    code: (props: any) => (
        <code className="bg-zinc-100 text-zinc-700 px-1 py-0.5 rounded text-sm font-mono" {...props} />
    ),
    pre: (props: any) => (
        <pre className="bg-zinc-900 text-zinc-100 text-sm font-mono p-4 rounded-lg my-6 overflow-x-auto" {...props} />
    ),
    a: (props: any) => (
        <a
            className="text-zinc-600 underline underline-offset-2 hover:text-zinc-800 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
            {...props}
        />
    ),
    strong: (props: any) => <strong className="text-zinc-700 font-medium" {...props} />,
    img: (props: any) => (
        <img
            className="
      rounded-md
      my-6
      mx-auto
      h-auto
      shadow-sm
      w-full aspect-[2/1] lg:aspect-[5/3] overflow-hidden 
    "
            loading="lazy"
            {...props}
        />
    ),
    table: (props: any) => (
        <div className="my-6 overflow-x-auto">
            <table className="min-w-full border-collapse text-sm" {...props} />
        </div>
    ),

    thead: (props: any) => (
        <thead className="bg-zinc-50/80" {...props} />
    ),

    tbody: (props: any) => (
        <tbody className="bg-white divide-y divide-zinc-100" {...props} />
    ),

    tr: (props: any) => (
        // ensures rows use the same spacing as your text system
        <tr className="odd:bg-white even:bg-zinc-50/40" {...props} />
    ),

    th: (props: any) => (
        <th
            scope="col"
            className="text-left font-medium text-zinc-700 px-4 py-3 border-b border-zinc-100"
            {...props}
        />
    ),

    td: (props: any) => (
        <td className="px-4 py-3 text-zinc-600 align-top" {...props} />
    ),

    caption: (props: any) => (
        <caption className="sr-only text-sm text-zinc-600" {...props} />
    ),

};

export default mdxComponents;
