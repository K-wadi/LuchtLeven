import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Registreren | LuchtLeven",
  description: "Maak een nieuw LuchtLeven account aan",
};

export default function RegisterPage() {
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
              "Met LuchtLeven heb ik meer controle over mijn CF en voel ik me beter
              verbonden met mijn zorgteam."
            </p>
            <footer className="text-sm">Thomas de Vries</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Maak een account aan
            </h1>
            <p className="text-sm text-muted-foreground">
              Vul je gegevens in om te beginnen
            </p>
          </div>
          {/* Registration form will be added here */}
          <p className="px-8 text-center text-sm text-muted-foreground">
            Al een account?{" "}
            <Link
              href="/login"
              className="underline underline-offset-4 hover:text-primary"
            >
              Log hier in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
} 