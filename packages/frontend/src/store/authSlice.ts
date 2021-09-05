// noinspection DuplicatedCode

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "../api/authService";

interface userCred {
  userID: string;
  userName: string;
}

export const logout = createAsyncThunk(
  "auth/logout",

  async ({}, { rejectWithValue }) => {
    try {
      return await authService.logout();
    } catch (e) {
      rejectWithValue(e);
    }

    return;
  }
);

export const loginWithEmailAndPassword = createAsyncThunk<
  userCred,
  { username: string; password: string }
>(
  "auth/login",

  async ({ username, password }, { rejectWithValue }) => {
    try {
      const data = await authService.LoginUser(username, password);
      return { userID: data.userID, userName: data.userName };
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const registerWithNameAndPassword = createAsyncThunk<
  userCred,
  { username: string; password: string }
>(
  "auth/register",

  async ({ username, password }, { rejectWithValue }) => {
    try {
      await authService.RegisterUser(username, password);
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

type initStateType = {
  userId?: string;
  userName?: string;
  isAuthenticated: boolean;
};

const initState: initStateType = {
  isAuthenticated: false,
} as Readonly<initStateType>;

const counterSlice = createSlice({
  name: "auth",
  initialState: initState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginWithEmailAndPassword.pending, (state) => {
      state.isAuthenticated = false;
    });
    builder.addCase(loginWithEmailAndPassword.rejected, (state) => {
      state.userId = undefined;
      state.isAuthenticated = false;
    });
    builder.addCase(loginWithEmailAndPassword.fulfilled, (state, action) => {
      state.userId = action.payload.userID;
      state.userName = action.payload.userName;
      state.isAuthenticated = true;
    });

    builder.addCase(logout.pending, (state) => {
      state.isAuthenticated = false;
    });
    builder.addCase(logout.rejected, (state) => {
      state.userId = undefined;
      state.isAuthenticated = false;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.userId = null;
      state.userName = null;
      state.isAuthenticated = false;
    });

    builder.addCase(registerWithNameAndPassword.pending, (state) => {
      state.isAuthenticated = false;
    });
    builder.addCase(registerWithNameAndPassword.rejected, (state) => {
      state.userId = undefined;
      state.isAuthenticated = false;
    });
    builder.addCase(registerWithNameAndPassword.fulfilled, (state, action) => {
      state.userId = action.payload.userID;
      state.userName = action.payload.userName;
      state.isAuthenticated = true;
    });
  },
});

const { reducer } = counterSlice;

export default reducer;
