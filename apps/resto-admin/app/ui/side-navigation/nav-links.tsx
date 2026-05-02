import NavLink from './link';
import { PageNames } from './types';

const links = [
  { name: PageNames.home, href: '/dashboard' },
  { name: PageNames.menus, href: '/dashboard/menus' },
  { name: PageNames.products, href: '/dashboard/products' },
  {
    name: PageNames.categories,
    href: '/dashboard/categories',
  },
  { name: PageNames.qrcode, href: '/dashboard/qrcode' },
];

export default function NavLinks() {
  return (
    <>
      {links.map((link) => {
        return <NavLink key={link.name} name={link.name} href={link.href} />;
      })}
    </>
  );
}
