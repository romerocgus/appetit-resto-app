import PageHeader from '@/app/ui/page-header';
import { DataTable } from '@/app/ui/products-table';
import { columns } from '@/app/ui/products-table/columns';
import { Button } from '@/components/ui/button';
import { getProductsByBarId } from '@/lib/requests';
import { Plus } from 'lucide-react';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

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
  const t = await getTranslations('ProductsPage');
  const pageTitle = t('title');
  const pageDescription = t('description');
  return (
    <>
      <PageHeader
        barId={barId}
        pageTitle={pageTitle}
        pageDescription={pageDescription}
      />
      <div className="flex flex-col gap-6 px-6 pb-10">
        <Button className="max-w-40">
          <Plus />
          Add New Product
        </Button>
        {products && <DataTable columns={columns} data={products} />}
      </div>
    </>
  );
}
