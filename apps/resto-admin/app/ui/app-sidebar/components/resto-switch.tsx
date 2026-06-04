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
import { BarMember } from '@repo/shared-types';
import { ChevronDown, GalleryVerticalEnd, Plus } from 'lucide-react';
import { notFound, useParams, usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

export const RestoSwitcher = ({
  memberships,
}: {
  memberships: BarMember[];
}) => {
  const { isMobile } = useSidebar();
  const [activeMembership, setActiveMembership] = useState(memberships[0]);

  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const currentBarId = params.barId as string;

  if (!activeMembership) {
    return notFound();
  }

  const handleBarSelect = (membership: BarMember) => {
    setActiveMembership(membership);
    const newPath = pathname.replace(
      `/${currentBarId}`,
      `/${membership.bar.id}`,
    );
    router.push(newPath);
  };

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
                {activeMembership.bar.logoUrl || <GalleryVerticalEnd />}
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {activeMembership.bar.name}
                </span>
                <span className="truncate text-xs">
                  {activeMembership.role}
                </span>
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
            {memberships.map((membership, index) => (
              <DropdownMenuItem
                key={membership.id}
                onClick={() => handleBarSelect(membership)}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-md border">
                  {membership.bar.logoUrl || <GalleryVerticalEnd />}
                </div>
                {membership.bar.name}
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
