'use client';
import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { Link } from '@/i18n/navigation';
import {
  LayoutDashboard,
  NotebookTabs,
  QrCode,
  Salad,
  ScrollText,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useParams, usePathname } from 'next/navigation';
import { PageSlugs } from '../types';

const ICONS: Record<PageSlugs, React.ReactNode> = {
  [PageSlugs.dashboard]: <LayoutDashboard />,
  [PageSlugs.menus]: <ScrollText />,
  [PageSlugs.products]: <Salad />,
  [PageSlugs.categories]: <NotebookTabs />,
  [PageSlugs.qrcode]: <QrCode />,
};

type NavLinkProps = {
  slug: PageSlugs;
};

export default function NavLink({ slug }: NavLinkProps) {
  const pathName = usePathname();
  const { barId } = useParams();
  const icon = ICONS[slug];
  const t = useTranslations('AppSidebar.navItems');

  if (!icon) {
    return null;
  }

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={pathName.includes(slug)}>
        <Link href={`/${barId}/${slug}`}>
          {icon}
          <span>{t(slug)}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
