"use client";

import * as React from "react";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import { BalancePill } from "@/components/balance-pill";
import { SwapBox } from "@/components/swap-box";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SendBox from "@/components/send-box";

const fundsItems = [
  { title: "WETH", subtitle: "100 WETH" },
  { title: "BTC", subtitle: "2 BTC" },
];

function FundsContent() {
  return (
    <>
      <h5 className="scroll-m-20 text-md font-semibold tracking-tight mb-4">
        Balance Funds
      </h5>
      {fundsItems.map((item, i) => (
        <BalancePill key={i} title={item.title} subtitle={item.subtitle} className="mb-2" />
      ))}
    </>
  );
}

function SwapContent() {
  return <SwapBox />;
}

function SendContent() {
  return (
    <SendBox
      chain={{ name: "Ethereum" }}
      balancePrimary="0"
      balanceFiat="$0"
      wallets={[
        {
          name: "kidgoku.uni.eth",
          address: "0x4607BB90B3eA9F3F8cC...b920AD",
          avatarUrl: "https://i.pravatar.cc/100?img=12",
          badge: { label: "uni" },
        },
      ]}
    />
  );
}

type Tab = "funds" | "swap" | "send";

export default function Page() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Local, controlled state
  const [tab, setTab] = React.useState<Tab>("funds");

  // Sync FROM URL -> state
  React.useEffect(() => {
    const qp = (searchParams.get("view") || "").toLowerCase();
    const urlTab: Tab =
      qp === "swap" ? "swap" : qp === "send" ? "send" : "funds";

    setTab((curr) => (curr !== urlTab ? urlTab : curr));
  }, [searchParams]);

  // When user changes tabs: update state + URL (preserving other params)
  const onTabChange = (val: string) => {
    const next: Tab = (["funds", "swap", "send"].includes(val)
      ? (val as Tab)
      : "funds");

    setTab(next);

    const params = new URLSearchParams(location.search);
    params.set("view", next);
    navigate({ search: params.toString() }, { replace: true });
  };

  return (
    <div className="flex min-h-svh flex-col items-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-xl mt-10">
        <Card className="overflow-hidden p-4">
          <CardContent className="flex flex-col text-start">
            <h3 className="scroll-m-20 pb-2 text-2xl font-semibold tracking-tight text-left">
              Wallet
            </h3>
            <small>Manage your funds across supported networks</small>

            <Tabs value={tab} onValueChange={onTabChange} className="mt-6">
              <TabsList className="w-full">
                <TabsTrigger value="funds" className="flex-1">Funds</TabsTrigger>
                <TabsTrigger value="swap" className="flex-1">Swap</TabsTrigger>
                <TabsTrigger value="send" className="flex-1">Send</TabsTrigger>
              </TabsList>

              <TabsContent value="funds">
                <FundsContent />
              </TabsContent>

              <TabsContent value="swap">
                <SwapContent />
              </TabsContent>

              <TabsContent value="send">
                <SendContent />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
