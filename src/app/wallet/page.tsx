import { BalancePill } from "@/components/balance-pill";
import { Card, CardContent } from "@/components/ui/card";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs"

  const fundsItems = [
    { title: "WETH", subtitle: "100 WETH" },
    { title: "BTC", subtitle: "2 BTC" },
  ];
  
  function FundsContent() {
    return (
      <>
        <h5 className="scroll-m-20 text-md font-semibold tracking-tight mb-4">
        Wallet Funds
        </h5>
        {fundsItems.map((item, i) => (
          <BalancePill
            key={i}
            title={item.title}
            subtitle={item.subtitle}
            className="mb-2"
          />
        ))}
      </>
    );
  }

function HistoryContent() {
    return (
        <></>
    )
}

export default function Page() {
    let enableTab: number = 0;

    return (
        <>
             <div className="flex min-h-svh flex-col items-center p-6 md:p-10">
                <div className="w-full max-w-sm md:max-w-xl mt-10">
                    <Card className="overflow-hidden p-4">
                        <CardContent className="flex flex-col text-start">
                            <h3 className="scroll-m-20 pb-2 text-2xl font-semibold tracking-tight first:mt-0 text-left">
                                Balance
                            </h3>
                            <small>Manage your funds across supported networks</small>
                            <Tabs defaultValue="account" className="mt-6">
                            <TabsList className="w-full">
                                <TabsTrigger value="account">Funds</TabsTrigger>
                                <TabsTrigger value="password">Transaction History</TabsTrigger>
                            </TabsList>
                            <TabsContent value="account">
                                {enableTab == 0 && (<>
                                    <FundsContent />
                                </>)}
                                {enableTab == 1 && (<>
                                    <HistoryContent />
                                </>)}
                            </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>
                </div>
             </div>
        </>
    )
}