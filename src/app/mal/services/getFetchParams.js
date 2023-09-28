import { useSelector } from "react-redux/es/hooks/useSelector";

const GetFetchParams = () => {
const {malData} = useSelector((state) => state.MALReducer)

return malData;
};

export default GetFetchParams
