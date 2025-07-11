import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setLoading, setUserData } from "../redux/userSlice";
import { API_END_POINT } from "../constant";

const useCurrentUser = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        dispatch(setLoading(true));
        const response = await axios.get(`${API_END_POINT}/api/user/current`, {
          withCredentials: true,
        });
        dispatch(setUserData(response.data));
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    if (!userData) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [dispatch, userData]);

  return { userData };
};

export default useCurrentUser;
