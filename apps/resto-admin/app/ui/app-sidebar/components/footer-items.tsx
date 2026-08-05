'use client';

import { Separator } from '@/components/ui/separator';
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Power, Settings } from 'lucide-react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

export const FooterItems = () => {
  const handleLogout = () => {
    signOut();
  };

  return (
    <>
      <Separator />
      <SidebarGroup>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/settings">
                <Settings />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton variant="outline" onClick={handleLogout}>
              <Power />
              <span>Log out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </>
  );
};
