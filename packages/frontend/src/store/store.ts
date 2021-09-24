import { configureStore } from "@reduxjs/toolkit";
import reduxWebsocket from "@giantmachines/redux-websocket";

import authReducer from "./authSlice";
import reducer from "./chatSlice";

const reduxWebsocketMiddleware = reduxWebsocket({
  // prefix: "chat",

  onOpen: () => {
    console.log("i leved");
  },
});

console.log("chatReducer", reducer);

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["REDUX_WEBSOCKET::OPEN", "REDUX_WEBSOCKET::MESSAGE"],
        ignoredActionPaths: ["meta.timestamp", "payload.Event"],
      },
    }).concat(reduxWebsocketMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
