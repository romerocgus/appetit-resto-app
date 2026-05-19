'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { ChevronDown, GalleryVerticalEnd, Plus } from 'lucide-react';
import { useState } from 'react';

const RESTAURANTS = [
  {
    name: 'Restaurant 1',
    plan: 'test plan 1',
    logo: GalleryVerticalEnd,
  },
  {
    name: 'Restaurant 2',
    plan: 'test plan 2',
    logo: GalleryVerticalEnd,
  },
  {
    name: 'Restaurant 3',
    plan: 'test plan 3',
    logo: GalleryVerticalEnd,
  },
];

export const RestoSwitcher = () => {
  const { isMobile } = useSidebar();
  const [activeBar, setActiveBar] = useState(RESTAURANTS[0]);

  if (!activeBar) {
    return null;
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <activeBar.logo className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{activeBar.name}</span>
                <span className="truncate text-xs">{activeBar.plan}</span>
              </div>
              <ChevronDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="start"
            side={isMobile ? 'bottom' : 'right'}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Restaurant
            </DropdownMenuLabel>
            {RESTAURANTS.map((bar, index) => (
              <DropdownMenuItem
                key={bar.name}
                onClick={() => setActiveBar(bar)}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-md border">
                  <bar.logo className="size-3.5 shrink-0" />
                </div>
                {bar.name}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                <Plus className="size-4" />
              </div>
              <div className="font-medium text-muted-foreground">
                Add Restaurant
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
