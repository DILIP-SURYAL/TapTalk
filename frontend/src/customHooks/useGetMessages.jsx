import React, { useEffect } from "react";
import { setMessages } from "../redux/messageSlice";
import { useDispatch, useSelector } from "react-redux";
import { API_END_POINT } from "../constant";
import axios from "axios";

const useGetMessages = () => {
  const dispatch = useDispatch();
  const { selectedUser, userData } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUser = async () => {
      if (!selectedUser?._id) return;

      // dispatch(setLoading(true));
      try {
        console.log("Fetching messages for user:", selectedUser);

        const response = await axios.get(
          `${API_END_POINT}/api/message/get/${selectedUser._id}`,
          {
            withCredentials: true,
          }
        );

        console.log("Fetched messages:", response.data);
        dispatch(setMessages(response.data));
      } catch (error) {
        console.error("Error fetching user messages:", error);
      } finally {
        // dispatch(setLoading(false));
      }
    };

    fetchUser();
  }, [selectedUser, dispatch]); // removed `userData` if not needed

  return { userData };
};

export default useGetMessages;
