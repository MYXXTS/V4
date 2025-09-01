import React from "react";
import { TablerIcon } from "../ui/tabler-icon";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { cn } from "@web/libs/utils";
import { Link } from "../ui/link";
import { Logo } from "../ui/logo";
import { ThemeToggle } from "../ui/theme-toggle";
import { Tooltip } from "../ui/tooltip";

interface BaseNavigationMenuItem {
  label: string;
  external?: boolean;
  icon?: React.ComponentProps<typeof TablerIcon>['iconName'];
}

interface NavigationMenuChildItem extends BaseNavigationMenuItem {
  href: string;
  description?: string;
}

interface NavigationMenuParentItem extends BaseNavigationMenuItem {
  href?: string;
  children: NavigationMenuChildItem[];
}

interface NavigationMenuLeafItem extends BaseNavigationMenuItem {
  href: string;
  children?: never;
}

export type NavigationMenuItem = NavigationMenuParentItem | NavigationMenuLeafItem;

export function NavigationMenu({
  items,
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Root> & {
  items: NavigationMenuItem[];
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  return (
    <>
      {/* Desktop Navigation Menu */}
      <NavigationMenuPrimitive.Root className={cn("relative hidden sm:flex flex-row justify-between items-center [&_svg:not([class*='size-'])]:size-5 px-5", className)}>
        <div className="py-2">
          <Logo />
        </div>
        <NavigationMenuPrimitive.List className="flex flex-row gap-4">
          {items.map((item) => (
            item.children ? (
              <NavigationMenuPrimitive.Item key={item.label} className="hover:bg-base-200 px-3 py-1">
                <NavigationMenuPrimitive.Trigger className="group">
                  <span className="flex items-center gap-1 font-semibold">
                    {item.icon && <TablerIcon iconName={item.icon} stroke={1} />}
                    {item.label}
                    <TablerIcon iconName="IconChevronDown" className="size-6 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                  </span>
                </NavigationMenuPrimitive.Trigger>
                <NavigationMenuPrimitive.Content className="list-none grid grid-cols-2 bg-base-100 rounded-xl p-5 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95">
                  {item.children.map((child) => (
                    <NavigationMenuPrimitive.Link key={child.label} asChild>
                      <Link href={child.href} className="flex flex-row p-3 gap-2 rounded-md hover:bg-base-300">
                        {child.icon && <TablerIcon iconName={child.icon} className="size-4 mt-1" stroke={1} />}
                        <div className="w-52">
                          <span className="font-semibold">{child.label}</span>
                          {child.description && <p className="text-sm mt-2 text-neutral-500">{child.description}</p>}
                        </div>
                      </Link>
                    </NavigationMenuPrimitive.Link>
                  ))}
                </NavigationMenuPrimitive.Content>
              </NavigationMenuPrimitive.Item>
            ) : (
              <NavigationMenuPrimitive.Item key={item.label} className="hover:bg-base-200 px-3 py-1">
                <NavigationMenuPrimitive.Link asChild>
                  <Link href={item.href} className="flex items-center gap-1 font-semibold">
                    {item.icon && <TablerIcon iconName={item.icon} stroke={1} className="size-4" />}
                    {item.label}
                  </Link>
                </NavigationMenuPrimitive.Link>
              </NavigationMenuPrimitive.Item>
            )
          ))}
        </NavigationMenuPrimitive.List>

        <NavigationMenuPrimitive.List className="flex flex-row gap-2 ">
          <ThemeToggle />
        </NavigationMenuPrimitive.List>
        <div className="absolute left-0 top-full flex w-full justify-center">
          <NavigationMenuPrimitive.Viewport className="shadow-md relative h-[var(--radix-navigation-menu-viewport-height)] w-full origin-[top_center] overflow-hidden rounded-md  transition-[width,_height] duration-300 data-[state=closed]:animate-scaleOut data-[state=open]:animate-scaleIn sm:w-[var(--radix-navigation-menu-viewport-width)]" />
        </div>
      </NavigationMenuPrimitive.Root>

      {/* Mobile Navigation Menu */}
      <NavigationMenuPrimitive.Root className={cn("relative flex sm:hidden flex-row justify-between items-center [&_svg:not([class*='size-'])]:size-5 bg-base-100 shadow-md border-b border-base-200", className)}>
        <div className="py-4">
          <Logo />
        </div>
        <NavigationMenuPrimitive.List className="flex flex-row gap-2">
          <ThemeToggle />
          <Tooltip content="Menu" side="bottom">
            <TablerIcon iconName="IconMenu2" onClick={() => setMobileMenuOpen((prev) => !prev)} />
          </Tooltip>
        </NavigationMenuPrimitive.List>
      </NavigationMenuPrimitive.Root>

      {/* Mobile Menu Overlay */}
      <AlertDialogPrimitive.Root open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <AlertDialogPrimitive.Portal>
          <AlertDialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
          <AlertDialogPrimitive.Content className="fixed left-0 top-0 z-50 h-full w-full max-w-80 bg-base-100 p-6 shadow-lg sm:hidden overflow-y-auto data-[state=open]:animate-in data-[state=open]:slide-in-from-left-40">
            <AlertDialogPrimitive.Title className="sr-only">
              Navigation Menu
            </AlertDialogPrimitive.Title>
            <AlertDialogPrimitive.Description className="sr-only">
              Site navigation menu
            </AlertDialogPrimitive.Description>

            <div className="py-4">
              <Logo className="size-12" />
            </div>

            <nav className="space-y-4">
              {items.map((item) => (
                item.children ? (
                  <div key={item.label} className="space-y-2">
                    <div className="flex items-center gap-2 text-lg font-semibold py-1 px-4 ">
                      {item.icon && <TablerIcon iconName={item.icon} stroke={1.25} />}
                      {item.label}
                    </div>
                    <div className="px-2 py-2 space-y-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="flex items-center gap-2 text-base hover:bg-base-200 p-2 rounded pl-6"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {child.icon && <TablerIcon iconName={child.icon} stroke={0.75} />}
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-2 text-base hover:bg-base-300 py-1 px-4 rounded"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.icon && <TablerIcon iconName={item.icon} stroke={1.25} />}
                    {item.label}
                  </Link>
                )
              ))}
            </nav>

            <AlertDialogPrimitive.Cancel asChild>
              <button className="absolute right-4 top-4">
                <TablerIcon iconName="IconX" className="size-6" />
              </button>
            </AlertDialogPrimitive.Cancel>
          </AlertDialogPrimitive.Content>
        </AlertDialogPrimitive.Portal>
      </AlertDialogPrimitive.Root>
    </>
  )
}
