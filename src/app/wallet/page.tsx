"use client";

import * as React from "react";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import { BalancePill } from "@/components/balance-pill";
import { SwapBox } from "@/components/swap-box";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

export default function Page() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const location = useLocation();

    // 1) local, controlled tabs state
    const [tab, setTab] = React.useState<"funds" | "swap">("funds");

    // 2) derive from URL and sync INTO state
    React.useEffect(() => {
        const qp = (searchParams.get("view") || "").toLowerCase();
        const urlTab: "funds" | "swap" = qp === "swap" ? "swap" : "funds";
        // only update if different to avoid useless re-renders
        setTab((curr) => (curr !== urlTab ? urlTab : curr));
    }, [searchParams]);

    // 3) when user clicks tab, update BOTH state and URL (replace to avoid stacking history)
    const onTabChange = (val: string) => {
        const next = (val === "swap" ? "swap" : "funds") as "funds" | "swap";
        setTab(next);

        // preserve other query params
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

            {/* Controlled tabs */}
            <Tabs value={tab} onValueChange={onTabChange} className="mt-6">
              <TabsList className="w-full">
                <TabsTrigger value="funds" className="flex-1">Funds</TabsTrigger>
                <TabsTrigger value="swap" className="flex-1">Swap</TabsTrigger>
              </TabsList>

              <TabsContent value="funds">
                <FundsContent />
              </TabsContent>

              <TabsContent value="swap">
                <SwapContent />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
