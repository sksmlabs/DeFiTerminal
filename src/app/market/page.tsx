import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs"
import { ButtonDropdown } from "@/components/button-dropdown"
import { InfoPill } from "@/components/info-pill"
import { assetItems } from "../data/assets"


function MarketContent() {
    return (
        <div className="p-4 md:p-6">
            <h3 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0 text-left">
                Deposit wPLUME to the ETH/PLUME Pool on Royco for Tempest
            </h3>
            <p className="leading-5 [&:not(:first-child)]:mt-6 mb-4 text-left text-sm">
                Deposit wPLUME to the ETH/PLUME Pool on Tempest. Users may withdraw early at anytime but must forfeit their PLUME. More about PLUME here: docs.plume.org. Tempest is an ALM that charged 0.65% on deposits, then there is a 10% performance fee.
            </p>
            <Card className="">
                <CardContent>
                    <div className="flex items-center justify-between text-left border-b mb-2">
                        <div>
                            <small>APY</small>
                            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                            4.58K%
                            </h3>
                        </div>
                        <div>
                            <small>Market TVL</small>
                            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                            US$93.92K
                            </h3>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div className="flex justify-between">
                            <small>Accepts</small>
                            <small>pUSD</small>
                        </div>
                        <div className="flex justify-between">
                            <small>Market ID</small>
                            <small></small>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}  

function SupplyContent() {
    return (
        <>
            <form className="p-2">
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label>Input Amount</Label>
                <div className="flex gap-2 w-full">
                  <Input
                    id="email"
                    type="number"
                    placeholder="Amount"
                    required
                    className="flex-[7]"
                  />
                  <ButtonDropdown className="flex-[3]" placeholder="Select Asset" items={assetItems['plume']}/>
                </div>
              </div>
              <div className="space-y-3">
                <InfoPill
                  title="Minimum Deposit"
                  subtitle="Min. Deposit: 0 WPLUME ($0)"
                />
                <InfoPill
                  title="Tempest Fees"
                  subtitle="ALM Fee on deposits: 0.65% / Performance Fee: 10%"
                />
              </div>
              <Button type="submit" className="w-full">
                Connect Wallet
              </Button>
            </div>
          </form>
        </>
    )
}

function WithdrawContent() {
    return (
        <></>
    )
}

export default function Page() {
    const enableTab: number = 0;

    return (
        <>
        <div className="bg-muted flex min-h-svh flex-col items-center p-6 md:p-10">
            <div className="w-full max-w-sm md:max-w-5xl">
                <div className={cn("flex flex-col gap-6")} >
                <Card className="overflow-hidden p-0">
                    <CardContent className="grid p-0 md:grid-cols-2">
                    <MarketContent />
                    <div className="p-6 md:p-8">
                        <Tabs defaultValue="account">
                        <TabsList className="w-full">
                            <TabsTrigger value="account">Supply</TabsTrigger>
                            <TabsTrigger value="password">Withdraw</TabsTrigger>
                        </TabsList>
                        <TabsContent value="account">
                         {enableTab == 0 && (
                            <SupplyContent/>
                         )} 
                         {enableTab == 1 && (
                            <WithdrawContent />
                         )}
                        </TabsContent>
                        </Tabs>
                    </div>
                    </CardContent>
                </Card>
                </div>
            </div>
        </div>
        </>
    )
}