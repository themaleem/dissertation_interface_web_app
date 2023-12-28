import { createSlice } from "@reduxjs/toolkit";

export const INITIAL_STATE = {
  user: undefined,
  signingOut: false,
  isAuthenticated: false,
};

const authReducer = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  reducers: {
    signUpSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    signInSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = { ...state.user, ...action.payload };
    },
    updateRole: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    signingOut: (state) => {
      state.signingOut = true;
    },
    signOut: (state) => {
      state.user = null;
      state.signingOut = false;
      state.isAuthenticated = false;
    },
  },
});

export const { signOut, signUpSuccess, updateRole, signingOut, signInSuccess } =
  authReducer.actions;

export default authReducer.reducer;
