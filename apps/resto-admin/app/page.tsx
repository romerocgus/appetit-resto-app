import { prisma } from '@repo/database';
import { notFound } from 'next/navigation';
import { Bar } from '@repo/shared-types';
import { Button } from '@/components/ui/button';

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
        <button className="bg-blue-700 text-blue-100 rounded-md hover:rounded-xl px-8 py-2 m-16px">
          Login
        </button>
        <Button>Button ShadCn</Button>
      </main>
    </div>
  );
}
