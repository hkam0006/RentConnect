import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  isRenter: false,
  isManager: false,
  isAdmin: false
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
      state.user = action.payload;
    }
  }
})

export const {
  login,
  logout,
  setRenter,
  setManager,
  setAdmin,
  setUser
} = UserSlice.actions;

export default UserSlice.reducer;