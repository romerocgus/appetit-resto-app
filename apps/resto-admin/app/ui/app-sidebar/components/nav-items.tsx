import { SidebarMenuItem } from '@/components/ui/sidebar';
import { PageNames } from '../types';
import NavLink from './nav-link';

const links = [
  { name: PageNames.home, href: '/dashboard' },
  { name: PageNames.menus, href: '/menus' },
  { name: PageNames.products, href: '/products' },
  {
    name: PageNames.categories,
    href: '/categories',
  },
  { name: PageNames.qrcode, href: '/qrcode' },
];

export default function NavItems() {
  return (
    <>
      {links.map((link) => {
        return (
          <SidebarMenuItem key={link.href}>
            <NavLink name={link.name} href={link.href} />
          </SidebarMenuItem>
        );
      })}
    </>
  );
}
