export default function TestStyles() {
  return (
    <>
      <div className="h-screen space-y-4 bg-teal-800">
        <div className="bg-background mx-auto h-auto w-fit border border-black p-4">
          <p className="text-foreground">background and foreground</p>
          <p className="text-foreground-lighter">background and foreground lighter</p>
        </div>

        <div className="dark bg-background mx-auto h-auto w-fit border border-black p-4">
          <p className="text-foreground">dark background and dark foreground</p>
          <p className="text-foreground-lighter">dark background and dark foreground lighter</p>
        </div>

        <div className="bg-background-lighter mx-auto h-auto w-fit border border-black p-4">
          <p className="text-foreground">background lighter and foreground</p>
          <p className="text-foreground-lighter">background lighter and foreground lighter</p>
        </div>

        <div className="dark bg-background-lighter mx-auto h-auto w-fit border border-black p-4">
          <p className="text-foreground">dark background ligher and dark foreground</p>
          <p className="text-foreground-lighter">
            dark background lighter and dark foreground lighter
          </p>
        </div>
      </div>
    </>
  );
}
