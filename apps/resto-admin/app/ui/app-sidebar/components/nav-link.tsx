'use client';
import { SidebarMenuButton } from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  NotebookTabs,
  QrCode,
  Salad,
  ScrollText,
  Settings,
} from 'lucide-react';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { PageNames } from '../types';

const ICONS: Record<PageNames, React.ReactNode> = {
  [PageNames.dashboard]: <LayoutDashboard />,
  [PageNames.menus]: <ScrollText />,
  [PageNames.products]: <Salad />,
  [PageNames.categories]: <NotebookTabs />,
  [PageNames.qrcode]: <QrCode />,
  [PageNames.settings]: <Settings />,
};

type NavLinkProps = {
  name: PageNames;
  slug: string;
};

export default function NavLink({ name, slug }: NavLinkProps) {
  const pathName = usePathname();
  const { barId } = useParams();
  const icon = ICONS[name];

  if (!icon) {
    return null;
  }

  return (
    <SidebarMenuButton asChild isActive={pathName.includes(slug)}>
      <Link href={`/${barId}/${slug}`}>
        {icon}
        <span>{name}</span>
      </Link>
    </SidebarMenuButton>
  );
}
