import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Inloggen | LuchtLeven",
  description: "Log in op je LuchtLeven account",
};

export default function LoginPage() {
  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-primary" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Link href="/">LuchtLeven</Link>
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              "LuchtLeven heeft mij geholpen om beter inzicht te krijgen in mijn CF en
              mijn gezondheid te verbeteren."
            </p>
            <footer className="text-sm">Sophie van der Berg</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Welkom terug
            </h1>
            <p className="text-sm text-muted-foreground">
              Log in met je e-mailadres en wachtwoord
            </p>
          </div>
          {/* Login form will be added here */}
          <p className="px-8 text-center text-sm text-muted-foreground">
            Nog geen account?{" "}
            <Link
              href="/register"
              className="underline underline-offset-4 hover:text-primary"
            >
              Maak een account aan
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
} 