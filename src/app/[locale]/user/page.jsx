import dynamic from 'next/dynamic';
import { unstable_setRequestLocale } from 'next-intl/server';
import './page.scss';

const UserDisplay = dynamic(
  () => import('../features/userPage/components/UserDisplay/UserDisplay'),
  { ssr: false }
);

const UserPage = ({ params: { locale } }) => {
  unstable_setRequestLocale(locale);
  return (
    <main className="user">
      <h1>Your Anime and Manga Year Wrapped</h1>
      <UserDisplay />
    </main>
  );
};

export default UserPage;
