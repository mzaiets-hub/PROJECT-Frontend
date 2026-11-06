# React + Vite + Tailwind CSS + shadcn/ui Project Scaffold

A modern, fast, and production-ready project scaffold configured with **React 19**, **Vite**, **Tailwind CSS v4**, **shadcn/ui**, **React Router**, and **assistant-ui**.

Repository: [tlf-org/react-vite-project-scaffold](https://github.com/tlf-org/react-vite-project-scaffold)

---

## Tech Stack

- **[React 19](https://react.dev/)** — The library for web and native user interfaces.
- **[Vite](https://vite.dev/)** — Next-generation frontend tooling with lightning-fast HMR.
- **[React Router DOM](https://reactrouter.com/)** — Declarative client-side routing and nested layouts.
- **[Tailwind CSS v4](https://tailwindcss.com/)** — Modern utility-first CSS framework configured via `@tailwindcss/vite`.
- **[shadcn/ui](https://ui.shadcn.com/)** — Reusable, accessible UI components built on Radix UI and styled with Tailwind CSS.
- **[assistant-ui](https://www.assistant-ui.com/)** — Production-grade AI chat primitives (`@assistant-ui/react`, `@assistant-ui/react-markdown`).
- **[Lucide React](https://lucide.dev/)** — Beautiful, consistent icons.
- **[ESLint](https://eslint.org/)** — Flat config linting for React hooks and refresh conventions.

---

## Layouts & Application Architecture

The project is structured with two decoupled layouts mimicking real-world production web applications:

1. **Public Layout (`/`)** — `src/layouts/PublicLayout.jsx`:
   - Designed for marketing, landing pages, and showcases.
   - Features the project logo (`src/assets/logo.svg`) and an **"Open App"** action button in the top-right corner.
   - Hosts `src/pages/LandingPage.jsx` with the hero illustration (`src/assets/hero-illustration.svg`) and a direct **"Open App"** action button to enter the workspace.

2. **App Layout (`/app/*`)** — `src/layouts/AppLayout.jsx`:
   - Designed for internal workspace and dashboard views.
   - Top navigation bar featuring the project logo and active links:
     - **Dashboard** (`/app/dashboard`) — `src/pages/DashboardPage.jsx`: overview featuring the workspace banner (`public/images/workspace-banner.svg`), metric cards, and getting-started guidance.
     - **Components** (`/app/components`) — `src/pages/ComponentsPage.jsx`: educational 2-column component library showcasing buttons, badges, inputs, cards, dialogs, and a full-width **assistant-ui** chat showcase at the bottom.
   - Top-right controls: quick link back to Home.

> **Tip for Students:** `src/pages/ComponentsPage.jsx` is an educational UI kit. Once students are comfortable with the components, they can safely delete this page and remove its route from `src/App.jsx` and `src/layouts/AppLayout.jsx`.

---

## AI Assistant (`assistant-ui`) Showcase

The project includes an interactive full-width AI Assistant sample located at the bottom of the **Components** page (`src/components/assistant-ui/AssistantChat.jsx`):

- **Multimodal File Attachments:** Users can attach images and documents using the paperclip button or drag-and-drop. In-composer previews and message attachments are fully supported.
- **Multimodal Outputs:** The assistant outputs structured markdown, code blocks, and rich images (e.g. `![System Architecture](/images/workspace-banner.svg)`).
- **Simulated Local Runtime:** Powered by `useLocalRuntime`, allowing students to test streaming responses, attachment handling, and quick prompt suggestions without requiring any API keys or backend servers.
- **Connecting a Real LLM:** When ready for production, simply replace the local model adapter with `@assistant-ui/ai-sdk` (`useChatRuntime`) or LangGraph.

---

## Images & Asset Handling in Vite

This project demonstrates both official Vite approaches for storing and loading images:

### 1. Bundled Assets (`src/assets/`) — Recommended for UI & Components
- **How it works:** Imported in JavaScript/JSX:
  ```jsx
  import logo from "@/assets/logo.svg"
  import heroIllustration from "@/assets/hero-illustration.svg"

  <img src={logo} alt="Logo" className="h-8 w-8" />
  ```
- **Benefits:**
  - Files are processed, optimized, and hashed by Vite for cache-busting during `npm run build`.
  - Compile-time checking prevents broken links if a file is renamed or moved.
  - Small SVGs and images can be automatically inlined as data URIs.
- **Used in this project for:** Brand logo (`logo.svg`), landing hero graphic (`hero-illustration.svg`), and framework icons (`react.svg`, `vite.svg`).

### 2. Static Public Assets (`public/`) — For Unprocessed & Dynamic Files
- **How it works:** Placed in the `public/` directory and referenced via absolute root-relative URLs:
  ```jsx
  <img src="/images/workspace-banner.svg" alt="Workspace Overview" />
  ```
- **Benefits:**
  - Served directly as static files without bundling or filename hashing.
  - Useful for favicons, `robots.txt`, OpenGraph preview images, or dynamically referenced files.
- **Used in this project for:** Favicons (`favicon.svg`) and the workspace banner graphic (`/images/workspace-banner.svg`).

---

## Pre-installed UI Components

The scaffold includes the following components in `src/components/ui/`:

- **`Button`** — Flexible button with variants (`default`, `outline`, `secondary`, `ghost`, `destructive`, `link`).
- **`Badge`** — Visual status labels and tags with variants (`default`, `secondary`, `outline`, `destructive`, `ghost`).
- **`Input`** — Styled input field supporting standard HTML input attributes.
- **`Card`** — Versatile container with header, title, description, content, and footer.
- **`Dialog`** — Accessible modal dialog window with trigger, backdrop overlay, header, and footer.

---

## Adding More shadcn Components

To add additional shadcn/ui components:

```bash
npx shadcn add <component-name>
```

Examples:
```bash
npx shadcn add dropdown-menu
npx shadcn add tabs
npx shadcn add sheet
npx shadcn add avatar
```

---

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Development Server

Start the local Vite development server with hot module replacement:

```bash
npm run dev
```

### 3. Production Build

Build optimized static assets for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

### 4. Code Quality & Linting

```bash
npm run lint
```

---

## Project Structure

```
├── public/                 # Static assets (unbundled, served directly)
│   ├── favicon.svg         # Browser tab icon
│   ├── icons.svg           # Global SVG sprite
│   └── images/
│       └── workspace-banner.svg  # Workspace illustration
├── src/
│   ├── assets/             # Bundled assets (imported in code, hashed on build)
│   │   ├── hero-illustration.svg # Landing page hero graphic
│   │   ├── logo.svg              # Brand vector logo
│   │   ├── react.svg             # React logo
│   │   └── vite.svg              # Vite logo
│   ├── components/
│   │   ├── assistant-ui/   # AI chat component with simulated local runtime
│   │   │   └── AssistantChat.jsx
│   │   └── ui/             # shadcn/ui components (Button, Badge, Input, Card, Dialog)
│   ├── layouts/
│   │   ├── PublicLayout.jsx# Landing page shell (Navbar with logo & "Open App" button)
│   │   └── AppLayout.jsx   # Dashboard shell (Navbar with logo, Dashboard & Components tabs)
│   ├── pages/
│   │   ├── LandingPage.jsx   # Public landing page with hero graphic & Open App CTA
│   │   ├── DashboardPage.jsx # App overview with workspace banner & metric cards
│   │   └── ComponentsPage.jsx# Interactive UI kit showcase (2-column grid + Assistant UI)
│   ├── lib/
│   │   └── utils.js        # cn utility for className merging
│   ├── App.jsx             # Client router & layout routing
│   ├── index.css           # Tailwind v4 imports, theme variables & design tokens
│   └── main.jsx            # Application entry point
├── components.json         # shadcn configuration
├── eslint.config.js        # ESLint flat configuration
├── index.html              # HTML template
├── jsconfig.json           # Path alias (@/*) configuration for JS
├── package.json            # Project manifest & scripts
└── vite.config.js          # Vite config with React, Tailwind, and @ alias
```
