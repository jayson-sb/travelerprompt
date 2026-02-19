import { useMemo, useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  promptLibrary,
  categories,
  type PromptEntry,
  type PromptCategory,
} from "@/content/prompts";
import {
  ChatGPTIcon,
  GeminiIcon,
  ClaudeIcon,
  PerplexityIcon,
  ShopBackLogo,
} from "@/components/ai-service-icons";
import { trackEvent } from "@/lib/analytics/analytics";
import { Search, Copy, ChevronDown, X } from "lucide-react";

const normalize = (value: string) => value.trim().toLowerCase();

const matchesSearch = (prompt: PromptEntry, query: string) => {
  if (!query) return true;
  const haystack = [prompt.title, prompt.summary, prompt.tags.join(" ")]
    .join(" ")
    .toLowerCase();
  return haystack.includes(query);
};

const preparePromptText = (prompt: PromptEntry) =>
  prompt.promptTemplate.replace(/\{\{.*?\}\}/g, (match) => {
    const key = match.replace(/[{}]/g, "").trim();
    return `[${key}]`;
  });

const hydrateTemplate = (template: string, values: Record<string, string>) =>
  template.replace(/\{\{(.*?)\}\}/g, (_match, key) => {
    const trimmed = String(key).trim();
    return values[trimmed]?.trim() ? values[trimmed].trim() : `[${trimmed}]`;
  });

const aiServices = [
  {
    name: "ChatGPT",
    icon: ChatGPTIcon,
    buildUrl: (text: string) =>
      `https://chatgpt.com/?q=${encodeURIComponent(text)}`,
    prefills: true,
  },
  {
    name: "Gemini",
    icon: GeminiIcon,
    buildUrl: () => `https://gemini.google.com/app`,
    prefills: false,
  },
  {
    name: "Claude",
    icon: ClaudeIcon,
    buildUrl: () => `https://claude.ai/new`,
    prefills: false,
  },
  {
    name: "Perplexity",
    icon: PerplexityIcon,
    buildUrl: (text: string) =>
      `https://www.perplexity.ai/?q=${encodeURIComponent(text)}`,
    prefills: true,
  },
] as const;

