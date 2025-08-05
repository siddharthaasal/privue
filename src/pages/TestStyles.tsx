export default function TestStyles() {
    return (
        <>
            <div className="h-screen bg-teal-800 space-y-4">
                <div className="w-fit mx-auto p-4 h-auto border border-black bg-background">
                    <p className="text-foreground">background and foreground</p>
                    <p className="text-foreground-lighter">background and foreground lighter</p>
                </div>

                <div className="dark w-fit mx-auto p-4 h-auto border border-black bg-background">
                    <p className="text-foreground">dark background and dark foreground</p>
                    <p className="text-foreground-lighter">dark background and dark foreground lighter</p>
                </div>

                <div className="w-fit mx-auto p-4 h-auto border border-black bg-background-lighter">
                    <p className="text-foreground">background lighter and foreground</p>
                    <p className="text-foreground-lighter">background lighter and foreground lighter</p>
                </div>

                <div className="dark w-fit mx-auto p-4 h-auto border border-black bg-background-lighter">
                    <p className="text-foreground">dark background ligher and dark foreground</p>
                    <p className="text-foreground-lighter">dark background lighter and dark foreground lighter</p>
                </div>
            </div>
        </>
    )
}