"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronDown, ArrowDown } from "lucide-react";
import type { Token } from "@/app/types";
import { TOKENS } from "@/app/data/tokens";
import { TokenSelectPopover } from "./token-popover";
import { cn } from "@/lib/utils";

export function SwapBox() {
  const [sellToken, setSellToken] = React.useState<Token | null>(TOKENS[0]);
  const [buyToken, setBuyToken] = React.useState<Token | null>(null);

  const QUICK = TOKENS.slice(0, 5);
  const RECENT: Token[] = [{ symbol: "GHO", name: "Gho Token" }];

  // which button opened the popover?
  const [pickerFor, setPickerFor] = React.useState<"sell" | "buy" | null>(null);

  const closePicker = () => setPickerFor(null);

  // which side is picking & shared open state
  const [openFor, setOpenFor] = React.useState<"sell" | "buy" | null>(null);
  const open = openFor !== null;

  // refs for BOTH external trigger buttons
  const sellBtnRef = React.useRef<HTMLButtonElement>(null);
  const buyBtnRef = React.useRef<HTMLButtonElement>(null);

  const anchorRef =
    openFor === "sell" ? (sellBtnRef as React.RefObject<HTMLElement>) : (buyBtnRef as React.RefObject<HTMLElement>);

  return (
    <div className="flex flex-col gap-2 mt-2">
      {/* SELL section */}
      <div className="rounded-xl border bg-muted/40 p-4 space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Sell</span>
          <span className="text-xs">Not enough ETH</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <Input type="number" placeholder="0" className="focus:bg-muted" />
            <span className="text-xs text-muted-foreground">$0</span>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex gap-2 mb-2">
              {["25%", "50%", "75%", "Max"].map((p) => (
                <Button
                  key={p}
                  size="sm"
                  variant="secondary"
                  className="h-6 text-xs px-2 bg-zinc-800 text-zinc-200"
                >
                  {p}
                </Button>
              ))}
            </div>
            <Button
            ref={sellBtnRef}
            variant="outline"
            size="sm"
            className=""
            onClick={() => setOpenFor("sell")}
          >
            {sellToken?.symbol ?? "Select token"}
            <ChevronDown className="ml-1 h-4 w-4" />
          </Button>
            <span className="text-xs text-muted-foreground mt-1">
              0 {sellToken?.symbol ?? ""}
            </span>
          </div>
        </div>
      </div>

      {/* Arrow */}
      <div className="flex justify-center">
        <div className="border bg-muted/40 rounded-full p-2">
          <ArrowDown className="h-4 w-4 text-black" />
        </div>
      </div>

      {/* BUY section */}
      <div className="rounded-xl border bg-muted/40 p-4 space-y-2">
        <div className="text-sm text-muted-foreground">Buy</div>
        <div className="flex items-center justify-between gap-2">
          <Input type="number" placeholder="0" className="focus:bg-muted" />
          <Button
            ref={buyBtnRef}
            variant={buyToken ? "outline" : "default"}
            size="sm"
            className={cn(
              buyToken ? "" : "bg-pink-500 hover:bg-pink-600 text-white"
            )}
            onClick={() => setOpenFor("buy")}
          >
            {buyToken?.symbol ?? "Select token"}
            <ChevronDown className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* CTA section */}
      <div className="mt-6">
        <Button type="submit" className="w-full">
          Connect Wallet
        </Button>
      </div>

      {/* Shared anchored popover */}
      <TokenSelectPopover
          open={open}
          onOpenChange={(v) => (v ? null : setOpenFor(null))}
          anchorRef={anchorRef}
          tokens={TOKENS}
          quick={TOKENS.slice(0, 5)}
          recent={[{ symbol: "GHO", name: "Gho Token" }]}
          onSelect={(t) => {
            if (openFor === "sell") setSellToken(t);
            if (openFor === "buy") setBuyToken(t);
          }}
        />
    </div>
  );
}
