'use client';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Salad,
  ScrollText,
  NotebookTabs,
  QrCode,
  Settings,
} from 'lucide-react';
import { PageNames } from './types';

const ICONS: Record<PageNames, React.ReactNode> = {
  [PageNames.home]: <LayoutDashboard className="w-6" />,
  [PageNames.menus]: <ScrollText className="w-6" />,
  [PageNames.products]: <Salad className="w-6" />,
  [PageNames.categories]: <NotebookTabs className="w-6" />,
  [PageNames.qrcode]: <QrCode className="w-6" />,
  [PageNames.settings]: <Settings className="w-6" />,
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
    <Link
      href={href}
      className={clsx(
        'flex h-12 grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
        {
          'bg-sky-200 text-blue-600': pathName === href,
        },
      )}
    >
      {icon}
      <p className="hidden md:block">{name}</p>
    </Link>
  );
}
