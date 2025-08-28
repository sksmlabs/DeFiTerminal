import React from "react";
import { ChevronDown, TrendingUpDown, Search } from "lucide-react";
import { TokenSelectPopover } from "./token-popover";
import { TOKENS } from "@/app/data/tokens";

// Dummy token list for example

export type WalletItem = {
  name: string;
  address: string;
  avatarUrl?: string;
  badge?: { label: string; className?: string } | null;
};

export type SendPanelProps = {
  chain: {
    name: string;
    iconUrl?: string;
  };
  balancePrimary: string;
  balanceFiat: string;
  recipientQuery?: string;
  onRecipientChange?: (v: string) => void;
  wallets?: WalletItem[];
};

const classNames = (...s: (string | undefined | false | null)[]) =>
  s.filter(Boolean).join(" ");

const ChainIcon: React.FC<{ src?: string; alt: string }> = ({ src, alt }) => {
  return (
    <div className="h-7 w-7 rounded-full bg-indigo-500/20 ring-1 ring-white/10 flex items-center justify-center overflow-hidden">
      {src ? (
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      ) : (
        <svg viewBox="0 0 24 24" className="h-4 w-4 opacity-90" aria-hidden>
          <path
            d="M12 2l6.5 10.8L12 9.7 5.5 12.8 12 2zm0 8.9l6.5 3.2L12 22l-6.5-7.9L12 10.9z"
            fill="currentColor"
          />
        </svg>
      )}
    </div>
  );
};

const AddressMini: React.FC<{ address: string }> = ({ address }) => {
  const a =
    address.startsWith("0x") && address.length > 10
      ? `${address.slice(0, 6)}...${address.slice(-4)}`
      : address;
  return <span className="text-muted-foreground/90">{a}</span>;
};

