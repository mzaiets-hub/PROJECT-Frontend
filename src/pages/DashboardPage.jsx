import { Link } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Activity,
  ArrowRight,
  CheckCircle2,
  Code2,
  Layers,
} from "lucide-react"

export default function DashboardPage() {
  const stats = [
    {
      title: "UI Components",
      value: "5 Ready",
      description: "Button, Input, Badge, Dialog, Card",
      icon: Layers,
    },
    {
      title: "Tech Stack",
      value: "Vite + React 19",
      description: "Tailwind CSS v4 engine active",
      icon: Code2,
    },
    {
      title: "System Health",
      value: "Optimal",
      description: "HMR active, 0 lint warnings",
      icon: Activity,
    },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="rounded-2xl border border-border bg-gradient-to-r from-primary/10 via-card to-card p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden">
        <div className="max-w-xl space-y-3">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Welcome to App Dashboard
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            This is your workspace template. You can customize the layout, connect real APIs, or add new modules using shadcn components.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <Button asChild size="sm" className="gap-1.5">
              <Link to="/app/components">
                <span>View Component Library</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link to="/">
                Back to Landing
              </Link>
            </Button>
          </div>
        </div>

        {/* Workspace Preview Image (loaded directly from public/images/) */}
        <div className="w-full md:w-auto shrink-0 flex justify-center">
          <img
            src="/images/workspace-banner.svg"
            alt="Workspace Overview"
            className="w-full max-w-xs sm:max-w-sm rounded-xl border border-border/60 shadow-md"
          />
        </div>
      </div>

      {/* Stats Grid - 3 cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center text-primary">
                  <Icon className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold tracking-tight">{stat.value}</div>
                <CardDescription className="text-xs mt-1">
                  {stat.description}
                </CardDescription>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Getting Started Card */}
      <Card>
        <CardHeader>
          <CardTitle>Getting Started with Your Project</CardTitle>
          <CardDescription>
            A few recommended next steps for your curriculum project
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="flex items-start gap-3 p-3.5 rounded-lg bg-muted/40 border border-border">
              <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium">Explore Components tab</h4>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Check out pre-installed UI controls in the top navigation. Once you understand them, feel free to adapt or delete them.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-lg bg-muted/40 border border-border">
              <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium">Add New Pages</h4>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Create new views in <code>src/pages</code> and link them in the top navigation bar.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-lg bg-muted/40 border border-border">
              <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium">Install shadcn elements</h4>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Run <code className="font-mono text-primary">npx shadcn add &lt;component&gt;</code> whenever new primitives are needed.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
