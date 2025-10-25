import dynamic from 'next/dynamic';
import './page.scss';

const UserDisplay = dynamic(() => import('../features/userPage/components/UserDisplay/UserDisplay'), { ssr: false });

const UserPage = () => (
  <main className="user">
    <h1>Your Anime and Manga Year Wrapped</h1>
    <UserDisplay />
  </main>
);

export default UserPage;
