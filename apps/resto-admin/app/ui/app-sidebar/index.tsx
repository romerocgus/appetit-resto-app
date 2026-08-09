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
import { notFound } from 'next/navigation';
import { BarMember } from '@repo/shared-types';
import HeaderAvatar from './components/header-avatar';
import { auth } from '@/auth';
import { getUserById } from '@/lib/requests';

export async function AppSidebar() {
  const session = await auth();
  const clientId = session?.user?.id;

  const user = clientId && (await getUserById(clientId));
  if (!user) {
    notFound();
  }
  const memberships = user.memberships as BarMember[];

  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader>
        <HeaderAvatar username={user.name} userImage={user.image} />
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
