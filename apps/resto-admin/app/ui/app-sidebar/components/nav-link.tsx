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
import { usePathname } from 'next/navigation';
import { PageNames } from '../types';

const ICONS: Record<PageNames, React.ReactNode> = {
  [PageNames.home]: <LayoutDashboard />,
  [PageNames.menus]: <ScrollText />,
  [PageNames.products]: <Salad />,
  [PageNames.categories]: <NotebookTabs />,
  [PageNames.qrcode]: <QrCode />,
  [PageNames.settings]: <Settings />,
};

type NavLinkProps = {
  name: PageNames;
  href: string;
};

export default function NavLink({ name, href }: NavLinkProps) {
  const pathName = usePathname();
  const icon = ICONS[name];

  if (!icon) {
    return null;
  }

  return (
    <SidebarMenuButton asChild isActive={pathName === href}>
      <Link href={href}>
        {icon}
        <span>{name}</span>
      </Link>
    </SidebarMenuButton>
  );
}
