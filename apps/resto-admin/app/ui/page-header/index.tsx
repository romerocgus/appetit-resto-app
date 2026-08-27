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
import { getBarHeaderData } from '@/lib/requests';
import Link from 'next/link';
import ImageComponent from '../image-component';

type PageHeaderProps = {
  barId: string;
  pageTitle: string;
  backlink?: {
    title: string;
    href: string;
  };
  pageDescription?: string;
};

export default async function PageHeader({
  barId,
  pageTitle,
  backlink,
  pageDescription,
}: PageHeaderProps) {
  const barHeader = await getBarHeaderData(barId);
  const barLogo = barHeader?.logoUrl || '';

  return (
    <header className="flex flex-col gap-6 px-4 pt-2 mb-10">
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
      <div className="flex flex-col items-center gap-3">
        <ImageComponent src={barLogo} alt="test" width={40} height={40} />
        <h1 className="text-2xl font-bold">
          {barHeader?.name} <span className="text-primary">{pageTitle}</span>
        </h1>
        <h2 className="text-xl text-muted-foreground">{pageDescription}</h2>
      </div>
    </header>
  );
}
