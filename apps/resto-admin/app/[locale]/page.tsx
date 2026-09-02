import { auth } from '@/auth';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import { getDefaultBarId } from '@/lib/requests';
import { getTranslations } from 'next-intl/server';
import { redirect } from 'next/navigation';

export default async function Home() {
  const t = await getTranslations('HomePage');
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
      <h1 className="text-3xl font-bold underline ">{t('title')}</h1>

      <Button className="px-10" asChild>
        <Link href="/login">Login</Link>
      </Button>
    </main>
  );
}
