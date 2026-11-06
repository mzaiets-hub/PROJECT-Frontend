import * as React from "react"
import {
  AssistantRuntimeProvider,
  useLocalRuntime,
  CompositeAttachmentAdapter,
  SimpleImageAttachmentAdapter,
  SimpleTextAttachmentAdapter,
  ThreadPrimitive,
  MessagePrimitive,
  ComposerPrimitive,
  AttachmentPrimitive,
} from "@assistant-ui/react"
import { MarkdownTextPrimitive } from "@assistant-ui/react-markdown"
import remarkGfm from "remark-gfm"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Bot,
  Paperclip,
  Send,
  Square,
  User,
  X,
  Sparkles,
  FileText,
  Image as ImageIcon,
} from "lucide-react"

// 1. Simulated Local Chat Model Adapter
const simulatedModelAdapter = {
  async *run({ messages, abortSignal }) {
    const lastMessage = messages[messages.length - 1]
    const userText =
      lastMessage?.content?.find((p) => p.type === "text")?.text || ""
    const attachments = lastMessage?.attachments || []

    let fullResponse

    if (attachments.length > 0) {
      const fileNames = attachments.map((a) => a.name).join(", ")
      fullResponse = `I received your attachment: **${fileNames}**! 📎\n\nHere is an analysis of your file. In this project scaffold, both image uploads and document attachments are processed directly by **assistant-ui**.\n\n### Architectural Visualization:\nHere is a project diagram based on your uploaded context:\n\n![Workspace Preview](/images/workspace-banner.svg)\n\n*You can ask follow-up questions, attach another file, or request specific code implementations!*`
    } else if (
      userText.toLowerCase().includes("diagram") ||
      userText.toLowerCase().includes("architecture") ||
      userText.toLowerCase().includes("архитектур") ||
      userText.toLowerCase().includes("картинк")
    ) {
      fullResponse = `Here is the architectural diagram for the current **React 19 + Vite + Tailwind v4 + shadcn/ui** project:\n\n![System Architecture](/images/workspace-banner.svg)\n\n### Key Highlights:\n- **React 19**: Latest declarative component model.\n- **Tailwind CSS v4**: CSS-first design tokens without legacy config files.\n- **shadcn/ui**: Accessible Radix primitives with copy-paste extensibility.\n- **assistant-ui**: Production-grade conversational AI runtime with multimodal file attachments.`
    } else if (
      userText.toLowerCase().includes("component") ||
      userText.toLowerCase().includes("компонент")
    ) {
      fullResponse = `You can easily add new **shadcn/ui** components via the CLI:\n\n\`\`\`bash\nnpx shadcn add dropdown-menu\nnpx shadcn add sheet\nnpx shadcn add tabs\n\`\`\`\n\nAll components will be placed in \`src/components/ui/\` and adapt immediately to the dark/light color scheme.`
    } else {
      fullResponse = `Hello! I am your AI Assistant built with **assistant-ui**.\n\n### What I can do in this demo:\n1. 📎 **Attach images or text files**: Click the paperclip icon below to test file uploads.\n2. 🖼️ **Multimodal responses**: Type **"show diagram"** to see inline image rendering.\n3. 💻 **Code formatting**: Ask for code snippets with syntax highlighting.\n\n*Note: This assistant is currently running on a simulated local runtime (\`useLocalRuntime\`). When you are ready to connect a real LLM (such as OpenAI, Anthropic, or Vercel AI SDK), you only need to swap the runtime adapter.*`
    }

    // Stream the simulated response chunk-by-chunk
    const words = fullResponse.split(" ")
    let currentText = ""
    for (let i = 0; i < words.length; i++) {
      if (abortSignal?.aborted) break
      currentText += (i > 0 ? " " : "") + words[i]
      yield {
        content: [{ type: "text", text: currentText }],
      }
      await new Promise((resolve) => setTimeout(resolve, 20))
    }
  },
}

