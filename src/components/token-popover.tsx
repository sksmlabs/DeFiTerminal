"use client";

import * as React from "react";
import {
  Popover,
  PopoverContent,
  PopoverAnchor,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandInput,
  CommandList,
  CommandGroup,
  CommandItem,
  CommandEmpty,
  CommandSeparator,
} from "@/components/ui/command";
import { ChevronDown, Search as SearchIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Token } from "@/app/types";



/* ============ Helpers ============ */
const shortAddr = (addr?: string) =>
  addr ? `${addr.slice(0, 6)}…${addr.slice(-4)}` : "";

/* ============ Row ============ */
function TokenRow({
  token,
  onPick,
}: {
  token: Token;
  onPick: (t: Token) => void;
}) {
  return (
    <CommandItem onSelect={() => onPick(token)} className="px-4 py-3 gap-3">
      <div className="h-8 w-8 rounded-full bg-zinc-700" />
      <div className="flex min-w-0 flex-col">
        <span className="truncate text-base">{token.name}</span>
        <span className="truncate text-xs text-zinc-400">
          {token.symbol} {shortAddr(token.address)}
        </span>
      </div>
    </CommandItem>
  );
}

/* ============ Popover CONTENT (anchored) ============ */
export function TokenSelectPopover({
  open,
  onOpenChange,
  anchorRef,
  tokens,
  quick = [],
  recent = [],
  onSelect,
  className,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  anchorRef: React.RefObject<HTMLElement>;
  tokens: Token[];
  quick?: Token[];
  recent?: Token[];
  onSelect: (t: Token) => void;
  className?: string;
}) {
  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      {/* anchor is the external trigger ref */}
      <PopoverAnchor ref={anchorRef as any} />
        {/* optional: backdrop */}
        {open ? (
          <div
            className="fixed inset-0 z-[51] bg-black/30 backdrop-blur-[1px]"
            onClick={() => onOpenChange(false)}
          />
        ) : null}
      <PopoverContent
        // stop Radix from shifting/flipping
        avoidCollisions={false}
        sideOffset={0}
        align="center"

        // hard-center the panel in the viewport
        className={cn(
          "fixed z-[52] p-0 rounded-2xl border bg-white text-black shadow-2xl",
          "w-[min(92vw,36rem)] max-h-[80vh] overflow-hidden",
          // kill shadcn slide/zoom offsets if present
          "data-[state=open]:!animate-none data-[state=closed]:!animate-none",
          "data-[side=bottom]:!translate-y-0 data-[side=top]:!translate-y-0",
          className
        )}
        // INLINE STYLES win over any class transforms/positioning
        style={{
          position: "fixed",
          left: "50%",
          top: "25%",
          transform: "translate(-50%, -75%)",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3">
          <h4 className="text-lg font-semibold text-black">Select a token</h4>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full hover:bg-muted/10"
            onClick={() => onOpenChange(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Search + quick chips */}
        <div className="px-4 pb-3 border-b">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
              <SearchIcon className="h-4 w-4 text-zinc-400" />
            </div>
            <Command className="rounded-xl bg-muted/40 border">
              <CommandInput
                placeholder="Search tokens"
                className="h-11 pl-9 placeholder:text-zinc-400"
              />
            </Command>
            <div className="absolute right-2 top-2">
              <div className="flex items-center gap-1 rounded-full px-2 py-1 text-[10px]">
                <span className="opacity-80">All</span>
                <ChevronDown className="h-3 w-3 opacity-70" />
              </div>
            </div>
          </div>

          {!!quick.length && (
            <div className="mt-3 flex flex-wrap gap-2">
              {quick.map((q) => (
                <button
                  key={q.symbol}
                  onClick={() => {
                    onSelect(q);
                    onOpenChange(false);
                  }}
                  className="inline-flex items-center gap-2 rounded-xl px-3 py-2 border hover:bg-muted/40 cursor-pointer text-black"
                >
                  <span className="h-5 w-5 rounded-full bg-zinc-700" />
                  <span className="text-sm font-medium">{q.symbol}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* List */}
        <Command>
          <CommandList className="max-h-[48vh] overflow-y-auto">
            {!!recent.length && (
              <>
                <div className="flex items-center justify-between px-4 py-2 text-zinc-400 text-sm">
                  <span className="inline-flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-zinc-500" />
                    Recent searches
                  </span>
                  <button className="text-zinc-400 hover:text-zinc-200 text-sm">
                    Clear
                  </button>
                </div>
                <CommandGroup>
                  {recent.map((t) => (
                    <TokenRow
                      key={`recent-${t.symbol}`}
                      token={t}
                      onPick={(tok) => {
                        onSelect(tok);
                        onOpenChange(false);
                      }}
                    />
                  ))}
                </CommandGroup>
                <CommandSeparator />
              </>
            )}

            <div className="px-4 py-2 text-zinc-400 text-sm">
              <span className="inline-flex items-center gap-2">
                <span className="h-3 w-3 rounded-sm bg-zinc-500" />
                Tokens by 24H volume
              </span>
            </div>
            <CommandGroup>
              {tokens.map((t) => (
                <TokenRow
                  key={t.symbol}
                  token={t}
                  onPick={(tok) => {
                    onSelect(tok);
                    onOpenChange(false);
                  }}
                />
              ))}
            </CommandGroup>

            <CommandEmpty className="px-4 py-6 text-zinc-400">
              No tokens found.
            </CommandEmpty>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
