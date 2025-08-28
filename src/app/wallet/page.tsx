"use client";

import * as React from "react";
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

function HistoryContent() {
  return <SwapBox />;
}

export default function Page() {
  const [tab, setTab] = React.useState<"funds" | "history">("funds");

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
            <Tabs value={tab} onValueChange={(v) => setTab(v as "funds" | "history")} className="mt-6">
              <TabsList className="w-full">
                <TabsTrigger value="funds" className="flex-1">Funds</TabsTrigger>
                <TabsTrigger value="swap" className="flex-1">Swap</TabsTrigger>
              </TabsList>

              <TabsContent value="funds">
                <FundsContent />
              </TabsContent>

              <TabsContent value="swap">
                <HistoryContent />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
