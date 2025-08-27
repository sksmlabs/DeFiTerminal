import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

import data from "./data.json"


function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center text-center py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* Background waves */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-[url('/wave-lines.svg')] bg-repeat-x bg-top opacity-40" />

      {/* Content */}
      <div className="flex flex-col relative z-10 px-6">
        <h1 className="text-4xl md:text-5xl font-serif font-semibold mb-4 inline-block px-4 py-1">
          Earn on DeFi Terminal
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground inline-block px-3 py-1">
          Where capital meets its potential.
        </p>
      </div>
    </section>
  );
}

export default function Page() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 82)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <SidebarInset>
        
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <Hero/>
              <SectionCards />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
              <DataTable data={data} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
