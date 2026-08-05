import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
} from '@/components/ui/sidebar';
import { FooterItems } from './components/footer-items';
import NavItems from './components/nav-items';
import { RestoSwitcher } from './components/resto-switch';
import { prisma } from '@repo/database';
import { notFound } from 'next/navigation';
import { BarMember } from '@repo/shared-types';

export async function AppSidebar({ clientId }: { clientId: string }) {
  const user = await prisma.user.findUnique({
    where: { id: clientId },
    include: {
      memberships: { include: { bar: true } },
    },
  });
  if (!user) {
    notFound();
  }

  const memberships = user.memberships as BarMember[];

  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader>
        <h1>{`Welcome ${user?.name}`}</h1>
        <RestoSwitcher memberships={memberships} />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <NavItems />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup />
      </SidebarContent>

      <SidebarFooter>
        <FooterItems />
      </SidebarFooter>
    </Sidebar>
  );
}
