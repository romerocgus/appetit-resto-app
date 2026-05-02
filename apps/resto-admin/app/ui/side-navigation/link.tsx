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

const getIcon = (name: string) => {
  switch (name) {
    case PageNames.home:
      return <LayoutDashboard className="w-6" />;
    case PageNames.menus:
      return <ScrollText className="w-6" />;
    case PageNames.products:
      return <Salad className="w-6" />;
    case PageNames.categories:
      return <NotebookTabs className="w-6" />;
    case PageNames.qrcode:
      return <QrCode className="w-6" />;
    case PageNames.settings:
      return <Settings className="w-6" />;
    default:
      return;
  }
};

type NavLinkProps = {
  name: string;
  href: string;
};

export default function NavLink({ name, href }: NavLinkProps) {
  const pathName = usePathname();
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
      {getIcon(name)}
      <p className="hidden md:block">{name}</p>
    </Link>
  );
}
