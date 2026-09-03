import { auth } from '@/auth';
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
import { getUserById } from '@/lib/requests';
import { BarMember } from '@repo/shared-types';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { FooterItems } from './components/footer-items';
import HeaderAvatar from './components/header-avatar';
import NavLink from './components/nav-link';
import { RestoSwitcher } from './components/resto-switch';
import { PageSlugs } from './types';

export async function AppSidebar() {
  const session = await auth();
  const clientId = session?.user?.id;
  const t = await getTranslations('AppSidebar.groupLabels');

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
          <SidebarGroupLabel>{t('overview')}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <NavLink slug={PageSlugs.dashboard} />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>{t('contentManagement')}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <NavLink slug={PageSlugs.menus} />
              <NavLink slug={PageSlugs.products} />
              <NavLink slug={PageSlugs.categories} />
              <NavLink slug={PageSlugs.qrcode} />
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
