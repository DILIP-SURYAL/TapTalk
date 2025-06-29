import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setLoading, setOtherUsers } from "../redux/userSlice";
import { API_END_POINT } from "../constant";

// your actual endpoint

const useCurrentUser = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchOtherUsers = async () => {
      try {
        dispatch(setLoading(true));

        const response = await axios.get(`${API_END_POINT}/api/user/others`, {
          withCredentials: true,
        });

        dispatch(setOtherUsers(response?.data));
      } catch (error) {
        console.error("Error fetching other users:", error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    // ✅ Only fetch if current user is available
    if (userData?._id) {
      fetchOtherUsers();
    }
  }, [dispatch, userData]);

  return { userData };
};

export default useCurrentUser;