// 2. Markdown Renderer with Image Support
function MarkdownText() {
  return (
    <MarkdownTextPrimitive
      remarkPlugins={[remarkGfm]}
      className="prose prose-sm dark:prose-invert max-w-none break-words text-foreground [&>p]:leading-relaxed [&>p]:mb-2.5 [&>p:last-child]:mb-0 [&>pre]:my-2.5 [&>pre]:p-3 [&>pre]:rounded-lg [&>pre]:bg-muted/80 [&>pre]:border [&>pre]:border-border [&>ul]:list-disc [&>ul]:pl-5 [&>ol]:list-decimal [&>ol]:pl-5"
      components={{
        img: ({ ...props }) => (
          <img
            {...props}
            className="rounded-xl border border-border my-3 max-h-64 w-auto object-cover shadow-sm"
            alt={props.alt || "AI generated visualization"}
          />
        ),
      }}
    />
  )
}

// 3. Attachment Preview in Composer
function ComposerAttachmentItem() {
  return (
    <AttachmentPrimitive.Root className="relative inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-muted border border-border text-xs">
      <ImageIcon className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
      <AttachmentPrimitive.Name className="max-w-[130px] truncate font-medium text-foreground" />
      <AttachmentPrimitive.Remove asChild>
        <button
          type="button"
          className="text-muted-foreground hover:text-destructive rounded-full p-0.5 transition-colors cursor-pointer ml-1"
          title="Remove attachment"
        >
          <X className="h-3 w-3" />
        </button>
      </AttachmentPrimitive.Remove>
    </AttachmentPrimitive.Root>
  )
}

// 4. Attachment in User Message
function UserAttachmentItem() {
  return (
    <AttachmentPrimitive.Root className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-primary-foreground/20 text-xs text-primary-foreground border border-primary-foreground/30">
      <Paperclip className="h-3 w-3 shrink-0" />
      <AttachmentPrimitive.Name className="max-w-[160px] truncate font-medium" />
    </AttachmentPrimitive.Root>
  )
}

// 5. User Message Component
function UserMessage() {
  return (
    <MessagePrimitive.Root className="flex flex-col items-end gap-1.5 mb-4 max-w-[85%] ml-auto">
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground mr-1">
        <span>You</span>
        <User className="h-3.5 w-3.5 text-muted-foreground" />
      </div>

      <div className="flex flex-col gap-1.5 items-end">
        <MessagePrimitive.Attachments
          components={{
            Attachment: UserAttachmentItem,
          }}
        />

        <div className="rounded-2xl rounded-tr-xs bg-primary text-primary-foreground px-4 py-2.5 text-sm shadow-sm break-words">
          <MessagePrimitive.Content />
        </div>
      </div>
    </MessagePrimitive.Root>
  )
}

// 6. Assistant Message Component
function AssistantMessage() {
  return (
    <MessagePrimitive.Root className="flex items-start gap-3 mb-5 max-w-[92%] mr-auto">
      <div className="h-8 w-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5 border border-primary/20 shadow-xs">
        <Bot className="h-4 w-4" />
      </div>

      <div className="flex-1 space-y-1.5 min-w-0">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="font-semibold text-foreground">AI Assistant</span>
          <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4">
            Simulated Local LLM
          </Badge>
        </div>

        <div className="rounded-2xl rounded-tl-xs bg-card border border-border px-4 py-3 text-sm shadow-xs">
          <MessagePrimitive.Content
            components={{
              Text: MarkdownText,
            }}
          />
        </div>
      </div>
    </MessagePrimitive.Root>
  )
}

