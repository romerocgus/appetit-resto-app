import { AppSidebar } from '@/app/ui/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

export default async function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex flex-col px-4 py-2 gap-6">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
