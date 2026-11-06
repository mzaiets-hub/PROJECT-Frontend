import { Link, Outlet } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import logo from "@/assets/logo.svg"

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Public Header */}
      <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <Link
            to="/"
            className="flex items-center gap-2.5 font-bold tracking-tight text-base sm:text-lg hover:opacity-90 transition-opacity min-w-0"
          >
            <img src={logo} alt="Technology Leaders of the Future Logo" className="h-8 w-8 shrink-0" />
            <span className="truncate">Technology Leaders of the Future Project</span>
          </Link>

          <nav className="flex items-center gap-3 shrink-0">
            <Button asChild variant="default" size="sm" className="gap-1.5 shadow-sm">
              <Link to="/app/dashboard">
                <span>Open App</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6">
        <Outlet />
      </main>

      {/* Public Footer */}
      <footer className="w-full border-t border-border/40 py-6 text-center text-xs text-muted-foreground">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-center">
          <p>© {new Date().getFullYear()} Technology Leaders of the Future Project. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
