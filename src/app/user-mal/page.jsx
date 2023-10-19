import ClientDisplay from '../features/mal/components/ClientDisplay/ClientDisplay';
import GetEnviromentValues from '../features/mal/services/getEnviromentValues';
import AnimeList from '../features/mal/components/AnimeList/AnimeList';

const User = () => {
  const malEnvData = GetEnviromentValues();

  return (
    <div>
      <h2>User Page</h2>
      <ClientDisplay envVar={malEnvData} />
      <AnimeList />
    </div>
  );
};

export default User;
