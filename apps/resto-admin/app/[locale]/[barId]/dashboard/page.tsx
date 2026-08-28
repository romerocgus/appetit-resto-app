import PageHeader from '@/app/ui/page-header';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ barId: string }>;
}) {
  const { barId } = await params;
  return (
    <>
      <PageHeader barId={barId} pageTitle="Dashboard" pageDescription="Test" />
      <h1>DASHBOARD</h1>
    </>
  );
}
