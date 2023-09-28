import ClientDisplay from "../mal/components/ClientDisplay";
import GetEnviromentValues from '../mal/services/getEnviromentValues';
// import GetFetchParams from '../mal/services/getFetchParams';

const User = () => {
  const malEnvData = GetEnviromentValues();
  // const data = GetFetchParams();

  return (
    <div>
      <h2>User Page</h2>
      <ClientDisplay envVar = {malEnvData}>
      </ClientDisplay>
    </div>
  );
};

export default User;
