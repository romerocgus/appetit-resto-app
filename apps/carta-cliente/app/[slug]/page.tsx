import { prisma } from '@repo/database';
import { notFound } from 'next/navigation';
import { Bar } from '@repo/shared-types';

export default async function CartaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const bar = (await prisma.bar.findUnique({
    where: { slug },
    include: {
      categories: {
        orderBy: { order: 'asc' },
        include: {
          products: true,
        },
      },
      products: {
        orderBy: { name: 'asc' },
      },
    },
  })) as Bar | null;

  if (!bar) {
    notFound();
  }

  return (
    <main
      style={{
        backgroundColor: bar.themeConfig?.primaryColor || '#fff',
        color: bar.themeConfig?.secondaryColor || '#000',
        minHeight: '100vh',
        padding: '20px',
      }}
    >
      <header>
        <h1 style={{ color: bar.themeConfig?.secondaryColor || '#000' }}>
          {bar.name}
        </h1>
        <p>WhatsApp: {bar.whatsappNumber}</p>
      </header>

      <section>
        {bar.categories.map((categoria) => (
          <div key={categoria.id} style={{ marginBottom: '30px' }}>
            <h2 style={{ borderBottom: '1px solid #ccc' }}>{categoria.name}</h2>
            <ul>
              {categoria.products.map((producto) => (
                <li key={producto.id}>
                  <strong>{producto.name}</strong> - {producto.price}€
                  <p>{producto.description}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </main>
  );
}
