import type { NextAuthRequest } from 'next-auth';
import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import { auth } from './auth';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

type ProxyRouteHandler = (
  req: NextAuthRequest,
  ctx: { params: Promise<unknown> },
) => Response | Promise<Response | void> | void;

const publicRoutes = ['/login', '/'];

const handler: ProxyRouteHandler = async (req) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!req.auth;

  const pathnameWithoutLocale = pathname.replace(/^\/(es|en)(\/|$)/, '/');

  const isPublic =
    publicRoutes.includes(pathnameWithoutLocale) || pathname.startsWith('/api');

  if (!isLoggedIn && !isPublic) {
    const localeMatch = pathname.match(/^\/(es|en)(\/|$)/);
    const currentLocale = localeMatch ? localeMatch[1] : routing.defaultLocale;
    return NextResponse.redirect(new URL(`/${currentLocale}/login`, req.url));
  }

  return intlMiddleware(req);
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
