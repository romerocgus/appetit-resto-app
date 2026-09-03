import PageHeader from '@/app/ui/page-header';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ barId: string }>;
}) {
  const { barId } = await params;
  const t = await getTranslations('DashboardPage');
  const pageTitle = t('title');
  const pageDescription = t('description');
  return (
    <>
      <PageHeader
        barId={barId}
        pageTitle={pageTitle}
        pageDescription={pageDescription}
      />
      <h1>DASHBOARD</h1>
    </>
  );
}
