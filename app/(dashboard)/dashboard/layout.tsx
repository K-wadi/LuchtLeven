import { ReactNode } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col fixed inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 border-r bg-muted/50">
          <div className="flex items-center h-16 flex-shrink-0 px-4 border-b">
            <Link href="/dashboard" className="font-bold text-lg">
              LuchtLeven
            </Link>
          </div>
          <div className="flex-1 flex flex-col overflow-y-auto">
            <nav className="flex-1 px-4 py-4 space-y-1">
              <Link
                href="/dashboard"
                className="flex items-center px-2 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground"
              >
                Dashboard
              </Link>
              <Link
                href="/dashboard/gezondheid"
                className="flex items-center px-2 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground"
              >
                Gezondheid
              </Link>
              <Link
                href="/dashboard/medicatie"
                className="flex items-center px-2 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground"
              >
                Medicatie
              </Link>
              <Link
                href="/dashboard/oefeningen"
                className="flex items-center px-2 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground"
              >
                Oefeningen
              </Link>
              <Link
                href="/dashboard/voeding"
                className="flex items-center px-2 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground"
              >
                Voeding
              </Link>
              <Link
                href="/dashboard/chat"
                className="flex items-center px-2 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground"
              >
                Chat
              </Link>
              <Link
                href="/dashboard/agenda"
                className="flex items-center px-2 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground"
              >
                Agenda
              </Link>
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t p-4">
            <div className="flex items-center w-full justify-between">
              <ThemeToggle />
              <Button variant="ghost" size="sm" asChild>
                <Link href="/profiel">Profiel</Link>
              </Button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="md:pl-64 flex flex-col flex-1">
        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 