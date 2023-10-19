import 'server-only';

const GetEnviromentValues = () => {
  const MALdata = {
    MALClientSecret: process.env.MAL_CLIENT_SECRET,
    MALClientId: process.env.MAL_CLIENT_ID,
  };
  return MALdata;
};

export default GetEnviromentValues;
