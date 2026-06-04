import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Obtener la sesión (ejemplo leyendo una cookie de sesión) POR AHORA USAR --> cmpvc0wnh0000kgtny3k7xgfw
  const sessionToken = request.cookies.get('session-token')?.value;

  // 2. Si el usuario intenta ir a la raíz "/" y SÍ está logueado:
  if (pathname === '/' && sessionToken) {
    try {
      const apiUrl = new URL('/api/get-default-bar', request.url);
      apiUrl.searchParams.set('token', sessionToken);

      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data?.firstBarId) {
        return NextResponse.redirect(
          new URL(`/${data.firstBarId}/dashboard`, request.url),
        );
      } else {
        return NextResponse.redirect(new URL('/login', request.url));
      }
    } catch (error) {
      console.error('Error obteniendo bares en el middleware:', error);
      // Si algo falla, dejamos que vea la landing por seguridad
      return NextResponse.next();
    }
  }

  // Para cualquier otra ruta, dejamos que la petición continúe normalmente
  return NextResponse.next();
}

// 3. Configuración del Matcher: Define qué rutas interceptará el Middleware
export const config = {
  /*
   * Matchea todas las rutas menos las que tengan:
   * - api (rutas de API internas)
   * - _next/static (archivos estáticos de Next.js)
   * - _next/image (optimización de imágenes)
   * - favicon.ico, imágenes, etc.
   */
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)'],
};
