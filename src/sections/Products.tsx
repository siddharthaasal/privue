import DataAPIVisual from '@/components/products/DataAPIVisual';

export default function Products() {
  return (
    <section className="dark bg-background font-open-sans max-w-8xl relative flex min-h-screen flex-col items-center px-6 pt-12 pb-24 md:px-12 lg:px-20">
      <div className="font-open-sans mx-auto mt-12 mb-8 text-center">
        <h1 className="text-foreground mb-4 text-3xl font-normal md:text-4xl">
          Featured{' '}
          <span className="from-privue-950 to-privue-900 via-privue-800 bg-gradient-to-r bg-clip-text font-medium text-transparent">
            Solutions
          </span>
        </h1>
        <p className="text-foreground-lighter mt-2 mb-4 text-base md:text-lg">
          {/* Top picks to elevate your workflow */}
          Designed to deliver value. Plug in what you need, when you need it.
        </p>
      </div>
      {/* Products Grid */}
      <div className="mx-auto max-w-max">
        <div className="mx-auto grid h-auto w-full max-w-screen-2xl grid-cols-4 grid-rows-2 gap-4 px-24 py-8">
          {/* Row 1 */}
          <div className="col-span-1 row-span-1">
            <DataAPIVisual />
          </div>
          <div className="col-span-1 row-span-1">
            <DataAPIVisual />
          </div>
          <div className="col-span-1 row-span-1">
            <DataAPIVisual />
          </div>
          <div className="col-span-1 row-span-1">
            <DataAPIVisual />
          </div>

          {/* Row 2 */}
          <div className="col-span-1">
            <DataAPIVisual />
          </div>
          <div className="col-span-1">
            <DataAPIVisual />
          </div>
          <div className="col-span-1">
            <DataAPIVisual />
          </div>
          <div className="col-span-1">
            <DataAPIVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