const PromptCustomizeDialog = ({
  prompt,
  open,
  onOpenChange,
}: {
  prompt: PromptEntry;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const [values, setValues] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!open) return;
    const initialValues = (prompt.variables ?? []).reduce<Record<string, string>>(
      (acc, variable) => {
        acc[variable.key] = "";
        return acc;
      },
      {}
    );
    setValues(initialValues);
  }, [open, prompt]);

  const renderedPrompt = useMemo(
    () => hydrateTemplate(prompt.promptTemplate, values),
    [prompt.promptTemplate, values]
  );

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(renderedPrompt);
      trackEvent({
        name: "prompt_copy",
        payload: {
          slug: prompt.id,
          variables: values,
        },
      });
      toast.success("Prompt copied to clipboard");
      onOpenChange(false);
    } catch {
      toast.error("Copy failed. Please try again.");
    }
  };

  const handleOpenIn = async (service: (typeof aiServices)[number]) => {
    try {
      await navigator.clipboard.writeText(renderedPrompt);
      trackEvent({
        name: "outbound_click",
        payload: { slug: prompt.id, destination: service.name, variables: values },
      });
      window.open(service.buildUrl(renderedPrompt), "_blank", "noreferrer");
      toast.success(
        service.prefills
          ? `Opening ${service.name}…`
          : `Prompt copied! Paste it in ${service.name}.`
      );
      onOpenChange(false);
    } catch {
      window.open(service.buildUrl(renderedPrompt), "_blank", "noreferrer");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] max-w-2xl overflow-hidden rounded-2xl border-slate-200 p-0">
        <div className="flex max-h-[85vh] flex-col">
          <DialogHeader className="border-b border-slate-100 px-5 pb-4 pt-5 text-left sm:px-6">
            <div className="mb-2 flex items-center gap-2">
              <Badge
                variant="secondary"
                className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600"
              >
                {prompt.category}
              </Badge>
            </div>
            <DialogTitle className="text-xl font-bold leading-tight text-slate-900">
              {prompt.title}
            </DialogTitle>
            <DialogDescription className="text-sm text-slate-500">
              Fill in details for this prompt before copying or opening it.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5 overflow-y-auto px-5 py-4 sm:px-6">
            {prompt.variables?.length ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {prompt.variables.map((variable) => (
                  <div key={variable.key} className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">
                      {variable.label}
                    </label>
                    <Input
                      placeholder={variable.placeholder}
                      value={values[variable.key] ?? ""}
                      onChange={(event) =>
                        setValues((prev) => ({
                          ...prev,
                          [variable.key]: event.target.value,
                        }))
                      }
                    />
                    {variable.example ? (
                      <p className="text-xs text-slate-500">
                        Example: {variable.example}
                      </p>
                    ) : null}
                  </div>
                ))}
              </div>
            ) : null}

            <div className="space-y-2">
              <p className="text-sm font-semibold text-slate-700">Prompt preview</p>
              <div className="max-h-72 overflow-y-auto rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
                <pre className="whitespace-pre-wrap text-sm leading-relaxed text-slate-700">
                  {renderedPrompt}
                </pre>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 p-4 sm:p-5">
            <div className="flex w-full items-center gap-2 sm:gap-3">
              <Button
                variant="ghost"
                className="flex-1 gap-2 rounded-lg border border-slate-200 text-xs font-medium text-slate-700 sm:text-sm"
                onClick={handleCopy}
              >
                <Copy className="h-4 w-4" />
                Copy
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="flex-1 gap-2 rounded-lg bg-[#ff3407] text-xs font-medium text-white shadow-md shadow-[#ff3407]/20 sm:text-sm">
                    Open in
                    <ChevronDown className="h-4 w-4 opacity-70" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 rounded-xl border-slate-100 p-1 shadow-xl shadow-black/5">
                  {aiServices.map((service) => (
                    <DropdownMenuItem
                      key={service.name}
                      className="cursor-pointer gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 focus:bg-[#ff3407]/5 focus:text-[#ff3407]"
                      onClick={() => handleOpenIn(service)}
                    >
                      <service.icon className="h-4 w-4" />
                      {service.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const PromptCard = ({ prompt }: { prompt: PromptEntry }) => {
  const text = preparePromptText(prompt);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const hasVariables = Boolean(prompt.variables?.length);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      trackEvent({ name: "prompt_copy", payload: { slug: prompt.id } });
      toast.success("Prompt copied to clipboard");
    } catch {
      toast.error("Copy failed. Please try again.");
    }
  };

  const handleOpenIn = async (service: (typeof aiServices)[number]) => {
    if (hasVariables) {
      setDialogOpen(true);
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      trackEvent({
        name: "outbound_click",
        payload: { slug: prompt.id, destination: service.name },
      });
      window.open(service.buildUrl(text), "_blank", "noreferrer");
      toast.success(
        service.prefills
          ? `Opening ${service.name}…`
          : `Prompt copied! Paste it in ${service.name}.`
      );
    } catch {
      window.open(service.buildUrl(text), "_blank", "noreferrer");
    }
  };

  const active = dropdownOpen || dialogOpen;

  return (
    <>
      <Card className={`hover-card flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 ${active ? "border-[#ff3407]/30 shadow-xl shadow-[#ff3407]/5" : ""}`}>
        <CardHeader className="gap-3 pb-3 pt-4 sm:gap-4 sm:pt-5">
          <div className="flex items-center justify-between">
            <Badge
              variant="secondary"
              className={`hover-badge rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600 transition-colors sm:px-2.5 sm:text-xs ${active ? "bg-[#ff3407]/10 text-[#ff3407]" : ""}`}
            >
              {prompt.category}
            </Badge>
          </div>
          <div className="space-y-1.5 sm:space-y-2">
            <CardTitle className={`hover-title text-lg font-bold leading-tight tracking-tight text-slate-900 transition-colors duration-300 sm:text-xl ${active ? "text-[#ff3407]" : ""}`}>
              {prompt.title}
            </CardTitle>
            <CardDescription className="line-clamp-3 text-sm leading-relaxed text-slate-500 sm:text-base">
              {prompt.summary}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-1.5 pb-4 pt-0 sm:gap-2 sm:pb-6">
          {prompt.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className={`hover-tag inline-flex items-center rounded-full border border-slate-100 bg-slate-50 px-2 py-0.5 text-[10px] font-medium text-slate-500 transition-colors sm:px-2.5 sm:text-[11px] ${active ? "border-[#ff3407]/10 bg-[#ff3407]/5 text-[#ff3407]/80" : ""}`}
            >
              #{tag}
            </span>
          ))}
        </CardContent>
        <CardFooter className="mt-auto p-4 pt-0 sm:p-5 sm:pt-0">
          <div className="flex w-full items-center gap-2 sm:gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="hover-copy flex-1 gap-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 sm:gap-2 sm:text-sm"
              onClick={handleCopy}
            >
              <Copy className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              Copy
            </Button>
            {hasVariables ? (
              <Button
                size="sm"
                className="hover-open flex-1 gap-1.5 rounded-lg bg-[#ff3407] text-xs font-medium text-white shadow-md shadow-[#ff3407]/20 transition-all sm:gap-2 sm:text-sm"
                onClick={() => setDialogOpen(true)}
              >
                Use this prompt
              </Button>
            ) : (
              <DropdownMenu onOpenChange={setDropdownOpen}>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="sm"
                    className="hover-open flex-1 gap-1.5 rounded-lg bg-[#ff3407] text-xs font-medium text-white shadow-md shadow-[#ff3407]/20 transition-all sm:gap-2 sm:text-sm"
                  >
                    Open in
                    <ChevronDown className="h-3.5 w-3.5 opacity-70 sm:h-4 sm:w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 rounded-xl border-slate-100 p-1 shadow-xl shadow-black/5">
                  {aiServices.map((service) => (
                    <DropdownMenuItem
                      key={service.name}
                      className="cursor-pointer gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 focus:bg-[#ff3407]/5 focus:text-[#ff3407]"
                      onClick={() => handleOpenIn(service)}
                    >
                      <service.icon className="h-4 w-4" />
                      {service.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </CardFooter>
      </Card>

      {hasVariables ? (
        <PromptCustomizeDialog
          prompt={prompt}
          open={dialogOpen}
          onOpenChange={setDialogOpen}
        />
      ) : null}
    </>
  );
};

// Typing animation component
const TypingText = () => {
  const phrases = [
    "Travel smarter",
    "Book better",
    "Explore more",
    "Journey effortlessly",
  ];

  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex];

    if (isPaused) {
      const pauseTimer = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, 2000);
      return () => clearTimeout(pauseTimer);
    }

    if (!isDeleting && displayText === currentPhrase) {
      setIsPaused(true);
      return;
    }

    if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
      return;
    }

    const timeout = setTimeout(() => {
      setDisplayText((prev) => {
        if (isDeleting) {
          return currentPhrase.substring(0, prev.length - 1);
        } else {
          return currentPhrase.substring(0, prev.length + 1);
        }
      });
    }, isDeleting ? 30 : 80);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, isPaused, currentPhraseIndex]);

  return (
    <>
      {displayText}
      <span className="animate-pulse">|</span>
    </>
  );
};

export const PromptsIndex = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<"all" | PromptCategory>("all");
  const [stickyState, setStickyState] = useState<"hidden" | "full">("hidden");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroSearchRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const stickyInputRef = useRef<HTMLInputElement>(null);
  const stickyToolbarRef = useRef<HTMLDivElement>(null);
  const programmaticScrollRef = useRef(false);
  const typingTimeoutRef = useRef<number | null>(null);
  const isTypingRef = useRef(false);

  const filteredPrompts = useMemo(() => {
    const query = normalize(search);
    return promptLibrary.filter((prompt) => {
      const categoryMatch =
        category === "all" || prompt.category === category;
      return categoryMatch && matchesSearch(prompt, query);
    });
  }, [search, category]);

  const handleReset = () => {
    setSearch("");
    setCategory("all");
  };

  // Returns the current navbar height based on viewport width
  // Mobile: ~45px (py-2.5 + text-base + border)
  // Desktop (≥640px): ~52px (py-3 + text-xl + border)
  const getNavbarHeight = () => (window.innerWidth >= 640 ? 52 : 45);

  // When the hero search bar is clicked, immediately show the sticky
  // toolbar and focus the input, while scrolling to align the cards
  // right below the sticky bar (navbar + sticky bar height).
  const handleHeroSearchFocus = () => {
    if (!categoriesRef.current) return;
    if (document.activeElement === stickyInputRef.current) return;
    // Lock the sticky bar visible so the scroll handler doesn't hide it mid-scroll
    programmaticScrollRef.current = true;
    setStickyState("full");
    // Wait a frame so the sticky toolbar renders and we can measure its real height
    requestAnimationFrame(() => {
      if (!categoriesRef.current) return;
      const navH = getNavbarHeight();
      const toolbarH = stickyToolbarRef.current?.offsetHeight ?? 80;
      const cardsTop = categoriesRef.current.getBoundingClientRect().top;
      const scrollTarget = window.scrollY + cardsTop - (navH + toolbarH + 20);
      const isSmallScreen = window.innerWidth < 640;

      window.scrollTo({ top: scrollTarget, behavior: isSmallScreen ? "auto" : "smooth" });

      if (isSmallScreen) {
        // On mobile, focus after scroll to avoid keyboard resize fighting smooth-scroll.
        window.setTimeout(() => {
          stickyInputRef.current?.focus({ preventScroll: true });
        }, 40);
      } else {
        stickyInputRef.current?.focus({ preventScroll: true });
      }

      // Release the lock after scrolling has had time to settle.
      window.setTimeout(() => {
        programmaticScrollRef.current = false;
      }, isSmallScreen ? 220 : 600);
    });
  };

  // Scroll handler — show sticky bar once the hero search bar scrolls out of view
  useEffect(() => {
    const handleScroll = () => {
      // Skip if we're in a programmatic scroll (hero focus click)
      if (programmaticScrollRef.current) return;
      if (!heroSearchRef.current) return;

      // Keep toolbar stable while user is interacting with the search box.
      if (isSearchActive || isTypingRef.current) {
        setStickyState("full");
        return;
      }

      const searchBarBottom = heroSearchRef.current.getBoundingClientRect().bottom;

      // Show sticky when the hero search bar scrolls behind the top navbar
      if (searchBarBottom <= getNavbarHeight()) {
        setStickyState("full");
      } else {
        setStickyState("hidden");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isSearchActive]);

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current !== null) {
        window.clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  const isVisible = stickyState !== "hidden";
  const hasFilters = search || category !== "all";

  return (
    <div className="flex flex-col gap-10 pb-16 sm:gap-12 sm:pb-24">
      {/* Hero */}
      <section ref={heroRef} className="relative overflow-hidden bg-slate-50/50 px-4 py-12 sm:px-6 sm:py-20 lg:py-32">
        {/* Animated line graphics background */}
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 1440 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            {/* Dash animation for flowing curves */}
            <style>{`
              @keyframes dash-flow {
                to { stroke-dashoffset: -200; }
              }
              @keyframes dash-flow-reverse {
                to { stroke-dashoffset: 200; }
              }
              @keyframes circle-pulse {
                0%, 100% { r: inherit; opacity: 0.1; }
                50% { opacity: 0.2; }
              }
              @keyframes dot-pulse {
                0%, 100% { opacity: 0.15; }
                50% { opacity: 0.35; }
              }
              @keyframes grid-drift {
                to { stroke-dashoffset: -40; }
              }
              .flow-1 {
                stroke-dasharray: 120 80;
                stroke-dashoffset: 0;
                animation: dash-flow 8s linear infinite;
              }
              .flow-2 {
                stroke-dasharray: 100 100;
                stroke-dashoffset: 0;
                animation: dash-flow 12s linear infinite;
              }
              .flow-3 {
                stroke-dasharray: 140 60;
                stroke-dashoffset: 0;
                animation: dash-flow-reverse 10s linear infinite;
              }
              .flow-4 {
                stroke-dasharray: 80 120;
                stroke-dashoffset: 0;
                animation: dash-flow-reverse 14s linear infinite;
              }
              .circle-breathe-1 {
                animation: circle-pulse 6s ease-in-out infinite;
              }
              .circle-breathe-2 {
                animation: circle-pulse 8s ease-in-out infinite 1s;
              }
              .circle-breathe-3 {
                animation: circle-pulse 7s ease-in-out infinite 2s;
              }
              .circle-breathe-4 {
                animation: circle-pulse 9s ease-in-out infinite 3s;
              }
              .dot-glow-1 {
                animation: dot-pulse 3s ease-in-out infinite;
              }
              .dot-glow-2 {
                animation: dot-pulse 4s ease-in-out infinite 1s;
              }
              .dot-glow-3 {
                animation: dot-pulse 3.5s ease-in-out infinite 0.5s;
              }
              .dot-glow-4 {
                animation: dot-pulse 4.5s ease-in-out infinite 2s;
              }
              .grid-line {
                animation: grid-drift 6s linear infinite;
              }
            `}</style>
          </defs>

          {/* Large flowing curves with dash animation */}
          <path
            className="flow-1"
            d="M-100 600 C200 450, 500 700, 720 400 S1100 200, 1540 350"
            stroke="#ff3407"
            strokeWidth="2"
            strokeOpacity="0.15"
            fill="none"
          />
          <path
            className="flow-2"
            d="M-50 650 C250 500, 550 750, 770 450 S1150 250, 1540 400"
            stroke="#ff3407"
            strokeWidth="1.5"
            strokeOpacity="0.1"
            fill="none"
          />
          <path
            className="flow-3"
            d="M-100 200 C150 350, 400 100, 720 300 S1050 500, 1540 250"
            stroke="#ff3407"
            strokeWidth="2"
            strokeOpacity="0.13"
            fill="none"
          />
          <path
            className="flow-4"
            d="M-50 150 C200 300, 450 50, 770 250 S1100 450, 1540 200"
            stroke="#ff3407"
            strokeWidth="1.5"
            strokeOpacity="0.08"
            fill="none"
          />

          {/* Diagonal accent lines with slow flow */}
          <line className="flow-2" x1="0" y1="0" x2="400" y2="800" stroke="#ff3407" strokeWidth="0.8" strokeOpacity="0.1" />
          <line className="flow-4" x1="200" y1="0" x2="600" y2="800" stroke="#ff3407" strokeWidth="0.8" strokeOpacity="0.07" />
          <line className="flow-3" x1="1440" y1="0" x2="1040" y2="800" stroke="#ff3407" strokeWidth="0.8" strokeOpacity="0.1" />
          <line className="flow-1" x1="1240" y1="0" x2="840" y2="800" stroke="#ff3407" strokeWidth="0.8" strokeOpacity="0.07" />

          {/* Geometric circles with breathing animation */}
          <circle className="circle-breathe-1" cx="200" cy="200" r="120" stroke="#ff3407" strokeWidth="1.2" strokeOpacity="0.12" fill="none" />
          <circle className="circle-breathe-2" cx="200" cy="200" r="180" stroke="#ff3407" strokeWidth="0.8" strokeOpacity="0.07" fill="none" />
          <circle className="circle-breathe-3" cx="1250" cy="550" r="100" stroke="#ff3407" strokeWidth="1.2" strokeOpacity="0.12" fill="none" />
          <circle className="circle-breathe-4" cx="1250" cy="550" r="160" stroke="#ff3407" strokeWidth="0.8" strokeOpacity="0.07" fill="none" />

          {/* Pulsing accent dots */}
          <circle className="dot-glow-1" cx="720" cy="400" r="4" fill="#ff3407" fillOpacity="0.2" />
          <circle className="dot-glow-2" cx="720" cy="300" r="4" fill="#ff3407" fillOpacity="0.2" />
          <circle className="dot-glow-3" cx="200" cy="200" r="3.5" fill="#ff3407" fillOpacity="0.22" />
          <circle className="dot-glow-4" cx="1250" cy="550" r="3.5" fill="#ff3407" fillOpacity="0.22" />

          {/* Drifting horizontal grid lines */}
          <line className="grid-line" x1="0" y1="200" x2="1440" y2="200" stroke="#cbd5e1" strokeWidth="0.5" strokeOpacity="0.5" strokeDasharray="8 12" />
          <line className="grid-line" x1="0" y1="400" x2="1440" y2="400" stroke="#cbd5e1" strokeWidth="0.5" strokeOpacity="0.5" strokeDasharray="8 12" />
          <line className="grid-line" x1="0" y1="600" x2="1440" y2="600" stroke="#cbd5e1" strokeWidth="0.5" strokeOpacity="0.5" strokeDasharray="8 12" />
        </svg>
        {/* Radial fade mask over the lines */}
        <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_55%,transparent_100%)]" />
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-4 text-center relative z-10 sm:gap-6">
          <Badge
            variant="outline"
            className="gap-1.5 rounded-full border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary sm:gap-2 sm:px-4 sm:py-1.5 sm:text-sm"
          >
            <ShopBackLogo className="h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0" />
            Smart travel prompts
          </Badge>
          <h1 className="max-w-3xl text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="block bg-gradient-to-r from-[#ff3407] to-[#ffd6cd] bg-clip-text text-transparent min-h-[1.2em]">
              <TypingText />
            </span>
            <span className="block">with Prompts</span>
          </h1>
          <p className="max-w-2xl px-6 text-sm text-slate-600 sm:px-8 sm:text-lg md:px-0 md:text-xl">
            Our prompts help you ask smarter questions about flights, hotels, travel and more, so you never leave value on the table
          </p>

          <div
            ref={heroSearchRef}
            onClick={handleHeroSearchFocus}
            className="hover-search-ring mt-2 flex w-full max-w-sm cursor-text items-center gap-2 rounded-full border border-border/60 bg-white p-2 shadow-lg shadow-black/5 ring-1 ring-black/5 transition-all sm:mt-4 sm:max-w-md"
          >
            <Search className="ml-2 h-4 w-4 text-muted-foreground sm:ml-3 sm:h-5 sm:w-5" />
            <span className="flex-1 py-1.5 text-left text-xs text-muted-foreground/60 sm:py-2 sm:text-sm">
              Search prompts&hellip;
            </span>
          </div>
        </div>
        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-white pointer-events-none" />
      </section>

      {/* ── Sticky Toolbar ── */}
      <div
        ref={stickyToolbarRef}
        className={`fixed left-0 right-0 z-40 top-[45px] sm:top-[52px] transition-all duration-400 ease-[cubic-bezier(.4,0,.2,1)]
          ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"}`}
      >
        <div className="bg-white/95 backdrop-blur-lg shadow-[0_4px_20px_-4px_rgba(0,0,0,.06)]">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-1.5 px-4 py-2 md:flex-row md:items-center md:gap-3 sm:px-6 sm:py-2.5">

            {/* Search bar */}
            <div className="flex flex-1 items-center rounded-full border border-border/60 bg-white p-1.5 ring-1 ring-black/5 shadow-sm focus-within:ring-2 focus-within:ring-[#ff3407]/20 transition-all duration-300 md:max-w-md">
              <Search className="ml-2 h-4 w-4 shrink-0 text-muted-foreground sm:ml-2.5" />
              <Input
                ref={stickyInputRef}
                className="h-7 border-none bg-transparent shadow-none focus-visible:ring-0 placeholder:text-muted-foreground/60 text-xs ml-1.5 sm:h-8 sm:text-sm sm:ml-2"
                placeholder="Search prompts..."
                value={search}
                onFocus={() => {
                  setIsSearchActive(true);
                  setStickyState("full");
                }}
                onBlur={() => setIsSearchActive(false)}
                onChange={(e) => {
                  setSearch(e.target.value);
                  isTypingRef.current = true;
                  if (typingTimeoutRef.current !== null) {
                    window.clearTimeout(typingTimeoutRef.current);
                  }
                  typingTimeoutRef.current = window.setTimeout(() => {
                    isTypingRef.current = false;
                  }, 800);
                }}
              />
              {search && (
                <button
                  onClick={() => {
                    setSearch("");
                    stickyInputRef.current?.focus();
                  }}
                  className="hover-clear-x mr-1.5 shrink-0 rounded-full p-1 text-muted-foreground/60 transition-colors"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* Separator — hidden on mobile */}
            <div className="hidden h-5 w-px bg-border/60 shrink-0 md:block" />

            {/* Category pills + Clear */}
            <div className="flex items-start gap-1.5 min-w-0">
              <div className="flex flex-1 flex-wrap items-center gap-1 py-1 sm:gap-1.5 sm:py-0.5"
              >
                <button
                  onClick={() => setCategory("all")}
                  className={`hover-pill shrink-0 rounded-full px-3 py-1 text-[11px] font-semibold transition-all duration-200 sm:px-3.5 sm:py-1.5 sm:text-xs
                    ${category === "all"
                      ? "bg-[#ff3407] text-white shadow-sm"
                      : "bg-slate-100 text-slate-500"}`}
                >
                  All
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat as PromptCategory)}
                    className={`hover-pill shrink-0 rounded-full px-3 py-1 text-[11px] font-semibold transition-all duration-200 sm:px-3.5 sm:py-1.5 sm:text-xs
                      ${category === cat
                        ? "bg-[#ff3407] text-white shadow-sm"
                        : "bg-slate-100 text-slate-500"}`}
                  >
                    {cat}
                  </button>
                ))}

                {/* Clear button — inline with pills so it scrolls into view */}
                {hasFilters && (
                  <button
                    onClick={handleReset}
                    className="hover-clear shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium text-[#ff3407] transition-all animate-in fade-in slide-in-from-right-2 duration-200 sm:px-3 sm:py-1.5 sm:text-xs"
                  >
                    Clear all
                  </button>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section ref={categoriesRef} className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 sm:gap-10 sm:px-6">

        {/* Cards Grid */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {filteredPrompts.map((prompt) => (
            <PromptCard key={prompt.id} prompt={prompt} />
          ))}
        </div>

        {/* Results count */}
        {filteredPrompts.length > 0 && (
          <div className="flex items-center justify-center pt-1 pb-2 sm:pt-2 sm:pb-4">
            <p className="text-xs text-muted-foreground sm:text-sm">
              Showing <span className="font-semibold text-foreground">{filteredPrompts.length}</span> prompt{filteredPrompts.length !== 1 && "s"}
            </p>
          </div>
        )}

        {/* Empty State */}
        {filteredPrompts.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border/60 bg-slate-50/50 px-4 py-16 text-center sm:gap-4 sm:rounded-3xl sm:py-24">
            <div className="rounded-full bg-slate-100 p-3 sm:p-4">
              <Search className="h-6 w-6 text-muted-foreground/50 sm:h-8 sm:w-8" />
            </div>
            <div className="max-w-md space-y-1.5 sm:space-y-2">
              <h3 className="text-lg font-semibold text-foreground sm:text-xl">No prompts found</h3>
              <p className="text-sm text-muted-foreground sm:text-base">
                We couldn't find any prompts matching "{search}". Try adjusting your search or filters.
              </p>
            </div>
            <Button variant="outline" onClick={handleReset} className="mt-2 rounded-full text-sm sm:mt-4">
              Clear all filters
            </Button>
          </div>
        )}
      </section>
    </div>
  );
};
