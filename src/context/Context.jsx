import axios from "axios";
import { createContext, useEffect, useState , useContext} from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const API_URI = import.meta.env.VITE_API_URI;
  const [user, setUser] = useState({});
  const [loading,setLoading]=useState(true)
  const navigate=useNavigate(null)

  const fetchingUser = () => {
    axios
      .get(`${API_URI}/api/fetch-user`, { withCredentials: true })
      .then((res) => {
        setUser(res.data.userDetails)
        navigate('/dashboard')
      })
      .catch((err) => setUser({}))
      .finally(()=> {
        setLoading(false)
      })
  };

  useEffect(() => {
    fetchingUser();
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser , loading }}>
      {children}
    </UserContext.Provider>
  );
};


export const useUserContextData= () => {
    return useContext(UserContext);
}