import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import reactLogo from "@/assets/react.svg"
import viteLogo from "@/assets/vite.svg"
import heroIllustration from "@/assets/hero-illustration.svg"
import { ArrowRight } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="w-full max-w-xl flex flex-col gap-6">
      <div className="text-center flex flex-col items-center gap-3">
        <div className="flex items-center justify-center gap-4">
          <a
            href="https://vite.dev"
            target="_blank"
            rel="noreferrer"
            className="transition-transform hover:scale-110"
          >
            <img src={viteLogo} className="h-10 w-10" alt="Vite logo" />
          </a>
          <span className="text-xl text-muted-foreground font-light">+</span>
          <a
            href="https://react.dev"
            target="_blank"
            rel="noreferrer"
            className="transition-transform hover:scale-110"
          >
            <img
              src={reactLogo}
              className="h-10 w-10 animate-spin [animation-duration:12s]"
              alt="React logo"
            />
          </a>
        </div>

        <Badge variant="secondary">
          shadcn/ui + Tailwind v4 + React 19
        </Badge>

        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
          React + Vite + shadcn
        </h1>
        <p className="text-sm text-muted-foreground">
          Official recommended modern scaffold with Vite, React 19, and Tailwind CSS.
        </p>
      </div>

      {/* Hero Illustration from src/assets/ */}
      <div className="overflow-hidden rounded-xl border border-border bg-card/60 shadow-sm p-2">
        <img
          src={heroIllustration}
          alt="Developer Project Scaffold"
          className="w-full h-auto rounded-lg object-cover"
        />
      </div>

      {/* Primary Action */}
      <div className="flex justify-center pt-2">
        <Button asChild size="lg" className="gap-2 shadow-sm">
          <Link to="/app/dashboard">
            <span>Open App</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      <footer className="text-center text-xs text-muted-foreground">
        Ready for more shadcn components:{" "}
        <code className="bg-muted px-1.5 py-0.5 rounded text-foreground font-mono">
          npx shadcn add &lt;component&gt;
        </code>
      </footer>
    </div>
  )
}
