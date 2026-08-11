import { columns } from '@/app/ui/products-table/columns';
import { DataTable } from '@/app/ui/products-table/data-table';
import { getProductsByBarId } from '@/lib/requests';

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ barId: string }>;
}) {
  const { barId } = await params;
  const products = await getProductsByBarId(barId);
  console.log('🚀 ~ products:', products);
  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-2xl font-bold">Productos</h1>
      <h2 className="text-xl text-muted-foreground">
        Aqui puedes gestionar tus productos
      </h2>
      {products && <DataTable columns={columns} data={products} />}
    </div>
  );
}
