import { prisma } from '@repo/database';
import { notFound } from 'next/navigation';
import { Bar } from '@repo/shared-types';

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
      <main>Admin App</main>
    </div>
  );
}
