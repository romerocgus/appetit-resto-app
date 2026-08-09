import type { NextAuthRequest } from 'next-auth';
import { auth } from './auth';
import { NextResponse } from 'next/server';

type ProxyRouteHandler = (
  req: NextAuthRequest,
  ctx: { params: Promise<unknown> },
) => Response | Promise<Response | void> | void;

const publicRoutes = ['/login', '/'];

const handler: ProxyRouteHandler = async (req) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!req.auth;

  const isPublic =
    publicRoutes.includes(pathname) || pathname.startsWith('/api');

  if (!isLoggedIn && !isPublic) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
};

const protectedHandler: ProxyRouteHandler = auth(handler);

export default protectedHandler;

export const config = {
  /*
   * Matchea todas las rutas menos las que tengan:
   * - api (rutas de API internas)
   * - _next/static (archivos estáticos de Next.js)
   * - _next/image (optimización de imágenes)
   * - assets (tus imágenes, logos y archivos estáticos locales)
   * - favicon.ico y extensiones de imágenes comunes (.svg, .png, .jpg, etc.)
   */
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|assets|.*\\.(?:svg|png|jpg|jpeg|webp|gif|ico)).*)',
  ],
};
