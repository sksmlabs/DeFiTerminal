import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { SearchCommand } from "./search-command";

interface SiteHeaderProps {
  enableSidebar: boolean;
  title: string;
}

export function SiteHeader({ enableSidebar, title }: SiteHeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex h-[--header-height] items-center border-b bg-background py-2">
      <div className="flex w-full items-center justify-between px-4 lg:px-6">
        
        {/* LEFT */}
        <div className="flex-1 flex items-center gap-2">
          {enableSidebar && (
            <>  
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mx-2 data-[orientation=vertical]:h-4"
              />
            </>
          )}
          <h1 className="text-base font-medium">{title}</h1>
        </div>

        {/* CENTER */}
        <div className="flex-1 flex justify-center">
          <div className="w-full max-w-lg">
            <SearchCommand />
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex-1 flex justify-end gap-2">
          <Button variant="ghost" asChild size="sm" className="hidden sm:flex">
            <a
              href="/"
              rel="noopener noreferrer"
              className="dark:text-foreground"
            >
              Home
            </a>
          </Button>
        </div>
      </div>
    </header>
  )
}
