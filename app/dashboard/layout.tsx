"use client"

import { useAuth } from "@/lib/auth-context"
import { signOut } from "firebase/auth"
import { auth } from "@/lib/firebase"
import Link from "next/link"
import { useRouter } from "next/navigation"
import ProtectedRoute from "@/components/protected-route"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user } = useAuth()
  const router = useRouter()

  const handleSignOut = async () => {
    try {
      await signOut(auth)
      router.push("/")
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-14 items-center">
            <div className="mr-4 flex">
              <Link className="mr-6 flex items-center space-x-2" href="/dashboard">
                <span className="font-bold">LuchtLeven</span>
              </Link>
            </div>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <Link href="/dashboard" className="transition-colors hover:text-foreground/80">
                Dashboard
              </Link>
              <Link href="/dashboard/inkomsten" className="transition-colors hover:text-foreground/80">
                Inkomsten
              </Link>
              <Link href="/dashboard/uitgaven" className="transition-colors hover:text-foreground/80">
                Uitgaven
              </Link>
              <Link href="/dashboard/doelen" className="transition-colors hover:text-foreground/80">
                Doelen
              </Link>
            </nav>
            <div className="ml-auto flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">
                {user?.email}
              </span>
              <button
                onClick={handleSignOut}
                className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Uitloggen
              </button>
            </div>
          </div>
        </header>
        <main className="flex-1">
          <div className="container py-6">
            {children}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
} 