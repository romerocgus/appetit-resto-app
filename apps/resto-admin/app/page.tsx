import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await auth();

  if (session?.user?.id) {
    redirect(`/${session.user.id}/dashboard`);
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
