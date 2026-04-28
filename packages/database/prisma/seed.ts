import { prisma } from '../index';

async function main() {
  console.log('--- Iniciando Seed ---');

  // 1. Limpieza total (Orden inverso a las relaciones para evitar errores de FK)
  await prisma.productsInMenus.deleteMany({});
  await prisma.menu.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.bar.deleteMany({});

  console.log('🧹 Base de datos limpia');

  // 2. Crear el Bar
  const bar = await prisma.bar.create({
    data: {
      name: 'La Birrería Tech',
      slug: 'la-birreria',
      email: 'contacto@labirreria.test',
      whatsappNumber: '34600000000',
      managerName: 'Juan Arquitecto',
      themeConfig: {
        primaryColor: '#0f172a',
        secondaryColor: '#38bdf8',
        fontFamily: 'Inter',
      },
    },
  });

  // 3. Crear Categorías y Productos
  // Creamos la categoría y sus productos en una sola operación vinculada al barId
  const catEntrantes = await prisma.category.create({
    data: {
      name: 'Entrantes',
      order: 1,
      barId: bar.id,
      products: {
        create: [
          {
            name: 'Nachos Pro',
            description: 'Con queso fundido y jalapeños',
            price: 8.5,
            allergens: ['lactosa'],
            isShareable: true,
            canBeInMenu: true,
            barId: bar.id, // <--- Aquí estaba el error, ahora lo pasamos explícitamente
          },
        ],
      },
    },
  });

  const catPrincipales = await prisma.category.create({
    data: {
      name: 'Platos Principales',
      order: 2,
      barId: bar.id,
      products: {
        create: [
          {
            name: 'Burger Monorepo',
            description: '200g de carne con salsa secreta',
            price: 14.0,
            allergens: ['gluten', 'sésamo'],
            canBeInMenu: true,
            barId: bar.id,
          },
          {
            name: 'Chuletón Enterprise',
            description: '1kg de carne premium para expertos',
            price: 45.0,
            canBeInMenu: false,
            barId: bar.id,
          },
        ],
      },
    },
  });

  // 4. Crear un Menú (Combo)
  // Primero buscamos los productos que acabamos de crear y que pueden estar en menú
  const productosAptos = await prisma.product.findMany({
    where: {
      barId: bar.id,
      canBeInMenu: true,
    },
  });

  await prisma.menu.create({
    data: {
      name: 'Menú Ejecutivo',
      description: 'Entrante + Plato Principal a precio reducido',
      price: 18.0,
      barId: bar.id,
      products: {
        create: productosAptos.map((p) => ({
          productId: p.id,
        })),
      },
    },
  });

  console.log('✅ Seed completado: "La Birrería Tech" creada con éxito.');
}

main()
  .catch((e) => {
    console.error('❌ Error en el seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
