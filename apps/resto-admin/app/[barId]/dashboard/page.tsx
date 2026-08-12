import PageHeader from '@/app/ui/page-header';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default function DashboardPage() {
  return (
    <>
      <PageHeader pageTitle="Dashboard" pageDescription="Test" />
      <h1>DASHBOARD</h1>
    </>
  );
}
