import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { getDefaultBarId } from '@/lib/requests';

export default async function Home() {
  const session = await auth();
  const clientId = session?.user?.id;

  if (clientId) {
    const firstBarId: string | null = await getDefaultBarId(clientId);

    if (firstBarId) {
      redirect(`/${firstBarId}/dashboard`);
    }
  }

  return (
    <main>
      <h1 className="text-3xl font-bold underline ">Pagina principal</h1>

      <Button className="px-10" asChild>
        <Link href="/login">Login</Link>
      </Button>
      <Button className="px-10" asChild>
        <Link href="/dashboard">Home</Link>
      </Button>
    </main>
  );
}
