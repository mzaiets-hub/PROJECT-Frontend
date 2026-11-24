import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function LoginPage() {
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState("")
  const [hasError, setHasError] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setIsSubmitting(true)
    setMessage("")
    setHasError(false)

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 15000)

    try {
      const response = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, password }),
        signal: controller.signal,
      })

      if (!response.ok) {
        setHasError(true)
        setMessage(`Login request failed (HTTP ${response.status}).`)
        return
      }

      let result
      try {
        result = await response.json()
      } catch {
        setHasError(true)
        setMessage("The login API returned an invalid response.")
        return
      }

      if (!result || typeof result.authorized !== "boolean") {
        setHasError(true)
        setMessage("The login API returned an invalid response.")
        return
      }

      if (result.authorized) {
        navigate("/app/dashboard", { replace: true })
        return
      }

      setHasError(true)
      setMessage("The name or password is incorrect.")
    } catch (error) {
      setHasError(true)
      setMessage(
        error.name === "AbortError"
          ? "The login request timed out. Check that the backend is running and try again."
          : "Could not reach the login API."
      )
    } finally {
      clearTimeout(timeoutId)
      setIsSubmitting(false)
    }
  }

  return (
    <section className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
      <div className="mb-7 space-y-2 text-center">
        <p className="text-sm font-medium text-muted-foreground">Welcome back</p>
        <h1 className="text-3xl font-bold tracking-tight">Sign in</h1>
        <p className="text-sm text-muted-foreground">
          Enter your name and password to continue.
        </p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">Name</label>
          <Input
            id="name"
            name="name"
            type="text"
            autoComplete="username"
            placeholder="Your name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
            disabled={isSubmitting}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium">Password</label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="Your password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            disabled={isSubmitting}
          />
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Signing in..." : "Sign in"}
        </Button>

        <p
          className={`min-h-5 text-center text-sm ${hasError ? "text-destructive" : "text-muted-foreground"}`}
          aria-live="polite"
          role={hasError ? "alert" : "status"}
        >
          {message}
        </p>
      </form>

      <p className="mt-5 text-center text-sm text-muted-foreground">
        Back to{" "}
        <Link to="/" className="font-medium text-foreground underline-offset-4 hover:underline">
          home
        </Link>
      </p>
    </section>
  )
}
