import PageHeader from '@/app/ui/page-header';

export default async function EditProduct({
  params,
}: {
  params: Promise<{ barId: string }>;
}) {
  const { barId } = await params;
  return (
    <>
      <PageHeader
        barId={barId}
        pageTitle="Edit Product"
        pageDescription="asd"
      />
      <h1>Edit page</h1>
    </>
  );
}
