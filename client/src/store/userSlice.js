import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  currentUser: null,
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
    },
    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload;
    },
    deleteUserSuccess: (state) => {
      state.currentUser = null;
    },
    SignOutUserSuccess: (state) => {
      state.currentUser = null;
    },
  },
});

export const {
  signInSuccess,
  updateUserSuccess,
  deleteUserSuccess,
  SignOutUserSuccess,
} = userSlice.actions;

export default userSlice.reducer;
