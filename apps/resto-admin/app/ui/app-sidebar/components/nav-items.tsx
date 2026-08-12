import { SidebarMenuItem } from '@/components/ui/sidebar';
import { PageNames } from '../types';
import NavLink from './nav-link';

const links = [
  { name: PageNames.dashboard, slug: 'dashboard' },
  { name: PageNames.menus, slug: 'menus' },
  { name: PageNames.products, slug: 'products' },
  {
    name: PageNames.categories,
    slug: 'categories',
  },
  { name: PageNames.qrcode, slug: 'qrcode' },
];

export default function NavItems() {
  return (
    <>
      {links.map((link) => {
        return (
          <SidebarMenuItem key={link.slug}>
            <NavLink name={link.name} slug={link.slug} />
          </SidebarMenuItem>
        );
      })}
    </>
  );
}
