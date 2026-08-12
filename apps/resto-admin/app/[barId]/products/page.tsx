import PageHeader from '@/app/ui/page-header';
import { columns } from '@/app/ui/products-table/columns';
import { DataTable } from '@/app/ui/products-table/data-table';
import { getProductsByBarId } from '@/lib/requests';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Products',
};

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ barId: string }>;
}) {
  const { barId } = await params;
  const products = await getProductsByBarId(barId);
  return (
    <>
      <PageHeader
        pageTitle="Productos"
        pageDescription="Aqui puedes gestionar tus productos"
      />
      {products && <DataTable columns={columns} data={products} />}
    </>
  );
}
