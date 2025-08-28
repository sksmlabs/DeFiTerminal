"use client";

import * as React from "react";
import {
  Calculator,
  Calendar,
  Coins,
  CreditCard,
  Search,
  Smile,
  User,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Link } from "react-router-dom"

type SearchCommandProps = {
  className?: string;
  placeholder?: string;
};

export function SearchCommand({
  className,
  placeholder = "Search projects, metrics, datasets, etc.",
}: SearchCommandProps) {
  const [open, setOpen] = React.useState(false);
  const triggerRef = React.useRef<HTMLButtonElement | null>(null);

  // Open with ⌘K / Ctrl+K
  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const onSelect = (value: string) => {
    // Do something with the selected value
    // e.g. router.push(...), setQuery(value), etc.
    setOpen(false);
    triggerRef.current?.focus();
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {/* The "search bar" trigger that looks like an input */}
        <Button
          ref={triggerRef}
          variant="outline"
          className={cn(
            "w-full justify-start rounded-xl border text-left text-muted-foreground shadow-sm",
            "h-12 px-4 gap-3",
            className
          )}
        >
          <Search className="h-4 w-4 shrink-0" />
          <span className="line-clamp-1 flex-1">{placeholder}</span>
          <kbd className="pointer-events-none ml-auto inline-flex select-none items-center gap-1 rounded border px-1.5 text-[10px] font-medium text-muted-foreground">
            <span className="font-sans">⌘</span>K
          </kbd>
        </Button>
      </PopoverTrigger>

      {/* The dropdown content with the Command UI */}
      <PopoverContent
        align="center"
        sideOffset={8}
        className="p-0 rounded-xl shadow-md w-[--radix-popover-trigger-width] max-w-none"
        // Inline style guarantees the width even if Tailwind arbitrary values are stripped
        style={{ width: 'var(--radix-popover-trigger-width)' }}
      >
        <Command shouldFilter={true}>
          <CommandInput
            autoFocus
            placeholder="Type to search…"
            className="h-12"
          />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>

            <CommandGroup heading="Suggestions">
              <Link to="/home">
              <CommandItem onSelect={() => onSelect("calendar")}>
                <Calendar className="mr-2 h-4 w-4" />
                <span>Markets</span>
              </CommandItem>
              </Link>
              <CommandItem onSelect={() => onSelect("emoji")}>
                <Smile className="mr-2 h-4 w-4" />
                <span>Search Emoji</span>
              </CommandItem>
              <CommandItem disabled>
                <Calculator className="mr-2 h-4 w-4" />
                <span>Calculator</span>
              </CommandItem>
            </CommandGroup>

            <CommandSeparator />

            <CommandGroup heading="Settings">
              <CommandItem onSelect={() => onSelect("profile")}>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
                <CommandShortcut>⌘P</CommandShortcut>
              </CommandItem>
              <Link to="/wallet?view=funds">
              <CommandItem onSelect={() => onSelect("billing")}>
                <CreditCard className="mr-2 h-4 w-4" />
                <span>Wallet</span>
                <CommandShortcut>⌘W</CommandShortcut>
              </CommandItem>
              </Link>
              <Link to="/wallet?view=swap">
              <CommandItem onSelect={() => onSelect("settings")}>
                <Coins className="mr-2 h-4 w-4" />
                <span>Swap</span>
                <CommandShortcut>⌘S</CommandShortcut>
              </CommandItem>
              </Link>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
