import { prisma } from '../index';

async function main() {
  console.log('--- Limpiando base de datos ---');
  // El orden de borrado es inverso al de creación para evitar errores de FK
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.productsInMenus.deleteMany();
  await prisma.categoriesInMenus.deleteMany();
  await prisma.menu.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.barMember.deleteMany();
  await prisma.bar.deleteMany();
  await prisma.user.deleteMany();

  console.log('--- Creando Usuario Admin ---');
  const adminUser = await prisma.user.create({
    data: {
      name: 'Gustavo Admin',
      email: 'admin@appetit.com',
      password: 'password123', // En un caso real, esto debería estar hasheado
      phone: '+34600000000',
    },
  });

  console.log('--- Creando Bar ---');
  const bar = await prisma.bar.create({
    data: {
      name: 'La Birrería Tech',
      slug: 'la-birreria',
      email: 'contacto@labirreria.com',
      whatsappNumber: '34600000001',
      themeConfig: {
        primaryColor: '#ef4444',
        secondaryColor: '#1f2937',
        fontFamily: 'Inter',
      },
    },
  });

  console.log('--- Asignando Rol de Usuario al Bar ---');
  await prisma.barMember.create({
    data: {
      userId: adminUser.id,
      barId: bar.id,
      role: 'admin',
    },
  });

  console.log('--- Creando Categorías ---');
  const catBurgers = await prisma.category.create({
    data: { name: 'Hamburguesas', barId: bar.id },
  });
  const catBebidas = await prisma.category.create({
    data: { name: 'Bebidas', barId: bar.id },
  });
  const catPostres = await prisma.category.create({
    data: { name: 'Postres', barId: bar.id },
  });

  console.log('--- Creando Productos ---');
  const burger1 = await prisma.product.create({
    data: {
      name: 'Burger Classic',
      price: 12.5,
      description: 'Nuestra hamburguesa clásica con queso y lechuga.', // Campo obligatorio
      image: 'https://imageurl.com', // O imageUrl, verif
      categoryId: catBurgers.id,
      barId: bar.id,
    },
  });

  const burger2 = await prisma.product.create({
    data: {
      name: 'Burger XXL',
      price: 15.0,
      description:
        'Nuestra hamburguesa clásica con queso y lechuga pero mas grande', // Campo obligatorio
      image: 'https://imageurl.com',
      categoryId: catBurgers.id,
      barId: bar.id,
    },
  });

  const bebida1 = await prisma.product.create({
    data: {
      name: 'Cerveza IPA',
      price: 4.5,
      description: 'Cerveza IPA buenaza', // Campo obligatorio
      image: 'https://imageurl.com',
      categoryId: catBebidas.id,
      barId: bar.id,
    },
  });

  const postre1 = await prisma.product.create({
    data: {
      name: 'Cheesecake',
      price: 6.0,
      description: 'Cheesecake riquisima', // Campo obligatorio
      image: 'https://imageurl.com',
      categoryId: catPostres.id,
      barId: bar.id,
    },
  });

  console.log('--- Creando Menú Completo ---');
  // Menú ejecutivo: Elige una burger y una bebida por un precio fijo
  const menuEjecutivo = await prisma.menu.create({
    data: {
      name: 'Menú Ejecutivo Mediodía',
      description: 'Menú Ejecutivo Mediodía', // Campo obligatorio
      image: 'https://imageurl.com',
      price: 14.0, // Precio fijo independientemente de los productos
      barId: bar.id,
    },
  });

  console.log('--- Vinculando Categorías y Productos al Menú ---');
  // Definimos qué categorías componen el menú (Lógica: elige uno de cada)
  await prisma.categoriesInMenus.createMany({
    data: [
      { menuId: menuEjecutivo.id, categoryId: catBurgers.id },
      { menuId: menuEjecutivo.id, categoryId: catBebidas.id },
    ],
  });

  // Agregamos productos específicos que pueden entrar en ese menú
  await prisma.productsInMenus.createMany({
    data: [
      { menuId: menuEjecutivo.id, productId: burger1.id },
      { menuId: menuEjecutivo.id, productId: bebida1.id },
    ],
  });

  console.log('--- Creando Pedido de Prueba ---');
  const order = await prisma.order.create({
    data: {
      customerName: 'Cliente Juan',
      tableNumber: 'Mesa 5',
      totalPrice: 26.5,
      status: 'PENDING',
      barId: bar.id,
      items: {
        create: [
          {
            quantity: 1,
            price: 12.5,
            productId: burger1.id, // Producto suelto
          },
          {
            quantity: 1,
            price: 14.0,
            menuId: menuEjecutivo.id, // Un menú completo
          },
        ],
      },
    },
  });

  console.log('--- SEED COMPLETADO CON ÉXITO ---');
}

main()
  .catch((e) => {
    console.error('❌ Error en el seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
