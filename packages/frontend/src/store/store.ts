import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import reducer from "./chatSlice";

console.log("chatReducer", reducer);

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
