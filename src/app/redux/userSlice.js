import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.userInfo = action.payload;
    },
    addUser: (state, action) => {
      state.userInfo.push(action.payload);
    },
    removeUser: (state, action) => {
      state.userInfo = state.userInfo.filter(
        (user) => user._id !== action.payload
      );
    },
  },
});

export const { setUsers, addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
