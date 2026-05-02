'use client';
import Link from 'next/link';
import { LayoutDashboard, Salad, ScrollText, NotebookTabs } from 'lucide-react';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Home', href: '/dashboard', icon: LayoutDashboard },
  {
    name: 'Categories',
    href: '/dashboard/categories',
    icon: ScrollText,
  },
  { name: 'Products', href: '/dashboard/products', icon: Salad },
  { name: 'Menus', href: '/dashboard/menus', icon: NotebookTabs },
];

export default function NavLinks() {
  const pathName = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            //USANDO CLSX
            className={clsx(
              'flex h-12 grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-sky-200 text-blue-600': pathName === link.href,
              },
            )}
            //USANDO TEMPLATE STRING
            // className={`flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3 ${pathName === link.href && 'bg-sky-200 text-blue-600'}`}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
