const mdxComponents = {
  h1: (props: any) => (
    <h1
      className="mt-10 mb-6 text-3xl font-medium text-zinc-800 [&>a]:[color:inherit] [&>a]:no-underline [&>a:hover]:[color:inherit] [&>a:hover]:no-underline"
      {...props}
    />
  ),

  h2: (props: any) => (
    <h2
      className="mt-10 mb-4 scroll-mt-24 text-2xl font-normal text-zinc-700 [&>a]:[color:inherit] [&>a]:no-underline [&>a:hover]:[color:inherit] [&>a:hover]:no-underline"
      {...props}
    />
  ),

  h3: (props: any) => (
    <h3
      className="mt-8 mb-3 text-xl font-normal text-zinc-600 [&>a]:[color:inherit] [&>a]:no-underline [&>a:hover]:[color:inherit] [&>a:hover]:no-underline"
      {...props}
    />
  ),

  h4: (props: any) => (
    <h3
      className="mt-6 mb-2 text-base font-normal text-zinc-600 [&>a]:[color:inherit] [&>a]:no-underline [&>a:hover]:[color:inherit] [&>a:hover]:no-underline"
      {...props}
    />
  ),
  p: (props: any) => (
    <p className="my-4 text-[15px] leading-7 text-pretty text-zinc-600" {...props} />
  ),
  ul: ({ children, ...props }: any) => (
    <ul className="my-4 space-y-2 px-4 text-[15px] text-zinc-600" {...props}>
      {children}
    </ul>
  ),
  li: ({ children, ...props }: any) => (
    <li
      className="relative list-none before:absolute before:left-[-1rem] before:text-zinc-400 before:content-['–']"
      {...props}
    >
      {children}
    </li>
  ),

  ol: ({ children, ...props }: any) => (
    <ol className="my-4 list-inside list-decimal space-y-2 text-[15px] text-zinc-600" {...props}>
      {children}
    </ol>
  ),
  code: (props: any) => (
    <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-sm text-zinc-700" {...props} />
  ),
  pre: (props: any) => (
    <pre
      className="my-6 overflow-x-auto rounded-lg bg-zinc-900 p-4 font-mono text-sm text-zinc-100"
      {...props}
    />
  ),
  a: (props: any) => (
    <a
      className="text-zinc-600 underline underline-offset-2 transition-colors hover:text-zinc-800"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),
  strong: (props: any) => <strong className="font-medium text-zinc-700" {...props} />,
  img: (props: any) => (
    <img
      className="mx-auto my-6 aspect-[2/1] h-auto w-full overflow-hidden rounded-md shadow-sm lg:aspect-[5/3]"
      loading="lazy"
      {...props}
    />
  ),
  table: (props: any) => (
    <div className="my-6 overflow-x-auto">
      <table className="min-w-full border-collapse text-sm" {...props} />
    </div>
  ),

  thead: (props: any) => <thead className="bg-zinc-50/80" {...props} />,

  tbody: (props: any) => <tbody className="divide-y divide-zinc-100 bg-white" {...props} />,

  tr: (props: any) => (
    // ensures rows use the same spacing as your text system
    <tr className="odd:bg-white even:bg-zinc-50/40" {...props} />
  ),

  th: (props: any) => (
    <th
      scope="col"
      className="border-b border-zinc-100 px-4 py-3 text-left font-medium text-zinc-700"
      {...props}
    />
  ),

  td: (props: any) => <td className="px-4 py-3 align-top text-zinc-600" {...props} />,

  caption: (props: any) => <caption className="sr-only text-sm text-zinc-600" {...props} />,
};

export default mdxComponents;
