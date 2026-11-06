import * as React from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { AlertCircle, Code, Info, Layers, Sparkles } from "lucide-react"
import AssistantChat from "@/components/assistant-ui/AssistantChat"

export default function ComponentsPage() {
  const [inputText, setInputText] = React.useState("")
  const [isDemoDialogOpen, setIsDemoDialogOpen] = React.useState(false)

  return (
    <div className="space-y-6">
      {/* Top Banner - Subtle, compact, neutral small text */}
      <div className="rounded-lg border border-border bg-muted/40 px-3.5 py-2 text-xs text-muted-foreground flex items-center gap-2.5">
        <Info className="h-3.5 w-3.5 text-primary shrink-0" />
        <p>
          <strong className="font-medium text-foreground">Component Library:</strong> Pre-installed shadcn/ui components for student practice. Feel free to adapt or delete this file (<code>src/pages/ComponentsPage.jsx</code>).
        </p>
      </div>

      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Component Library</h1>
        <p className="text-sm text-muted-foreground">
          Pre-configured UI primitives built on Radix UI and Tailwind CSS v4.
        </p>
      </div>

      {/* 2-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 1. Button Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Code className="h-4 w-4 text-primary" />
              Button Component
            </CardTitle>
            <CardDescription className="text-xs">
              Styles and sizes configured with class-variance-authority.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <span className="text-xs font-medium text-muted-foreground block mb-2">Variants:</span>
              <div className="flex flex-wrap gap-2">
                <Button variant="default" size="sm">Default</Button>
                <Button variant="secondary" size="sm">Secondary</Button>
                <Button variant="outline" size="sm">Outline</Button>
                <Button variant="ghost" size="sm">Ghost</Button>
                <Button variant="destructive" size="sm">Destructive</Button>
                <Button variant="link" size="sm">Link</Button>
              </div>
            </div>

            <div className="pt-2 border-t border-border">
              <span className="text-xs font-medium text-muted-foreground block mb-2">Sizes:</span>
              <div className="flex flex-wrap items-center gap-2">
                <Button size="xs" variant="outline">XS</Button>
                <Button size="sm" variant="outline">Small</Button>
                <Button size="default" variant="outline">Default</Button>
                <Button size="lg" variant="outline">Large</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 2. Badge Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Sparkles className="h-4 w-4 text-primary" />
              Badge Component
            </CardTitle>
            <CardDescription className="text-xs">
              Labels, indicators, and status tags for UI elements.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <span className="text-xs font-medium text-muted-foreground block mb-2">Variants:</span>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="default">Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="destructive">Destructive</Badge>
                <Badge variant="ghost">Ghost</Badge>
              </div>
            </div>

            <div className="pt-2 border-t border-border">
              <span className="text-xs font-medium text-muted-foreground block mb-2">Status indicators:</span>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline" className="gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Active
                </Badge>
                <Badge variant="outline" className="gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                  Pending
                </Badge>
                <Badge variant="outline" className="gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                  Error
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 3. Input Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Code className="h-4 w-4 text-primary" />
              Input Component
            </CardTitle>
            <CardDescription className="text-xs">
              Accessible input field with live state preview.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Type here to test live state..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              <Button variant="outline" size="sm" onClick={() => setInputText("")}>
                Clear
              </Button>
            </div>
            {inputText ? (
              <p className="text-xs text-muted-foreground">
                Output: <strong className="text-foreground">{inputText}</strong>
              </p>
            ) : (
              <p className="text-xs text-muted-foreground italic">
                Type something above to verify real-time updates.
              </p>
            )}
          </CardContent>
        </Card>

        {/* 4. Dialog Modal Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Sparkles className="h-4 w-4 text-primary" />
              Dialog Component
            </CardTitle>
            <CardDescription className="text-xs">
              Accessible modal dialog window powered by Radix UI.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-xs text-muted-foreground">
              Supports modal backdrop overlays, keyboard escape close, and focus trapping.
            </p>

            <Dialog open={isDemoDialogOpen} onOpenChange={setIsDemoDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="default" size="sm">
                  Open Showcase Dialog
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-primary" />
                    Showcase Modal Dialog
                  </DialogTitle>
                  <DialogDescription>
                    This dialog window was opened from the Component Library.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-2 space-y-2 text-sm text-muted-foreground">
                  <p>
                    You can render any React components inside: forms, confirmations, charts, or detailed cards.
                  </p>
                </div>
                <DialogFooter showCloseButton>
                  <Button onClick={() => setIsDemoDialogOpen(false)}>
                    Close Window
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        {/* 5. Card Component Showcase */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Layers className="h-4 w-4 text-primary" />
              Card Component
            </CardTitle>
            <CardDescription className="text-xs">
              Classic structured container with header, content, and footer.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              Cards provide a clean surface for dashboards, user profiles, metrics, and content lists.
            </p>
          </CardContent>
          <CardFooter className="flex justify-between items-center text-xs text-muted-foreground pt-4 border-t border-border">
            <span>Card Footer Slot</span>
            <span className="font-semibold text-primary">v0.1.0</span>
          </CardFooter>
        </Card>
      </div>

      {/* 7. Assistant UI Showcase - Full Width */}
      <div className="space-y-3 pt-6 border-t border-border">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold tracking-tight">AI Assistant (assistant-ui)</h2>
            <Badge variant="secondary" className="text-xs">
              Full-width Showcase
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Production-grade conversational AI component configured with simulated local runtime, file and image attachments, and multimodal image output.
          </p>
        </div>

        <AssistantChat />
      </div>
    </div>
  )
}
