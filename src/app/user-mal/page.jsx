import ClientDisplay from '../features/mal/components/ClientDisplay/ClientDisplay';
import GetEnviromentValues from '../features/mal/services/getEnviromentValues';
import AnimeList from '../features/mal/components/AnimeList/AnimeList';
import MangaList from '../features/mal/components/MangaList/MangaList';

const User = () => {
  const malEnvData = GetEnviromentValues();

  return (
    <div>
      <h2>User Page</h2>
      <ClientDisplay envVar={malEnvData} />
      <AnimeList />
      <MangaList />
    </div>
  );
};

export default User;
