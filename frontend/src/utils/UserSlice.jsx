import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  isRenter: false,
  isManager: false,
  isAdmin: false,
  isLoading: false,
}

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.currentUser = action.payload;
    },
    logout: (state) => {
      state.currentUser = null;
      state.isAdmin = false;
      state.isRenter = false;
      state.isManager = false;
      state.isLoading = false;
    },
    setRenter: (state) => {
      state.isRenter = true;
    },
    setManager: (state) => {
      state.isManager = true;
    },
    setAdmin: (state) => {
      state.isAdmin = true;
    },
    setUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload
    }
  }
})

export const {
  login,
  logout,
  setRenter,
  setManager,
  setAdmin,
  setUser,
  setLoading
} = UserSlice.actions;

export default UserSlice.reducer;