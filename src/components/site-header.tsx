import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"

interface  SiteHeaderProps {
  enableSidebar: boolean;
  title: string;
}

export function SiteHeader({enableSidebar, title}: SiteHeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex h-[--header-height] shrink-0 items-center gap-2 border-b bg-background transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-[--header-height] py-2">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        {enableSidebar == true && (
          <>  
            <SidebarTrigger className="-ml-1" />
            <Separator
            orientation="vertical"
            className="mx-2 data-[orientation=vertical]:h-4"
          />
          </>
        )}
        <h1 className="text-base font-medium">{title}</h1>
        <div className="ml-auto flex items-center gap-2">
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
