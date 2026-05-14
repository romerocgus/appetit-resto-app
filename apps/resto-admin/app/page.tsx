import { prisma } from '@repo/database';
import { notFound } from 'next/navigation';
import { Bar } from '@repo/shared-types';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function Home() {
  const bar = (await prisma.bar.findUnique({
    where: { slug: 'la-birreria' },
    include: {
      categories: {
        orderBy: { order: 'asc' },
        include: {
          products: true,
        },
      },
      products: {
        orderBy: { name: 'asc' },
      },
    },
  })) as Bar | null;
  console.log('🚀 ~ bar:', bar);

  if (!bar) {
    notFound();
  }
  return (
    <div>
      <main>
        <h1 className="text-3xl font-bold underline ">Pagina principal</h1>

        <Button className="px-10" asChild>
          <Link href="/login">Login</Link>
        </Button>
      </main>
    </div>
  );
}
