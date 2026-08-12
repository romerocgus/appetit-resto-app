import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import Link from 'next/link';

type PageHeaderProps = {
  backlink?: {
    title: string;
    href: string;
  };
  pageTitle: string;
  pageDescription?: string;
};

export default async function PageHeader({
  backlink,
  pageTitle,
  pageDescription,
}: PageHeaderProps) {
  return (
    <header className="flex flex-col gap-6">
      <div className="flex shrink-0 items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4 data-[orientation=vertical]:self-center"
        />
        <Breadcrumb>
          <BreadcrumbList>
            {backlink && (
              <>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink asChild>
                    <Link href={backlink.href}>{backlink.title}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
              </>
            )}
            <BreadcrumbItem>
              <BreadcrumbPage>{pageTitle}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-2xl font-bold">{pageTitle}</h1>
        <h2 className="text-xl text-muted-foreground">{pageDescription}</h2>
      </div>
    </header>
  );
}
