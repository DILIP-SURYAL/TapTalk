import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUserData } from "../redux/userSlice";

const API_END_POINT = "http://localhost:8000"; // your actual endpoint

const useCurrentUser = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${API_END_POINT}/api/user/current`, {
          withCredentials: true,
        });
        dispatch(setUserData(response.data));
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (!userData) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [dispatch, userData]);

  return { userData, loading };
};

export default useCurrentUser;
