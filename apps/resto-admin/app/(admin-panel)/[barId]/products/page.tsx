import { prisma } from '@repo/database';

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    where: { barId: 'cmpvc0wov0001kgtnuhcd1x3a' },
    include: {
      tags: true,
      category: true,
    },
    orderBy: {
      name: 'asc',
    },
  });
  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-2xl font-bold">Productos</h1>
      <h2 className="text-xl text-muted-foreground">
        Aqui puedes gestionar tus productos
      </h2>
      {products && (
        <ul>
          {products.map((product) => (
            <li key={product.id}>{product.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
