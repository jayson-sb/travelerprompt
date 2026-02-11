import { Toaster } from "@/components/ui/sonner";
import { PromptsIndex } from "@/pages/PromptsIndex";

function App() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <header className="sticky top-0 z-50 border-b border-border/40 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-2.5 sm:px-6 sm:py-3">
          <a href="/" className="flex items-center gap-2">
            <span className="text-base font-bold tracking-tight text-foreground sm:text-xl">
              The Traveler Prompt
            </span>
          </a>
          <nav className="hidden items-center gap-4 sm:flex">
             <a href="#" className="hover-nav-link text-sm font-medium text-muted-foreground transition-colors">More coming your way</a>
            {/* <a href="#" className="hover-nav-link text-sm font-medium text-muted-foreground transition-colors">About</a>
            <a href="#" className="hover-nav-link text-sm font-medium text-muted-foreground transition-colors">How it works</a>
            <a href="#" className="hover-nav-link text-sm font-medium text-muted-foreground transition-colors">Categories</a> */}
          </nav>
        </div>
      </header>

      <main>
        <PromptsIndex />
      </main>

      <footer className="border-t border-border/40 bg-white">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-8 sm:gap-6 sm:px-6 sm:py-12 md:flex-row md:items-center md:justify-center">
          <div className="flex flex-col gap-1.5 sm:gap-2">
            <span className="text-base font-bold tracking-tight text-foreground sm:text-lg">
              © {new Date().getFullYear()} The Traveler Prompt
            </span>
            <p className="text-xs text-muted-foreground sm:text-sm">
              Save more on every trip with prompts
            </p>
          </div>
          {/* <div className="flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Twitter</a>
          </div> */}
        </div>
      </footer>
      <Toaster richColors />
    </div>
  );
}

export default App;
