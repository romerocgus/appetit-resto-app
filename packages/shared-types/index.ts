// 1. Configuración Visual del Bar
export interface BarTheme {
  primaryColor: string;
  secondaryColor: string;
  fontFamily: 'Roboto' | 'Inter' | 'Montserrat';
  logoUrl?: string;
}

// 2. Modelo de Bar (Tenant)
export interface Bar {
  id: string;
  slug: string; // Ejemplo: 'bar-central' para la URL
  name: string;
  theme: BarTheme;
}

// 3. Menú y Productos
export interface Product {
  id: string;
  barId: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  allergens: string[]; // ['gluten', 'lactosa']
  isAvailable: boolean;
  isPromotion: boolean;
}

export interface Category {
  id: string;
  barId: string;
  name: string;
  order: number; // Para ordenar las secciones (Entradas, Platos, Bebidas)
}

// 4. Pedido (Carrito)
export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  barId: string;
  items: CartItem[];
  total: number;
  createdAt: Date;
  status: 'pending' | 'preparing' | 'delivered';
}
