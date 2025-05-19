import Link from "next/link"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <Link className="mr-6 flex items-center space-x-2" href="/">
              <span className="font-bold">LuchtLeven</span>
            </Link>
          </div>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/dashboard" className="transition-colors hover:text-foreground/80">
              Dashboard
            </Link>
            <Link href="/inkomsten" className="transition-colors hover:text-foreground/80">
              Inkomsten
            </Link>
            <Link href="/uitgaven" className="transition-colors hover:text-foreground/80">
              Uitgaven
            </Link>
            <Link href="/doelen" className="transition-colors hover:text-foreground/80">
              Doelen
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
          <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
            <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
              Beheer uw financiën met LuchtLeven
            </h1>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              Een moderne en intuïtieve manier om uw persoonlijke financiën te beheren. 
              Begin vandaag nog met het bereiken van uw financiële doelen.
            </p>
            <div className="space-x-4">
              <Link
                href="/auth/register"
                className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Start Gratis
              </Link>
              <Link
                href="/auth/login"
                className="inline-flex h-11 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                Inloggen
              </Link>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2024 LuchtLeven. Alle rechten voorbehouden.
          </p>
        </div>
      </footer>
    </div>
  )
} 