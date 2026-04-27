import {
  Bar as PrismaBar,
  Product as PrismaProduct,
  Category as PrismaCategory,
  Menu as PrismaMenu,
} from '@repo/database';

// 1. Tipos para los JSON (que Prisma no tipa por defecto)
export interface ThemeConfig {
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  borderRadius?: string;
}

// 2. Definimos Alérgenos como un tipo literal para evitar errores de escritura
export type Allergen =
  | 'gluten'
  | 'lactosa'
  | 'frutos-secos'
  | 'huevo'
  | 'pescado'
  | 'soja';

// 3. Extendemos los tipos de Prisma para incluir la configuración tipada
export interface Bar extends Otype<PrismaBar, 'themeConfig'> {
  themeConfig: ThemeConfig;
}

// 4. Tipos compuestos para la UI (Los que usaremos en la Carta)
// Un producto que ya incluye su categoría
export interface ProductWithCategory extends PrismaProduct {
  category: PrismaCategory;
}

// Un menú que ya incluye sus productos
export interface MenuWithProducts extends PrismaMenu {
  products: {
    product: PrismaProduct;
  }[];
}

// Tipo de utilidad para sobrescribir propiedades (como el JSON de Bar)
type Otype<T, K extends keyof T> = Omit<T, K>;
