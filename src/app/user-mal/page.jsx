import ClientDisplay from '../features/mal/components/ClientDisplay';
import GetEnviromentValues from '../features/mal/services/getEnviromentValues';

const User = () => {
  const malEnvData = GetEnviromentValues();

  return (
    <div>
      <h2>User Page</h2>
      <ClientDisplay envVar={malEnvData} />
    </div>
  );
};

export default User;
