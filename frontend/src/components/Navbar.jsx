import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"

export default function Navbar() {
  return (
    <div className="w-full border-b shadow-sm bg-white">
      <div className="container mx-auto flex items-center justify-between py-3 px-6">
        {/* Logo / App Name */}
        <h1 className="text-xl font-bold text-blue-600">Doc-AI</h1>

        {/* Navigation */}
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/"
                className={cn(
                  "px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:underline"
                )}
              >
                Home
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                href="/dashboard"
                className={cn(
                  "px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:underline"
                )}
              >
                Dashboard
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                href="/tutorials"
                className={cn(
                  "px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:underline"
                )}
              >
                Tutorials
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                href="/ppt"
                className={cn(
                  "px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:underline"
                )}
              >
                PPT
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>

          {/* Indicator + Viewport (needed for shadcn NavigationMenu) */}
          <NavigationMenuIndicator />
          <NavigationMenuViewport />
        </NavigationMenu>
      </div>
    </div>
  )
}
