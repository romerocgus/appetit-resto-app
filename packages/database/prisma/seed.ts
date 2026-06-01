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
  await prisma.tag.deleteMany();
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

  console.log('--- Creando Tags del Sistema ---');
  const tagVegano = await prisma.tag.create({
    data: { name: 'Vegano', icon: '🌱', color: '#22C55E', isSystem: true },
  });
  const tagSinTacc = await prisma.tag.create({
    data: { name: 'Sin TACC', icon: '🌾', color: '#EAB308', isSystem: true },
  });
  const tagPicante = await prisma.tag.create({
    data: { name: 'Picante', icon: '🌶️', color: '#EF4444', isSystem: true },
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
      description: 'Nuestra hamburguesa clásica con queso y lechuga.',
      image: 'https://imageurl.com',
      categoryId: catBurgers.id,
      barId: bar.id,
      tags: {
        connect: [{ id: tagPicante.id }],
      },
    },
  });

  const burger2 = await prisma.product.create({
    data: {
      name: 'Burger XXL Veggie',
      price: 15.0,
      description:
        'Nuestra hamburguesa de medallón de lentejas, lechuga y tomate.',
      image: 'https://imageurl.com',
      categoryId: catBurgers.id,
      barId: bar.id,
      tags: {
        connect: [{ id: tagVegano.id }, { id: tagSinTacc.id }],
      },
    },
  });

  const { id: bebida1Id } = await prisma.product.create({
    data: {
      name: 'Cerveza IPA',
      price: 4.5,
      description: 'Cerveza IPA buenaza',
      image: 'https://imageurl.com',
      categoryId: catBebidas.id,
      barId: bar.id,
      // Las bebidas por defecto no suelen llevar tags alimenticios comunes, lo dejamos vacío
    },
  });

  const postre1 = await prisma.product.create({
    data: {
      name: 'Cheesecake Sin TACC',
      price: 6.0,
      description: 'Cheesecake riquísima y apta para celíacos',
      image: 'https://imageurl.com',
      categoryId: catPostres.id,
      barId: bar.id,
      tags: {
        connect: [{ id: tagSinTacc.id }],
      },
    },
  });

  console.log('--- Creando Menú Completo ---');
  const menuEjecutivo = await prisma.menu.create({
    data: {
      name: 'Menú Ejecutivo Mediodía',
      description: 'Menú Ejecutivo Mediodía',
      image: 'https://imageurl.com',
      price: 14.0,
      barId: bar.id,
    },
  });

  console.log('--- Vinculando Categorías y Productos al Menú ---');
  await prisma.categoriesInMenus.createMany({
    data: [
      { menuId: menuEjecutivo.id, categoryId: catBurgers.id },
      { menuId: menuEjecutivo.id, categoryId: catBebidas.id },
    ],
  });

  await prisma.productsInMenus.createMany({
    data: [
      { menuId: menuEjecutivo.id, productId: burger1.id },
      { menuId: menuEjecutivo.id, productId: bebida1Id },
    ],
  });

  console.log('--- Creando Pedido de Prueba ---');
  await prisma.order.create({
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
            productId: burger1.id,
          },
          {
            quantity: 1,
            price: 14.0,
            menuId: menuEjecutivo.id,
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