const WalletRow: React.FC<{ item: WalletItem }> = ({ item }) => {
  return (
    <button className="group w-full text-left px-3 py-2 rounded-xl hover:bg-white/5 transition flex items-center gap-3 cursor-pointer focus:bg-muted">
      <div className="h-10 w-10 rounded-full overflow-hidden ring-1 ring-white/10 bg-white/5 flex items-center justify-center">
        {item.avatarUrl ? (
          <img
            src={item.avatarUrl}
            alt={item.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="text-base">👤</div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 text-[15px]">
          <span className="truncate font-medium">{item.name}</span>
          {item.badge ? (
            <span
              className={classNames(
                "inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] font-semibold",
                item.badge.className ??
                  "bg-pink-500/20 text-pink-300 ring-1 ring-pink-400/30"
              )}
            >
              {item.badge.label}
            </span>
          ) : null}
        </div>
        <div className="text-xs opacity-80">
          <AddressMini address={item.address} />
        </div>
      </div>
    </button>
  );
};

export default function SendBox({
  chain = { name: "Ethereum" },
  balancePrimary = "0",
  balanceFiat = "$0",
  recipientQuery = "",
  onRecipientChange,
  wallets = [
    {
      name: "kidgoku.uni.eth",
      address: "0x4607BB90B3eA9F3F8cC...b920AD",
      avatarUrl: "https://i.pravatar.cc/100?img=12",
      badge: {
        label: "uni",
        className:
          "bg-pink-500 text-white px-1.5 py-0.5 rounded-md text-[10px] font-bold",
      },
    },
  ],
}: SendPanelProps) {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef<HTMLDivElement | null>(null);

    // 1) inside SendBox component
    const [amount, setAmount] = React.useState(balancePrimary);

    // keep local state in sync if parent prop changes
    React.useEffect(() => setAmount(balancePrimary), [balancePrimary]);

    // sanitize user typing (only digits + one dot)
    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value.replace(/[^0-9.]/g, "");
    const parts = next.split(".");
    const cleaned = parts.length > 2 ? parts[0] + "." + parts.slice(1).join("") : next;
    setAmount(cleaned);
    // optionally lift up:
    // onAmountChange?.(cleaned);
    };

    const [selectedWallet, setSelectedWallet] = React.useState<WalletItem | null>(null);

    return (
    <div className="w-full">
      {/* Card: Chain + Balance */}
      <section className="rounded-2xl border bg-muted/40 backdrop-blur-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
        <div className="flex items-center justify-between px-4 md:px-5 py-4 bg-muted rounded-t-2xl cursor-pointer" ref={anchorRef} onClick={() => setOpen(true)}>
          <div className="flex items-center gap-3">
            <ChainIcon alt={chain.name} />
            <div>
              <div className="text-[15px] leading-none font-medium">
                {chain.name}
              </div>
              <div className="text-xs mt-1">
                Balance: {balancePrimary} ETH
              </div>
            </div>
          </div>
          <button
            className="inline-flex h-8 w-8 items-center justify-center rounded-full hover:bg-white/5 transition"
            aria-label="Change chain"
          >
            <ChevronDown className="h-5 w-5 opacity-80" />
          </button>
        </div>
        <div className="px-4 md:px-5 pt-2 pb-8 md:pb-10">
            <input
                // use text/tel to avoid spinner arrows
                type="text"
                inputMode="decimal"
                value={amount}
                onChange={handleAmountChange}
                placeholder="0"
                className="
                w-full text-center bg-transparent
                text-7xl md:text-8xl font-semibold tracking-tight
                focus:outline-none focus:ring-0
                caret-black
                "
            />
            <div className="mt-2 flex items-center justify-center gap-2 text-sm">
                <span>{balanceFiat}</span>
                <TrendingUpDown className="h-4 w-4 opacity-70" />
            </div>
            </div>
      </section>

      {/* Card: Recipient */}
      <section className="mt-4 md:mt-6 rounded-2xl border bg-muted/40 backdrop-blur-sm">
  <div className="px-4 md:px-5 py-3 text-sm">To</div>

  {selectedWallet ? (
    // --- Compact selected-contact row; click to go back to search/list
    <div className="mx-4 md:mx-5 mb-4">
    <button
      className="w-full flex items-center gap-3 rounded-2xl border bg-muted/40 px-3 py-3 hover:bg-muted transition text-left cursor-pointer"
      onClick={() => setSelectedWallet(null)}
      aria-label="Change recipient"
    >
      {/* avatar */}
      <div className="h-10 w-10 rounded-full overflow-hidden ring-1 ring-white/10 bg-white/5 flex items-center justify-center">
        {selectedWallet.avatarUrl ? (
          <img src={selectedWallet.avatarUrl} alt={selectedWallet.name} className="h-full w-full object-cover" />
        ) : (
          <div className="text-base">👤</div>
        )}
      </div>

      {/* name + address + badge */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="truncate font-medium">{selectedWallet.name}</span>
          {selectedWallet.badge ? (
            <span
              className={classNames(
                "inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] font-semibold",
                selectedWallet.badge.className ?? "bg-pink-500/20 text-pink-300 ring-1 ring-pink-400/30"
              )}
            >
              {selectedWallet.badge.label}
            </span>
          ) : null}
        </div>
        <div className="text-xs opacity-80">
          <AddressMini address={selectedWallet.address} />
        </div>
      </div>

      {/* chevron to indicate it’s expandable/back */}
      <ChevronDown className="h-5 w-5 opacity-70" />
    </button>
    </div>
  ) : (
    // --- Search + list view (default)
    <>
      <div className="px-4 md:px-5 pb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-60" />
          <input
            value={recipientQuery}
            onChange={(e) => onRecipientChange?.(e.target.value)}
            placeholder="Search ENS or address"
            className="w-full rounded-xl border pl-9 pr-3 py-2.5 outline-none focus:bg-muted"
          />
        </div>
      </div>

      <div className="px-4 md:px-5 pb-4">
        <div className="text-sm mb-2">Previously sent to:</div>
        <div className="space-y-1.5">
          {wallets.map((w, i) => (
            <div key={i}>
              <button
                className="group w-full text-left px-3 py-2 rounded-xl hover:bg-white/5 transition flex items-center gap-3 cursor-pointer focus:bg-muted"
                onClick={() => setSelectedWallet(w)}
              >
                {/* Avatar */}
                <div className="h-10 w-10 rounded-full overflow-hidden ring-1 ring-white/10 bg-white/5 flex items-center justify-center">
                  {w.avatarUrl ? <img src={w.avatarUrl} alt={w.name} className="h-full w-full object-cover" /> : <div className="text-base">👤</div>}
                </div>
                {/* Texts */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 text-[15px]">
                    <span className="truncate font-medium">{w.name}</span>
                    {w.badge ? (
                      <span
                        className={classNames(
                          "inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] font-semibold",
                          w.badge.className ?? "bg-pink-500/20 text-pink-300 ring-1 ring-pink-400/30"
                        )}
                      >
                        {w.badge.label}
                      </span>
                    ) : null}
                  </div>
                  <div className="text-xs opacity-80"><AddressMini address={w.address} /></div>
                </div>

                {/* trailing chevron like in your mock */}
                <ChevronDown className="h-5 w-5 opacity-70 rotate-180" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  )}
</section>

      {/* Popover anchored to token button */}
      <TokenSelectPopover
        open={open}
        onOpenChange={setOpen}
        anchorRef={anchorRef}
        tokens={TOKENS}
        quick={TOKENS.slice(0, 2)}
        recent={[{ symbol: "GHO", name: "Gho Token" }]}
        onSelect={(t) => {
          console.log("Selected token:", t);
          setOpen(false);
        }}
      />
    </div>
  );
}
