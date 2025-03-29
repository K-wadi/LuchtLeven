import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">LuchtLeven</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost">Inloggen</Button>
            </Link>
            <Link href="/registreren">
              <Button>Registreren</Button>
            </Link>
            <ModeToggle />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container flex min-h-screen flex-col items-center justify-center space-y-8 text-center">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Verbeter uw leven met CF
          </h1>
          <p className="mx-auto max-w-[600px] text-lg text-muted-foreground sm:text-xl">
            LuchtLeven helpt u bij het monitoren van uw gezondheid, biedt AI-gestuurde inzichten en persoonlijke begeleiding voor een betere kwaliteit van leven.
          </p>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Link href="/registreren">
            <Button size="lg" className="w-full sm:w-auto">
              Start vandaag
            </Button>
          </Link>
          <Link href="/over-ons">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Meer informatie
            </Button>
          </Link>
        </div>
        <div className="mt-8 flex flex-col items-center space-y-4">
          <div className="flex items-center space-x-4">
            <div className="rounded-full bg-primary/10 p-2">
              <svg
                className="h-6 w-6 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="rounded-full bg-primary/10 p-2">
              <svg
                className="h-6 w-6 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <div className="rounded-full bg-primary/10 p-2">
              <svg
                className="h-6 w-6 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Vertrouwd door CF-patiënten en zorgverleners in Nederland
          </p>
        </div>
      </section>
    </div>
  );
} 