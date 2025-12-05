import { getTranslations } from 'next-intl/server';
import ProfileClient from '../features/profile/components/ProfileClient/ProfileClient';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslations({ locale, namespace: 'profile' });

  return {
    title: t('pageTitle'),
    description: t('pageDescription'),
  };
}

export default function ProfilePage() {
  return (
    <main>
      <ProfileClient />
    </main>
  );
}
