import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Horizon Exchange — Shared Hospitality Resources" },
      {
        name: "description",
        content:
          "A B2B marketplace matching idle hospitality resources with the businesses that need them, optimized for logistics.",
      },
      { property: "og:title", content: "Horizon Exchange — Shared Hospitality Resources" },
      {
        property: "og:description",
        content:
          "A B2B marketplace matching idle hospitality resources with the businesses that need them, optimized for logistics.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

const navItems = [
  { to: "/", label: "Dashboard" },
  { to: "/find", label: "Find Resources" },
  { to: "/post", label: "Post Requirement" },
] as const;

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-canvas font-sans text-ink antialiased">
        <header className="sticky top-0 z-40 border-b border-line bg-white/85 backdrop-blur-sm">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="grid size-10 place-items-center rounded-xl bg-ink text-white">
                <span className="font-serif text-lg font-semibold">H</span>
              </div>
              <div>
                <p className="font-serif text-lg font-semibold leading-none">Horizon Exchange</p>
                <p className="mt-1 text-xs text-ink-muted">The Grand Horizon Hotel · Mumbai</p>
              </div>
            </Link>
            <nav className="hidden items-center gap-1 md:flex">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  activeOptions={{ exact: item.to === "/" }}
                  className="rounded-lg px-3.5 py-2 text-sm font-medium text-ink-muted transition hover:text-ink"
                  activeProps={{ className: "bg-mist text-ink" }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <Link
              to="/post"
              className="rounded-lg bg-sky px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-sky/25 transition hover:bg-sky/90"
            >
              Post Requirement
            </Link>
          </div>
        </header>

        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <main className="mx-auto max-w-6xl px-6 py-8">
          <Outlet />
        </main>

        <footer className="mx-auto max-w-6xl px-6 pb-10 pt-4 text-center text-xs text-ink-muted">
          Horizon Exchange · A concept marketplace for shared hospitality resources
        </footer>
      </div>
    </QueryClientProvider>
  );
}

