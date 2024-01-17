import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
};

const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAccessToken(state, action) {
      state.accessToken = action.payload.useraccessToken;
      state.refreshToken = action.payload.userrefreshToken
      localStorage.setItem('useraccessToken', action.payload.useraccessToken);
      localStorage.setItem('userrefreshToken', action.payload.userrefreshToken);
    },
    setUser(state, action) {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
      // console.log("ACTION.PAYLOAD = ",action.payload);
      // console.log("state.user = ",state.user);
    },
    clearAuth(state) {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setAccessToken, setUser, clearAuth } = UserSlice.actions;
export default UserSlice.reducer;