// 7. Main Thread Component
function AssistantThread() {
  return (
    <ThreadPrimitive.Root className="flex flex-col h-[520px] bg-card rounded-xl border border-border overflow-hidden shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
        <div className="flex items-center gap-2.5">
          <div className="h-7 w-7 rounded-lg bg-primary text-primary-foreground flex items-center justify-center">
            <Sparkles className="h-3.5 w-3.5" />
          </div>
          <div>
            <h3 className="text-sm font-semibold leading-none">Assistant UI Chat</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Multimodal AI chat with file & image attachments
            </p>
          </div>
        </div>
        <Badge variant="secondary" className="gap-1 text-[11px]">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Ready to Connect
        </Badge>
      </div>

      {/* Messages Viewport */}
      <ThreadPrimitive.Viewport className="flex-1 overflow-y-auto p-4 sm:p-5">
        <ThreadPrimitive.Empty>
          <div className="flex flex-col items-center justify-center h-full text-center px-4 py-8">
            <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-3 border border-primary/20">
              <Bot className="h-6 w-6" />
            </div>
            <h4 className="font-semibold text-base text-foreground">
              Welcome to the Assistant UI Showcase
            </h4>
            <p className="text-xs text-muted-foreground max-w-md mt-1 mb-5">
              This component is powered by <strong>assistant-ui</strong> with a local simulated runtime.
              Test attaching images or ask for architecture diagrams!
            </p>

            <div className="flex flex-wrap justify-center gap-2 max-w-lg">
              <ThreadPrimitive.Suggestion
                prompt="Show me the system architecture diagram"
                asChild
              >
                <Button variant="outline" size="sm" className="text-xs cursor-pointer">
                  🖼️ Show architecture diagram
                </Button>
              </ThreadPrimitive.Suggestion>

              <ThreadPrimitive.Suggestion
                prompt="How do I add more shadcn components?"
                asChild
              >
                <Button variant="outline" size="sm" className="text-xs cursor-pointer">
                  🧩 How to add components
                </Button>
              </ThreadPrimitive.Suggestion>

              <ThreadPrimitive.Suggestion
                prompt="Tell me about the tech stack"
                asChild
              >
                <Button variant="outline" size="sm" className="text-xs cursor-pointer">
                  ⚡ Explain tech stack
                </Button>
              </ThreadPrimitive.Suggestion>
            </div>
          </div>
        </ThreadPrimitive.Empty>

        <ThreadPrimitive.Messages
          components={{
            UserMessage,
            AssistantMessage,
          }}
        />
      </ThreadPrimitive.Viewport>

      {/* Composer Input Area */}
      <ComposerPrimitive.Root className="p-3 border-t border-border bg-muted/20">
        {/* Attachments preview row */}
        <ComposerPrimitive.Attachments
          components={{
            Attachment: ComposerAttachmentItem,
          }}
        />

        <div className="flex items-center gap-2 mt-2 bg-background border border-border rounded-xl px-2 py-1.5 focus-within:ring-2 focus-within:ring-ring/50 transition-all">
          <ComposerPrimitive.AddAttachment asChild>
            <Button
              variant="ghost"
              size="icon-sm"
              type="button"
              className="text-muted-foreground hover:text-foreground shrink-0 cursor-pointer"
              title="Attach an image or document"
            >
              <Paperclip className="h-4 w-4" />
              <span className="sr-only">Attach file</span>
            </Button>
          </ComposerPrimitive.AddAttachment>

          <ComposerPrimitive.Input
            placeholder="Type a message, ask for diagrams, or attach images..."
            className="flex-1 bg-transparent px-2 py-1 text-sm outline-none placeholder:text-muted-foreground resize-none min-h-[32px] max-h-28"
            rows={1}
          />

          <ComposerPrimitive.Send asChild>
            <Button
              size="icon-sm"
              variant="default"
              className="shrink-0 cursor-pointer shadow-xs"
              title="Send message"
            >
              <Send className="h-3.5 w-3.5" />
              <span className="sr-only">Send</span>
            </Button>
          </ComposerPrimitive.Send>

          <ComposerPrimitive.Cancel asChild>
            <Button
              size="icon-sm"
              variant="outline"
              className="shrink-0 cursor-pointer"
              title="Stop generation"
            >
              <Square className="h-3 w-3 fill-current" />
              <span className="sr-only">Stop</span>
            </Button>
          </ComposerPrimitive.Cancel>
        </div>

        <div className="flex justify-between items-center text-[11px] text-muted-foreground mt-2 px-1">
          <span className="flex items-center gap-1">
            <FileText className="h-3 w-3" /> Supports images, text, and JSON files
          </span>
          <span>Powered by assistant-ui</span>
        </div>
      </ComposerPrimitive.Root>
    </ThreadPrimitive.Root>
  )
}

// 8. Root Export with Provider
export default function AssistantChat() {
  const attachmentAdapter = React.useMemo(
    () =>
      new CompositeAttachmentAdapter([
        new SimpleImageAttachmentAdapter(),
        new SimpleTextAttachmentAdapter(),
      ]),
    []
  )

  const runtime = useLocalRuntime(simulatedModelAdapter, {
    adapters: {
      attachments: attachmentAdapter,
    },
  })

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <AssistantThread />
    </AssistantRuntimeProvider>
  )
}
