import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
    otherUsers: null,
    selectedUser: null,
    loading: false,
    onlineUsers: null,
    socket: null,
    searchData: null,
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setOtherUsers: (state, action) => {
      state.otherUsers = action.payload;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
    setSocket: (state, action) => {
      state.socket = action.payload;
    },
    setSearchData: (state, action) => {
      state.searchData = action.payload;
    },
  },
});
export const {
  setUserData,
  setOtherUsers,
  setSelectedUser,
  setLoading,
  setOnlineUsers,
  setSocket,
  setSearchData,
} = userSlice.actions;
export default userSlice.reducer;
