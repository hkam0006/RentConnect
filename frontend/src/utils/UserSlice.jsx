import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  isRenter: false,
  isManager: false,
  isAdmin: false
}

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.isAdmin = false;
      state.isRenter = false;
      state.isManager = false;
    },
    setRenter: (state) => {
      state.isRenter = true;
    },
    setManager: (state) => {
      state.isManager = true;
    },
    setAdmin: (state) => {
      state.isAdmin = true;
    }
  }
})

export const {
  login,
  logout,
  setRenter,
  setManager,
  setAdmin
} = UserSlice.actions;

export default UserSlice.reducer;