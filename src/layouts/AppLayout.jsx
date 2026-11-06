import { Link, NavLink, Outlet } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Layers, LogOut } from "lucide-react"
import logo from "@/assets/logo.svg"

export default function AppLayout() {
  const navLinkClass = ({ isActive }) =>
    `inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
      isActive
        ? "bg-primary text-primary-foreground shadow-xs"
        : "text-muted-foreground hover:text-foreground hover:bg-muted"
    }`

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* App Top Navigation Bar */}
      <header className="sticky top-0 z-40 w-full border-b border-border bg-card/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Left Brand */}
          <div className="flex items-center gap-8">
            <Link
              to="/app/dashboard"
              className="flex items-center gap-2.5 font-bold tracking-tight text-lg hover:opacity-90 transition-opacity"
            >
              <img src={logo} alt="Technology Leaders of the Future Logo" className="h-8 w-8 shrink-0" />
              <span className="hidden sm:inline">Workspace</span>
            </Link>

            {/* Top Navigation Menu */}
            <nav className="flex items-center gap-1.5">
              <NavLink to="/app/dashboard" className={navLinkClass}>
                <LayoutDashboard className="h-4 w-4" />
                <span>Dashboard</span>
              </NavLink>

              <NavLink to="/app/components" className={navLinkClass}>
                <Layers className="h-4 w-4" />
                <span>Components</span>
              </NavLink>
            </nav>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-3">
            <Button asChild variant="ghost" size="sm" className="gap-1.5 text-muted-foreground hover:text-foreground">
              <Link to="/">
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Home</span>
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content View */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  )
}
